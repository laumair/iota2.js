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
exports.sendAdvanced = void 0;
const input_1 = require("../binary/input");
const output_1 = require("../binary/output");
const transaction_1 = require("../binary/transaction");
const ed25519_1 = require("../crypto/ed25519");
const writeBuffer_1 = require("../utils/writeBuffer");
const common_1 = require("./common");
const getAddressesKeyPairs_1 = require("./getAddressesKeyPairs");
/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param outputs The outputs to send.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param indexation Optional indexation name.
 * @param indexationData Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
function sendAdvanced(client, seed, basePath, outputs, startIndex, indexation, indexationData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!outputs || outputs.length === 0) {
            throw new Error("You must specify some outputs");
        }
        const requiredBalance = outputs.reduce((total, output) => total + output.amount, 0);
        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
        let consumedBalance = 0;
        const inputsAndSignatureKeyPairs = [];
        let finished = false;
        let remainderKeyPair;
        do {
            const addresses = getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, localStartIndex, common_1.DEFAULT_CHUNK_SIZE);
            for (const address of addresses) {
                const addressOutputIds = yield client.addressOutputs(ed25519_1.Ed25519.publicKeyToAddress(address.publicKey));
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
            localStartIndex += common_1.DEFAULT_CHUNK_SIZE;
        } while (!finished);
        if (consumedBalance < requiredBalance) {
            throw new Error("There are not enough funds in the inputs for the required balance");
        }
        // We have consumed more than we need to so add a remainder output
        // back to the address from the seed that didn't have any outputs or balance
        let remainderAddress;
        if (requiredBalance < consumedBalance && remainderKeyPair) {
            remainderAddress = ed25519_1.Ed25519.publicKeyToAddress(remainderKeyPair.publicKey);
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
            payload: indexation && indexationData
                ? {
                    type: 2,
                    index: indexation,
                    data: indexationData.toString("hex")
                }
                : undefined
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
            message,
            remainderAddress
        };
    });
}
exports.sendAdvanced = sendAdvanced;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQWlEO0FBQ2pELDZDQUFtRDtBQUNuRCx1REFBb0U7QUFFcEUsK0NBQTRDO0FBVTVDLHNEQUFtRDtBQUNuRCxxQ0FBOEM7QUFDOUMsaUVBQThEO0FBRTlEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxTQUFzQixZQUFZLENBQzlCLE1BQWUsRUFDZixJQUFXLEVBQ1gsUUFBbUIsRUFDbkIsT0FBOEMsRUFDOUMsVUFBbUIsRUFDbkIsVUFBbUIsRUFDbkIsY0FBdUI7O1FBS3ZCLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBGLElBQUksZUFBZSxHQUFHLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDeEIsTUFBTSwwQkFBMEIsR0FJMUIsRUFBRSxDQUFDO1FBQ1QsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksZ0JBQXNDLENBQUM7UUFFM0MsR0FBRztZQUNDLE1BQU0sU0FBUyxHQUFHLDJDQUFvQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLDJCQUFrQixDQUFDLENBQUM7WUFFNUYsS0FBSyxNQUFNLE9BQU8sSUFBSSxTQUFTLEVBQUU7Z0JBQzdCLE1BQU0sZ0JBQWdCLEdBQUcs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