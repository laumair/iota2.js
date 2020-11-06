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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAdvanced = void 0;
var input_1 = require("../binary/input");
var output_1 = require("../binary/output");
var transaction_1 = require("../binary/transaction");
var ed25519_1 = require("../crypto/ed25519");
var ed25519Address_1 = require("../crypto/ed25519Address");
var converter_1 = require("../utils/converter");
var writeStream_1 = require("../utils/writeStream");
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
function sendAdvanced(client, seed, basePath, outputs, startIndex, indexationKey, indexationData) {
    return __awaiter(this, void 0, void 0, function () {
        var requiredBalance, localStartIndex, consumedBalance, inputsAndSignatureKeyPairs, finished, addressKeyPair, address, addressOutputIds, _i, _a, addressOutputId, addressOutput, input, writeStream, outputsWithSerialization, _b, outputs_1, output, sigLockedOutput, writeStream, sortedInputs, sortedOutputs, transactionEssence, binaryEssence, essenceFinal, unlockBlocks, addressToUnlockBlock, _c, sortedInputs_1, input, hexInputAddressPublic, transactionPayload, tips, message, messageId;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!outputs || outputs.length === 0) {
                        throw new Error("You must specify some outputs");
                    }
                    requiredBalance = outputs.reduce(function (total, output) { return total + output.amount; }, 0);
                    localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
                    consumedBalance = 0;
                    inputsAndSignatureKeyPairs = [];
                    finished = false;
                    _d.label = 1;
                case 1:
                    basePath.push(localStartIndex);
                    addressKeyPair = seed.generateSeedFromPath(basePath).keyPair();
                    basePath.pop();
                    address = converter_1.Converter.bytesToHex(ed25519Address_1.Ed25519Address.publicKeyToAddress(addressKeyPair.publicKey));
                    return [4 /*yield*/, client.addressOutputs(address)];
                case 2:
                    addressOutputIds = _d.sent();
                    if (!(addressOutputIds.count === 0)) return [3 /*break*/, 3];
                    finished = true;
                    return [3 /*break*/, 7];
                case 3:
                    _i = 0, _a = addressOutputIds.outputIds;
                    _d.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    addressOutputId = _a[_i];
                    return [4 /*yield*/, client.output(addressOutputId)];
                case 5:
                    addressOutput = _d.sent();
                    if (!addressOutput.isSpent &&
                        consumedBalance < requiredBalance) {
                        if (addressOutput.output.amount === 0) {
                            finished = true;
                        }
                        else {
                            consumedBalance += addressOutput.output.amount;
                            input = {
                                type: 0,
                                transactionId: addressOutput.transactionId,
                                transactionOutputIndex: addressOutput.outputIndex
                            };
                            writeStream = new writeStream_1.WriteStream();
                            input_1.serializeInput(writeStream, input);
                            inputsAndSignatureKeyPairs.push({
                                input: input,
                                addressKeyPair: addressKeyPair,
                                serialized: writeStream.finalHex()
                            });
                            if (consumedBalance >= requiredBalance) {
                                // We didn't use all the balance from the last input
                                // so return the rest to the same address.
                                if (consumedBalance - requiredBalance > 0) {
                                    outputs.push({
                                        amount: consumedBalance - requiredBalance,
                                        address: address
                                    });
                                }
                                finished = true;
                            }
                        }
                    }
                    _d.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    localStartIndex++;
                    _d.label = 8;
                case 8:
                    if (!finished) return [3 /*break*/, 1];
                    _d.label = 9;
                case 9:
                    if (consumedBalance < requiredBalance) {
                        throw new Error("There are not enough funds in the inputs for the required balance");
                    }
                    outputsWithSerialization = [];
                    for (_b = 0, outputs_1 = outputs; _b < outputs_1.length; _b++) {
                        output = outputs_1[_b];
                        sigLockedOutput = {
                            type: 0,
                            address: {
                                type: 1,
                                address: output.address
                            },
                            amount: output.amount
                        };
                        writeStream = new writeStream_1.WriteStream();
                        output_1.serializeOutput(writeStream, sigLockedOutput);
                        outputsWithSerialization.push({
                            output: sigLockedOutput,
                            serialized: writeStream.finalHex()
                        });
                    }
                    sortedInputs = inputsAndSignatureKeyPairs.sort(function (a, b) { return a.serialized.localeCompare(b.serialized); });
                    sortedOutputs = outputsWithSerialization.sort(function (a, b) { return a.serialized.localeCompare(b.serialized); });
                    transactionEssence = {
                        type: 0,
                        inputs: sortedInputs.map(function (i) { return i.input; }),
                        outputs: sortedOutputs.map(function (o) { return o.output; }),
                        payload: indexationKey && indexationData
                            ? {
                                type: 2,
                                index: indexationKey,
                                data: converter_1.Converter.bytesToHex(indexationData)
                            }
                            : undefined
                    };
                    binaryEssence = new writeStream_1.WriteStream();
                    transaction_1.serializeTransactionEssence(binaryEssence, transactionEssence);
                    essenceFinal = binaryEssence.finalBytes();
                    unlockBlocks = [];
                    addressToUnlockBlock = {};
                    for (_c = 0, sortedInputs_1 = sortedInputs; _c < sortedInputs_1.length; _c++) {
                        input = sortedInputs_1[_c];
                        hexInputAddressPublic = converter_1.Converter.bytesToHex(input.addressKeyPair.publicKey);
                        if (addressToUnlockBlock[hexInputAddressPublic]) {
                            unlockBlocks.push({
                                type: 1,
                                reference: addressToUnlockBlock[hexInputAddressPublic].unlockIndex
                            });
                        }
                        else {
                            unlockBlocks.push({
                                type: 0,
                                signature: {
                                    type: 1,
                                    publicKey: hexInputAddressPublic,
                                    signature: converter_1.Converter.bytesToHex(ed25519_1.Ed25519.sign(input.addressKeyPair.privateKey, essenceFinal))
                                }
                            });
                            addressToUnlockBlock[hexInputAddressPublic] = {
                                keyPair: input.addressKeyPair,
                                unlockIndex: unlockBlocks.length - 1
                            };
                        }
                    }
                    transactionPayload = {
                        type: 0,
                        essence: transactionEssence,
                        unlockBlocks: unlockBlocks
                    };
                    return [4 /*yield*/, client.tips()];
                case 10:
                    tips = _d.sent();
                    message = {
                        version: 1,
                        parent1MessageId: tips.tip1MessageId,
                        parent2MessageId: tips.tip2MessageId,
                        payload: transactionPayload,
                        nonce: 0
                    };
                    return [4 /*yield*/, client.messageSubmit(message)];
                case 11:
                    messageId = _d.sent();
                    return [2 /*return*/, {
                            messageId: messageId,
                            message: message
                        }];
            }
        });
    });
}
exports.sendAdvanced = sendAdvanced;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQWlEO0FBQ2pELDJDQUFtRDtBQUNuRCxxREFBb0U7QUFFcEUsNkNBQTRDO0FBQzVDLDJEQUEwRDtBQVUxRCxnREFBK0M7QUFDL0Msb0RBQW1EO0FBRW5EOzs7Ozs7Ozs7O0dBVUc7QUFDSCxTQUFzQixZQUFZLENBQzlCLE1BQWUsRUFDZixJQUFXLEVBQ1gsUUFBbUIsRUFDbkIsT0FBOEMsRUFDOUMsVUFBbUIsRUFDbkIsYUFBc0IsRUFDdEIsY0FBMkI7Ozs7OztvQkFJM0IsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO3FCQUNwRDtvQkFFSyxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxNQUFNLElBQUssT0FBQSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBckIsQ0FBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFaEYsZUFBZSxHQUFHLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLENBQUMsQ0FBQztvQkFDbEMsZUFBZSxHQUFHLENBQUMsQ0FBQztvQkFDbEIsMEJBQTBCLEdBSTFCLEVBQUUsQ0FBQztvQkFDTCxRQUFRLEdBQUcsS0FBSyxDQUFDOzs7b0JBR2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ3pCLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3JFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFFVCxP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