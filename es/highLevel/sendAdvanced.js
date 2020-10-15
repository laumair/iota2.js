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
 * @param index Optional indexation name.
 * @param data Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
function sendAdvanced(client, seed, basePath, outputs, startIndex, index, data) {
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
            payload: index && data
                ? {
                    type: 2,
                    index,
                    data: data.toString("hex")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQWlEO0FBQ2pELDZDQUFtRDtBQUNuRCx1REFBb0U7QUFFcEUsK0NBQTRDO0FBVTVDLHNEQUFtRDtBQUNuRCxxQ0FBOEM7QUFDOUMsaUVBQThEO0FBRTlEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxTQUFzQixZQUFZLENBQzlCLE1BQWUsRUFDZixJQUFXLEVBQ1gsUUFBbUIsRUFDbkIsT0FBOEMsRUFDOUMsVUFBbUIsRUFDbkIsS0FBYyxFQUNkLElBQWE7O1FBS2IsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDcEQ7UUFFRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEYsSUFBSSxlQUFlLEdBQUcsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN4QixNQUFNLDBCQUEwQixHQUkxQixFQUFFLENBQUM7UUFDVCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxnQkFBc0MsQ0FBQztRQUUzQyxHQUFHO1lBQ0MsTUFBTSxTQUFTLEdBQUcsMkNBQW9CLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsMkJBQWtCLENBQUMsQ0FBQztZQUU1RixLQUFLLE1BQU0sT0FBTyxJQUFJLFNBQVMsRUFBRTtnQkFDN0IsTUFBTSxnQkFBZ0IsR0FBRyxNQUFN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