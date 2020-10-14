import { Client } from "../api/client";
import { serializeInput } from "../binary/input";
import { serializeOutput } from "../binary/output";
import { serializeTransactionEssence } from "../binary/transaction";
import { Bip32Path } from "../crypto/bip32Path";
import { Ed25519 } from "../crypto/ed25519";
import { IMessage } from "../models/IMessage";
import { IReferenceUnlockBlock } from "../models/IReferenceUnlockBlock";
import { ISeed } from "../models/ISeed";
import { ISigLockedSingleOutput } from "../models/ISigLockedSingleOutput";
import { ISignatureKeyPair } from "../models/ISignatureKeyPair";
import { ISignatureUnlockBlock } from "../models/ISignatureUnlockBlock";
import { ITransactionEssence } from "../models/ITransactionEssence";
import { ITransactionPayload } from "../models/ITransactionPayload";
import { IUTXOInput } from "../models/IUTXOInput";
import { WriteBuffer } from "../utils/writeBuffer";

/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param outputs The outputs to send.
 * @param index Optional index name.
 * @param data Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
export async function sendTransfer(
    client: Client,
    seed: ISeed,
    outputs: { address: string; amount: number }[],
    index?: string,
    data?: string): Promise<{
        messageId: string;
        remainderAddress?: string;
    }> {
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }

    const requiredBalance = outputs.reduce((total, output) => total + output.amount, 0);

    let startIndex = 0;
    let consumedBalance = 0;
    const inputsAndSignatureKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: ISignatureKeyPair;
        serialized: string;
    }[] = [];
    let finished = false;
    let remainderKeyPair: ISignatureKeyPair | undefined;

    do {
        const addresses = generateAddressKeyPairs(seed, startIndex, 20);

        for (const address of addresses) {
            const addressOutputIds = await client.addressOutputs(Ed25519.signAddress(address.publicKey));

            if (addressOutputIds.outputIds.length === 0) {
                finished = true;
                remainderKeyPair = address;
            } else {
                for (const addressOutputId of addressOutputIds.outputIds) {
                    const addressOutput = await client.output(addressOutputId);

                    if (addressOutput.isSpent) {
                        if (addressOutput.output.amount !== 0) {
                            throw new Error("Spent address");
                        }
                    } else if (addressOutput.output.amount !== 0) {
                        if (consumedBalance < requiredBalance) {
                            consumedBalance += addressOutput.output.amount;

                            const input: IUTXOInput = {
                                type: 0,
                                transactionId: addressOutput.transactionId,
                                transactionOutputIndex: addressOutput.outputIndex
                            };

                            const writeBuffer = new WriteBuffer();
                            serializeInput(writeBuffer, input);

                            inputsAndSignatureKeyPairs.push({
                                input,
                                addressKeyPair: address,
                                serialized: writeBuffer.finalBuffer().toString("hex")
                            });
                        }
                    }
                }
            }
        }

        startIndex += 20;
    } while (!finished);

    if (consumedBalance < requiredBalance) {
        throw new Error("There are not enough funds in the inputs for the required balance");
    }

    // We have consumed more than we need to so add a remainder output
    // back to the address from the seed that didn't have any outputs or balance
    let remainderAddress;
    if (requiredBalance < consumedBalance && remainderKeyPair) {
        remainderAddress = Ed25519.signAddress(remainderKeyPair.publicKey);
        outputs.push({
            amount: consumedBalance - requiredBalance,
            address: remainderAddress
        });
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
        const writeBuffer = new WriteBuffer();
        serializeOutput(writeBuffer, sigLockedOutput);
        outputsWithSerialization.push({
            output: sigLockedOutput,
            serialized: writeBuffer.finalBuffer().toString("hex")
        });
    }

    // Lexigraphically sort the inputs and outputs
    const sortedInputs = inputsAndSignatureKeyPairs.sort((a, b) => a.serialized.localeCompare(b.serialized));
    const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serialized.localeCompare(b.serialized));

    const transactionEssence: ITransactionEssence = {
        type: 0,
        inputs: sortedInputs.map(i => i.input),
        outputs: sortedOutputs.map(o => o.output),
        payload: index && data ? { type: 2, index, data } : undefined
    };

    const binaryEssenceBuffer = new WriteBuffer();
    serializeTransactionEssence(binaryEssenceBuffer, transactionEssence);
    const essenceFinalBuffer = binaryEssenceBuffer.finalBuffer();

    // Create the unlock blocks
    const unlockBlocks: (ISignatureUnlockBlock | IReferenceUnlockBlock)[] = [];
    const addressToUnlockBlock: {
        [address: string]: {
            keyPair: ISignatureKeyPair;
            unlockIndex: number;
        };
    } = {};

    for (const input of sortedInputs) {
        if (addressToUnlockBlock[input.addressKeyPair.publicKey]) {
            unlockBlocks.push({
                type: 1,
                reference: addressToUnlockBlock[input.addressKeyPair.publicKey].unlockIndex
            });
        } else {
            unlockBlocks.push({
                type: 0,
                signature: {
                    type: 1,
                    publicKey: input.addressKeyPair.publicKey,
                    signature: Ed25519.signData(input.addressKeyPair.privateKey, essenceFinalBuffer)
                }
            });
            addressToUnlockBlock[input.addressKeyPair.publicKey] = {
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
        remainderAddress
    };
}

/**
 * Generate a list of address key pairs.
 * @param seed The seed.
 * @param startIndex The start index to generate from.
 * @param count The number of address seeds
 * @returns A list of the signature key pairs for the addresses.
 */
export function generateAddressKeyPairs(seed: ISeed, startIndex: number, count: number): ISignatureKeyPair[] {
    const keyPairs: ISignatureKeyPair[] = [];

    for (let i = startIndex; i < startIndex + count; i++) {
        if (i === 0) {
            keyPairs.push(seed.generateKeyPair());
        } else {
            const bip32Path = new Bip32Path();
            bip32Path.push(i);
            const subSeed = seed.generateSubseed(bip32Path);
            keyPairs.push(subSeed.generateKeyPair());
        }
    }

    return keyPairs;
}
