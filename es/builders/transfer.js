"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAddressKeyPairs = exports.sendTransfer = void 0;
const input_1 = require("../binary/input");
const output_1 = require("../binary/output");
const transaction_1 = require("../binary/transaction");
const bip32Path_1 = require("../crypto/bip32Path");
const ed25519_1 = require("../crypto/ed25519");
const writeBuffer_1 = require("../utils/writeBuffer");
/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param outputs The outputs to send.
 * @param index Optional index name.
 * @param data Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
function sendTransfer(client, seed, outputs, index, data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!outputs || outputs.length === 0) {
            throw new Error("You must specify some outputs");
        }
        const requiredBalance = outputs.reduce((total, output) => total + output.amount, 0);
        let startIndex = 0;
        let consumedBalance = 0;
        const inputsAndSignatureKeyPairs = [];
        let finished = false;
        let remainderKeyPair;
        do {
            const addresses = generateAddressKeyPairs(seed, startIndex, 20);
            for (const address of addresses) {
                const addressOutputIds = yield client.addressOutputs(ed25519_1.Ed25519.signAddress(address.publicKey));
                if (addressOutputIds.outputIds.length === 0) {
                    finished = true;
                    remainderKeyPair = address;
                }
                else {
                    for (const addressOutputId of addressOutputIds.outputIds) {
                        const addressOutput = yield client.output(addressOutputId);
                        if (addressOutput.isSpent) {
                            if (addressOutput.output.amount !== 0) {
                                throw new Error("Spent address");
                            }
                        }
                        else if (addressOutput.output.amount !== 0) {
                            if (consumedBalance < requiredBalance) {
                                consumedBalance += addressOutput.output.amount;
                                const input = {
                                    type: 0,
                                    transactionId: addressOutput.transactionId,
                                    transactionOutputIndex: addressOutput.outputIndex
                                };
                                const writeBuffer = new writeBuffer_1.WriteBuffer();
                                input_1.serializeInput(writeBuffer, input);
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
            remainderAddress = ed25519_1.Ed25519.signAddress(remainderKeyPair.publicKey);
            outputs.push({
                amount: consumedBalance - requiredBalance,
                address: remainderAddress
            });
        }
        const outputsWithSerialization = [];
        for (const output of outputs) {
            const sigLockedOutput = {
                type: 0,
                address: {
                    type: 1,
                    address: output.address
                },
                amount: output.amount
            };
            const writeBuffer = new writeBuffer_1.WriteBuffer();
            output_1.serializeOutput(writeBuffer, sigLockedOutput);
            outputsWithSerialization.push({
                output: sigLockedOutput,
                serialized: writeBuffer.finalBuffer().toString("hex")
            });
        }
        // Lexigraphically sort the inputs and outputs
        const sortedInputs = inputsAndSignatureKeyPairs.sort((a, b) => a.serialized.localeCompare(b.serialized));
        const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serialized.localeCompare(b.serialized));
        const transactionEssence = {
            type: 0,
            inputs: sortedInputs.map(i => i.input),
            outputs: sortedOutputs.map(o => o.output),
            payload: index && data ? { type: 2, index, data } : undefined
        };
        const binaryEssenceBuffer = new writeBuffer_1.WriteBuffer();
        transaction_1.serializeTransactionEssence(binaryEssenceBuffer, transactionEssence);
        const essenceFinalBuffer = binaryEssenceBuffer.finalBuffer();
        // Create the unlock blocks
        const unlockBlocks = [];
        const addressToUnlockBlock = {};
        for (const input of sortedInputs) {
            if (addressToUnlockBlock[input.addressKeyPair.publicKey]) {
                unlockBlocks.push({
                    type: 1,
                    reference: addressToUnlockBlock[input.addressKeyPair.publicKey].unlockIndex
                });
            }
            else {
                unlockBlocks.push({
                    type: 0,
                    signature: {
                        type: 1,
                        publicKey: input.addressKeyPair.publicKey,
                        signature: ed25519_1.Ed25519.signData(input.addressKeyPair.privateKey, essenceFinalBuffer)
                    }
                });
                addressToUnlockBlock[input.addressKeyPair.publicKey] = {
                    keyPair: input.addressKeyPair,
                    unlockIndex: unlockBlocks.length - 1
                };
            }
        }
        const transactionPayload = {
            type: 0,
            essence: transactionEssence,
            unlockBlocks
        };
        const tips = yield client.tips();
        const message = {
            version: 1,
            parent1MessageId: tips.tip1MessageId,
            parent2MessageId: tips.tip2MessageId,
            payload: transactionPayload,
            nonce: 0
        };
        const messageId = yield client.messageSubmit(message);
        return {
            messageId,
            remainderAddress
        };
    });
}
exports.sendTransfer = sendTransfer;
/**
 * Generate a list of address key pairs.
 * @param seed The seed.
 * @param startIndex The start index to generate from.
 * @param count The number of address seeds
 * @returns A list of the signature key pairs for the addresses.
 */
function generateAddressKeyPairs(seed, startIndex, count) {
    const keyPairs = [];
    for (let i = startIndex; i < startIndex + count; i++) {
        if (i === 0) {
            keyPairs.push(seed.generateKeyPair());
        }
        else {
            const bip32Path = new bip32Path_1.Bip32Path();
            bip32Path.push(i);
            const subSeed = seed.generateSubseed(bip32Path);
            keyPairs.push(subSeed.generateKeyPair());
        }
    }
    return keyPairs;
}
exports.generateAddressKeyPairs = generateAddressKeyPairs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnVpbGRlcnMvdHJhbnNmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQWlEO0FBQ2pELDZDQUFtRDtBQUNuRCx1REFBb0U7QUFDcEUsbURBQWdEO0FBQ2hELCtDQUE0QztBQVU1QyxzREFBbUQ7QUFFbkQ7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFzQixZQUFZLENBQzlCLE1BQWMsRUFDZCxJQUFXLEVBQ1gsT0FBOEMsRUFDOUMsS0FBYyxFQUNkLElBQWE7O1FBSWIsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDcEQ7UUFFRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEYsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN4QixNQUFNLDBCQUEwQixHQUkxQixFQUFFLENBQUM7UUFDVCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxnQkFBK0MsQ0FBQztRQUVwRCxHQUFHO1lBQ0MsTUFBTSxTQUFTLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVoRSxLQUFLLE1BQU0sT0FBTyxJQUFJLFNBQVMsRUFBRTtnQkFDN0IsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLE1BQU0sQ0FBQyxjQUFjLENBQUMsaUJBQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBRTdGLElBQUksZ0JBQWdC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