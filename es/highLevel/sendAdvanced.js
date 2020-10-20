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
                    address = converter_1.Converter.bytesToHex(ed25519_1.Ed25519.publicKeyToAddress(addressKeyPair.publicKey));
                    return [4 /*yield*/, client.addressOutputs(address)];
                case 2:
                    addressOutputIds = _d.sent();
                    _i = 0, _a = addressOutputIds.outputIds;
                    _d.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    addressOutputId = _a[_i];
                    return [4 /*yield*/, client.output(addressOutputId)];
                case 4:
                    addressOutput = _d.sent();
                    if (!addressOutput.isSpent &&
                        addressOutput.output.amount !== 0 &&
                        consumedBalance < requiredBalance) {
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
                    _d.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    localStartIndex++;
                    _d.label = 7;
                case 7:
                    if (!finished) return [3 /*break*/, 1];
                    _d.label = 8;
                case 8:
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
                                    signature: converter_1.Converter.bytesToHex(ed25519_1.Ed25519.signData(input.addressKeyPair.privateKey, essenceFinal))
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
                case 9:
                    tips = _d.sent();
                    message = {
                        version: 1,
                        parent1MessageId: tips.tip1MessageId,
                        parent2MessageId: tips.tip2MessageId,
                        payload: transactionPayload,
                        nonce: 0
                    };
                    return [4 /*yield*/, client.messageSubmit(message)];
                case 10:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQWlEO0FBQ2pELDJDQUFtRDtBQUNuRCxxREFBb0U7QUFFcEUsNkNBQTRDO0FBVTVDLGdEQUErQztBQUMvQyxvREFBbUQ7QUFFbkQ7Ozs7Ozs7Ozs7R0FVRztBQUNILFNBQXNCLFlBQVksQ0FDOUIsTUFBZSxFQUNmLElBQVcsRUFDWCxRQUFtQixFQUNuQixPQUE4QyxFQUM5QyxVQUFtQixFQUNuQixhQUFzQixFQUN0QixjQUEyQjs7Ozs7O29CQUkzQixJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7cUJBQ3BEO29CQUVLLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBSyxFQUFFLE1BQU0sSUFBSyxPQUFBLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFyQixDQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVoRixlQUFlLEdBQUcsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksQ0FBQyxDQUFDO29CQUNsQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO29CQUNsQiwwQkFBMEIsR0FJMUIsRUFBRSxDQUFDO29CQUNMLFFBQVEsR0FBRyxLQUFLLENBQUM7OztvQkFHakIsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDekIsY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDckUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUVULE9BQU8sR0FBRyxxQkFB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