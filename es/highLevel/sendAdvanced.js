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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQWlEO0FBQ2pELDJDQUFtRDtBQUNuRCxxREFBb0U7QUFFcEUsNkNBQTRDO0FBVTVDLGdEQUErQztBQUMvQyxvREFBbUQ7QUFFbkQ7Ozs7Ozs7Ozs7R0FVRztBQUNILFNBQXNCLFlBQVksQ0FDOUIsTUFBZSxFQUNmLElBQVcsRUFDWCxRQUFtQixFQUNuQixPQUE4QyxFQUM5QyxVQUFtQixFQUNuQixhQUFzQixFQUN0QixjQUEyQjs7Ozs7O29CQUkzQixJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7cUJBQ3BEO29CQUVLLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBSyxFQUFFLE1BQU0sSUFBSyxPQUFBLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFyQixDQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVoRixlQUFlLEdBQUcsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksQ0FBQyxDQUFDO29CQUNsQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO29CQUNsQiwwQkFBMEIsR0FJMUIsRUFBRSxDQUFDO29CQUNMLFFBQVEsR0FBRyxLQUFLLENBQUM7OztvQkFHakIsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDekIsY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDckUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUVULE9BQU8sR0FBRyxxQkFB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