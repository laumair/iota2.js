import { IClient } from "../api/models/IClient";
import { serializeInput } from "../binary/input";
import { serializeOutput } from "../binary/output";
import { serializeTransactionEssence } from "../binary/transaction";
import { Bip32Path } from "../crypto/bip32Path";
import { Ed25519 } from "../crypto/ed25519";
import { IKeyPair } from "../models/IKeyPair";
import { IMessage } from "../models/IMessage";
import { IReferenceUnlockBlock } from "../models/IReferenceUnlockBlock";
import { ISeed } from "../models/ISeed";
import { ISigLockedSingleOutput } from "../models/ISigLockedSingleOutput";
import { ISignatureUnlockBlock } from "../models/ISignatureUnlockBlock";
import { ITransactionEssence } from "../models/ITransactionEssence";
import { ITransactionPayload } from "../models/ITransactionPayload";
import { IUTXOInput } from "../models/IUTXOInput";
import { Converter } from "../utils/converter";
import { WriteStream } from "../utils/writeStream";

/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param outputs The outputs to send.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param indexationKey Optional indexation key.
 * @param indexationData Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
export async function sendAdvanced(
    client: IClient,
    seed: ISeed,
    basePath: Bip32Path,
    outputs: { address: string; amount: number }[],
    startIndex?: number,
    indexationKey?: string,
    indexationData?: Uint8Array): Promise<{
        messageId: string;
        message: IMessage;
    }> {
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }

    const requiredBalance = outputs.reduce((total, output) => total + output.amount, 0);

    let localStartIndex = startIndex ?? 0;
    let consumedBalance = 0;
    const inputsAndSignatureKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
        serialized: string;
    }[] = [];
    let finished = false;

    do {
        basePath.push(localStartIndex);
        const addressKeyPair = seed.generateSeedFromPath(basePath).keyPair();
        basePath.pop();

        const address = Converter.bytesToHex(Ed25519.publicKeyToAddress(addressKeyPair.publicKey));
        const addressOutputIds = await client.addressOutputs(address);

        for (const addressOutputId of addressOutputIds.outputIds) {
            const addressOutput = await client.output(addressOutputId);

            if (!addressOutput.isSpent &&
                addressOutput.output.amount !== 0 &&
                consumedBalance < requiredBalance) {
                consumedBalance += addressOutput.output.amount;

                const input: IUTXOInput = {
                    type: 0,
                    transactionId: addressOutput.transactionId,
                    transactionOutputIndex: addressOutput.outputIndex
                };

                const writeStream = new WriteStream();
                serializeInput(writeStream, input);

                inputsAndSignatureKeyPairs.push({
                    input,
                    addressKeyPair,
                    serialized: writeStream.finalHex()
                });

                if (consumedBalance >= requiredBalance) {
                    // We didn't use all the balance from the last input
                    // so return the rest to the same address.
                    if (consumedBalance - requiredBalance > 0) {
                        outputs.push({
                            amount: consumedBalance - requiredBalance,
                            address
                        });
                    }
                    finished = true;
                }
            }
        }

        localStartIndex++;
    } while (!finished);

    if (consumedBalance < requiredBalance) {
        throw new Error("There are not enough funds in the inputs for the required balance");
    }

    const outputsWithSerialization: {
        output: ISigLockedSingleOutput;
        serialized: string;
    }[] = [];

    for (const output of outputs) {
        const sigLockedOutput: ISigLockedSingleOutput = {
            type: 0,
            address: {
                type: 1,
                address: output.address
            },
            amount: output.amount
        };
        const writeStream = new WriteStream();
        serializeOutput(writeStream, sigLockedOutput);
        outputsWithSerialization.push({
            output: sigLockedOutput,
            serialized: writeStream.finalHex()
        });
    }

    // Lexigraphically sort the inputs and outputs
    const sortedInputs = inputsAndSignatureKeyPairs.sort((a, b) => a.serialized.localeCompare(b.serialized));
    const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serialized.localeCompare(b.serialized));

    const transactionEssence: ITransactionEssence = {
        type: 0,
        inputs: sortedInputs.map(i => i.input),
        outputs: sortedOutputs.map(o => o.output),
        payload: indexationKey && indexationData
            ? {
                type: 2,
                index: indexationKey,
                data: Converter.bytesToHex(indexationData)
            }
            : undefined
    };

    const binaryEssence = new WriteStream();
    serializeTransactionEssence(binaryEssence, transactionEssence);
    const essenceFinal = binaryEssence.finalBytes();

    // Create the unlock blocks
    const unlockBlocks: (ISignatureUnlockBlock | IReferenceUnlockBlock)[] = [];
    const addressToUnlockBlock: {
        [address: string]: {
            keyPair: IKeyPair;
            unlockIndex: number;
        };
    } = {};

    for (const input of sortedInputs) {
        const hexInputAddressPublic = Converter.bytesToHex(input.addressKeyPair.publicKey);
        if (addressToUnlockBlock[hexInputAddressPublic]) {
            unlockBlocks.push({
                type: 1,
                reference: addressToUnlockBlock[hexInputAddressPublic].unlockIndex
            });
        } else {
            unlockBlocks.push({
                type: 0,
                signature: {
                    type: 1,
                    publicKey: hexInputAddressPublic,
                    signature: Converter.bytesToHex(
                        Ed25519.signData(input.addressKeyPair.privateKey, essenceFinal)
                    )
                }
            });
            addressToUnlockBlock[hexInputAddressPublic] = {
                keyPair: input.addressKeyPair,
                unlockIndex: unlockBlocks.length - 1
            };
        }
    }

    const transactionPayload: ITransactionPayload = {
        type: 0,
        essence: transactionEssence,
        unlockBlocks
    };

    const tips = await client.tips();

    const message: IMessage = {
        version: 1,
        parent1MessageId: tips.tip1MessageId,
        parent2MessageId: tips.tip2MessageId,
        payload: transactionPayload,
        nonce: 0
    };

    const messageId = await client.messageSubmit(message);

    return {
        messageId,
        message
    };
}
