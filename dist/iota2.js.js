(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cross-fetch'), require('tweetnacl')) :
    typeof define === 'function' && define.amd ? define(['exports', 'cross-fetch', 'tweetnacl'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Iota2 = {}, global['cross-fetch'], global.tweetnacl));
}(this, (function (exports, fetch, nacl) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    /**
     * Class to handle http errors.
     */
    var ClientError = /** @class */ (function (_super) {
        __extends(ClientError, _super);
        /**
         * Create a new instance of ClientError.
         * @param message The message for the error.
         * @param route The route the request was made to.
         * @param httpStatus The http status code.
         * @param code The code in the payload.
         */
        function ClientError(message, route, httpStatus, code) {
            var _this = _super.call(this, message) || this;
            _this.route = route;
            _this.httpStatus = httpStatus;
            _this.code = code;
            return _this;
        }
        return ClientError;
    }(Error));

    /**
     * Client for API communication.
     */
    var Client = /** @class */ (function () {
        /**
         * Create a new instance of client.
         * @param endpoint The endpoint.
         */
        function Client(endpoint) {
            if (!/^https?:\/\/\w+(\.\w+)*(:\d+)?(\/.*)?$/.test(endpoint)) {
                throw new Error("The endpoint is not in the correct format");
            }
            this._endpoint = endpoint.replace(/\/+$/, "");
        }
        /**
         * Get the health of the node.
         * @returns True if the node is healthy.
         */
        Client.prototype.health = function () {
            return __awaiter(this, void 0, Promise, function () {
                var status;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fetchStatus("/health")];
                        case 1:
                            status = _a.sent();
                            if (status === 200) {
                                return [2 /*return*/, true];
                            }
                            else if (status === 503) {
                                return [2 /*return*/, false];
                            }
                            throw new ClientError("Unexpected response code", "/health", status);
                    }
                });
            });
        };
        /**
         * Get the info about the node.
         * @returns The node information.
         */
        Client.prototype.info = function () {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/info")];
                });
            });
        };
        /**
         * Get the tips from the node.
         * @returns The tips.
         */
        Client.prototype.tips = function () {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/tips")];
                });
            });
        };
        /**
         * Get the message data by id.
         * @param messageId The message to get the data for.
         * @returns The message data.
         */
        Client.prototype.message = function (messageId) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/messages/" + messageId)];
                });
            });
        };
        /**
         * Get the message metadata by id.
         * @param messageId The message to get the metadata for.
         * @returns The message metadata.
         */
        Client.prototype.messageMetadata = function (messageId) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/messages/" + messageId + "/metadata")];
                });
            });
        };
        /**
         * Get the message raw data by id.
         * @param messageId The message to get the data for.
         * @returns The message raw data.
         */
        Client.prototype.messageRaw = function (messageId) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchBinary("get", "/api/v1/messages/" + messageId + "/raw")];
                });
            });
        };
        /**
         * Submit message.
         * @param message The message to submit.
         * @returns The messageId.
         */
        Client.prototype.messageSubmit = function (message) {
            return __awaiter(this, void 0, Promise, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fetchJson("post", "/api/v1/messages", message)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.messageId];
                    }
                });
            });
        };
        /**
         * Submit message in raw format.
         * @param message The message to submit.
         * @returns The messageId.
         */
        Client.prototype.messageSubmitRaw = function (message) {
            return __awaiter(this, void 0, Promise, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fetchBinary("post", "/api/v1/messages", message)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.messageId];
                    }
                });
            });
        };
        /**
         * Find messages by index.
         * @param index The index value.
         * @returns The messageId.
         */
        Client.prototype.messagesFind = function (index) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/messages?index=" + encodeURIComponent(index))];
                });
            });
        };
        /**
         * Get the children of a message.
         * @param messageId The id of the message to get the children for.
         * @returns The messages children.
         */
        Client.prototype.messageChildren = function (messageId) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/messages/" + messageId + "/children")];
                });
            });
        };
        /**
         * Find an output by its identifier.
         * @param outputId The id of the output to get.
         * @returns The output details.
         */
        Client.prototype.output = function (outputId) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/outputs/" + outputId)];
                });
            });
        };
        /**
         * Get the address details.
         * @param address The address to get the details for.
         * @returns The address details.
         */
        Client.prototype.address = function (address) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/addresses/" + address)];
                });
            });
        };
        /**
         * Get the address outputs.
         * @param address The address to get the outputs for.
         * @returns The address outputs.
         */
        Client.prototype.addressOutputs = function (address) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/addresses/" + address + "/outputs")];
                });
            });
        };
        /**
         * Get the requested milestone.
         * @param index The index of the milestone to get.
         * @returns The milestone details.
         */
        Client.prototype.milestone = function (index) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/milestones/" + index)];
                });
            });
        };
        /**
         * Perform a request and just return the status.
         * @param route The route of the request.
         * @returns The response.
         * @private
         */
        Client.prototype.fetchStatus = function (route) {
            return __awaiter(this, void 0, Promise, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch__default['default']("" + this._endpoint + route, {
                                method: "get"
                            })];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.status];
                    }
                });
            });
        };
        /**
         * Perform a request in json format.
         * @param method The http method.
         * @param route The route of the request.
         * @param requestData Request to send to the endpoint.
         * @returns The response.
         * @private
         */
        Client.prototype.fetchJson = function (method, route, requestData) {
            var _a, _b, _c;
            return __awaiter(this, void 0, Promise, function () {
                var response, responseData;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, fetch__default['default']("" + this._endpoint + route, {
                                method: method,
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: requestData ? JSON.stringify(requestData) : undefined
                            })];
                        case 1:
                            response = _d.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            responseData = _d.sent();
                            if (response.ok && !responseData.error) {
                                return [2 /*return*/, responseData.data];
                            }
                            throw new ClientError((_b = (_a = responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData.error) === null || _c === void 0 ? void 0 : _c.code);
                    }
                });
            });
        };
        /**
         * Perform a request for binary data.
         * @param method The http method.
         * @param route The route of the request.
         * @param requestData Request to send to the endpoint.
         * @returns The response.
         * @private
         */
        Client.prototype.fetchBinary = function (method, route, requestData) {
            var _a, _b, _c;
            return __awaiter(this, void 0, Promise, function () {
                var response, responseData, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, fetch__default['default']("" + this._endpoint + route, {
                                method: "get",
                                headers: {
                                    "Content-Type": "application/octet-stream"
                                },
                                body: requestData
                            })];
                        case 1:
                            response = _f.sent();
                            if (!response.ok) return [3 /*break*/, 5];
                            if (!(method === "get")) return [3 /*break*/, 3];
                            _e = (_d = Buffer).from;
                            return [4 /*yield*/, response.arrayBuffer()];
                        case 2: return [2 /*return*/, _e.apply(_d, [_f.sent()])];
                        case 3: return [4 /*yield*/, response.json()];
                        case 4:
                            responseData = _f.sent();
                            if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
                                return [2 /*return*/, responseData === null || responseData === void 0 ? void 0 : responseData.data];
                            }
                            _f.label = 5;
                        case 5:
                            if (!!responseData) return [3 /*break*/, 7];
                            return [4 /*yield*/, response.json()];
                        case 6:
                            responseData = _f.sent();
                            _f.label = 7;
                        case 7: throw new ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
                    }
                });
            });
        };
        return Client;
    }());

    /**
     * Class to help with Blake2B Signature scheme.
     */
    var Blake2b = /** @class */ (function () {
        function Blake2b() {
        }
        /**
         * Public Key size.
         */
        Blake2b.SIZE_256 = 32;
        return Blake2b;
    }());

    /**
     * Class to help with ED25519 Signature scheme.
     */
    var ED25519 = /** @class */ (function () {
        function ED25519() {
        }
        /**
         * Generate a key pair from the seed.
         * @param seed The seed to generate the key pair from.
         * @returns The key pair.
         */
        ED25519.keyPairFromSeed = function (seed) {
            var signKeyPair = nacl.sign.keyPair.fromSeed(seed);
            return {
                publicKey: Buffer.from(signKeyPair.publicKey),
                secretKey: Buffer.from(signKeyPair.secretKey)
            };
        };
        /**
         * Privately sign the data.
         * @param keyPair The key pair to sign with.
         * @param buffer The data to sign.
         * @returns The signature.
         */
        ED25519.privateSign = function (keyPair, buffer) {
            return Buffer.from(nacl.sign.detached(buffer, keyPair.secretKey));
        };
        /**
         * Version for signature scheme.
         */
        ED25519.VERSION = 1;
        /**
         * Public Key size.
         */
        ED25519.PUBLIC_KEY_SIZE = 32;
        /**
         * Signature size for signing scheme.
         */
        ED25519.SIGNATURE_SIZE = 64;
        /**
         * Address size.
         */
        ED25519.ADDRESS_LENGTH = Blake2b.SIZE_256;
        return ED25519;
    }());

    var BYTE_SIZE = 1;
    var UINT16_SIZE = 2;
    var UINT32_SIZE = 4;
    var UINT64_SIZE = 8;
    var MESSAGE_ID_LENGTH = Blake2b.SIZE_256;
    var TRANSACTION_ID_LENGTH = Blake2b.SIZE_256;
    var TYPE_LENGTH = UINT32_SIZE;
    var STRING_LENGTH = UINT16_SIZE;
    var ARRAY_LENGTH = UINT16_SIZE;
    /**
     * Is the data hex format.
     * @param value The value to test.
     * @returns true if the string is hex.
     */
    function isHex(value) {
        if (value.length % 2 === 1) {
            return false;
        }
        return /[\da-f]/gi.test(value);
    }

    var MIN_ADDRESS_LENGTH = BYTE_SIZE;
    var MIN_ED25519_ADDRESS_LENGTH = ED25519.ADDRESS_LENGTH;
    /**
     * Deserialize the address from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeAddress(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_ADDRESS_LENGTH)) {
            throw new Error("Address data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_ADDRESS_LENGTH);
        }
        var type = readBuffer.readByte("address.type");
        var address;
        if (type === 1) {
            address = deserializeEd25519Address(readBuffer);
        }
        else {
            throw new Error("Unrecognized address type " + type);
        }
        return address;
    }
    /**
     * Serialize the address to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeAddress(writeBuffer, object) {
        writeBuffer.writeByte("address.type", object.type);
        if (object.type === 1) {
            serializeEd25519Address(writeBuffer, object);
        }
        else {
            throw new Error("Unrecognized address type " + object.type);
        }
    }
    /**
     * Deserialize the Ed25519 address from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeEd25519Address(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_ED25519_ADDRESS_LENGTH)) {
            throw new Error("Ed25519 address data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_ED25519_ADDRESS_LENGTH);
        }
        var address = readBuffer.readFixedBufferHex("ed25519Address.address", ED25519.ADDRESS_LENGTH);
        return {
            type: 1,
            address: address
        };
    }
    /**
     * Serialize the ed25519 address to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeEd25519Address(writeBuffer, object) {
        writeBuffer.writeFixedBufferHex("ed25519Address.address", ED25519.ADDRESS_LENGTH, object.address);
    }

    var MIN_INPUT_LENGTH = BYTE_SIZE;
    var MIN_UTXO_INPUT_LENGTH = TRANSACTION_ID_LENGTH + UINT16_SIZE;
    /**
     * Deserialize the inputs from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeInputs(readBuffer) {
        var numInputs = readBuffer.readUInt16("inputs.numInputs");
        var inputs = [];
        for (var i = 0; i < numInputs; i++) {
            inputs.push(deserializeInput(readBuffer));
        }
        return inputs;
    }
    /**
     * Serialize the inputs to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param objects The objects to serialize.
     */
    function serializeInputs(writeBuffer, objects) {
        writeBuffer.writeUInt16("inputs.numInputs", objects.length);
        for (var i = 0; i < objects.length; i++) {
            serializeInput(writeBuffer, objects[i]);
        }
    }
    /**
     * Deserialize the input from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeInput(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_INPUT_LENGTH)) {
            throw new Error("Input data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_INPUT_LENGTH);
        }
        var type = readBuffer.readByte("input.type");
        var input;
        if (type === 0) {
            input = deserializeUTXOInput(readBuffer);
        }
        else {
            throw new Error("Unrecognized input type " + type);
        }
        return input;
    }
    /**
     * Serialize the input to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeInput(writeBuffer, object) {
        writeBuffer.writeByte("input.type", object.type);
        if (object.type === 0) {
            serializeUTXOInput(writeBuffer, object);
        }
        else {
            throw new Error("Unrecognized input type " + object.type);
        }
    }
    /**
     * Deserialize the utxo input from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeUTXOInput(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_UTXO_INPUT_LENGTH)) {
            throw new Error("UTXO Input data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_UTXO_INPUT_LENGTH);
        }
        var transactionId = readBuffer.readFixedBufferHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH);
        var transactionOutputIndex = readBuffer.readUInt16("utxoInput.transactionOutputIndex");
        return {
            type: 0,
            transactionId: transactionId,
            transactionOutputIndex: transactionOutputIndex
        };
    }
    /**
     * Serialize the utxo input to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeUTXOInput(writeBuffer, object) {
        writeBuffer.writeFixedBufferHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH, object.transactionId);
        writeBuffer.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
    }

    var MIN_OUTPUT_LENGTH = BYTE_SIZE;
    var MIN_SIG_LOCKED_OUTPUT_LENGTH = BYTE_SIZE + MIN_ADDRESS_LENGTH + MIN_ED25519_ADDRESS_LENGTH;
    /**
     * Deserialize the outputs from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeOutputs(readBuffer) {
        var numOutputs = readBuffer.readUInt16("outputs.numOutputs");
        var inputs = [];
        for (var i = 0; i < numOutputs; i++) {
            inputs.push(deserializeOutput(readBuffer));
        }
        return inputs;
    }
    /**
     * Serialize the outputs to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param objects The objects to serialize.
     */
    function serializeOutputs(writeBuffer, objects) {
        writeBuffer.writeUInt16("outputs.numOutputs", objects.length);
        for (var i = 0; i < objects.length; i++) {
            serializeOutput(writeBuffer, objects[i]);
        }
    }
    /**
     * Deserialize the output from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeOutput(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_OUTPUT_LENGTH)) {
            throw new Error("Output data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_OUTPUT_LENGTH);
        }
        var type = readBuffer.readByte("output.type");
        var input;
        if (type === 0) {
            input = deserializeSigLockedSingleOutput(readBuffer);
        }
        else {
            throw new Error("Unrecognized output type " + type);
        }
        return input;
    }
    /**
     * Serialize the output to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeOutput(writeBuffer, object) {
        writeBuffer.writeByte("output.type", object.type);
        if (object.type === 0) {
            serializeSigLockedSingleOutput(writeBuffer, object);
        }
        else {
            throw new Error("Unrecognized output type " + object.type);
        }
    }
    /**
     * Deserialize the signature locked single output from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeSigLockedSingleOutput(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_SIG_LOCKED_OUTPUT_LENGTH)) {
            throw new Error("Signature Locked Single Output data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_SIG_LOCKED_OUTPUT_LENGTH);
        }
        var address = deserializeAddress(readBuffer);
        var amount = readBuffer.readUInt64("address.amount");
        return {
            type: 0,
            address: address,
            amount: Number(amount)
        };
    }
    /**
     * Serialize the signature locked single output to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeSigLockedSingleOutput(writeBuffer, object) {
        serializeAddress(writeBuffer, object.address);
        writeBuffer.writeUInt64("address.amount", BigInt(object.amount));
    }

    var MIN_TRANSACTION_ESSENCE_LENGTH = (2 * ARRAY_LENGTH) + UINT32_SIZE;
    /**
     * Deserialize the transaction essence from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeTransactionEssence(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_TRANSACTION_ESSENCE_LENGTH)) {
            throw new Error("Transaction essence data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_TRANSACTION_ESSENCE_LENGTH);
        }
        var inputs = deserializeInputs(readBuffer);
        var outputs = deserializeOutputs(readBuffer);
        var payload = deserializePayload(readBuffer);
        if (payload && payload.type !== 2) {
            throw new Error("Transaction essence can only contain embedded Indexation Payload");
        }
        return {
            type: 0,
            inputs: inputs,
            outputs: outputs,
            payload: payload
        };
    }
    /**
     * Serialize the transaction essence to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeTransactionEssence(writeBuffer, object) {
        serializeInputs(writeBuffer, object.inputs);
        serializeOutputs(writeBuffer, object.outputs);
        serializePayload(writeBuffer, object.payload);
    }

    var MIN_SIGNATURE_LENGTH = BYTE_SIZE;
    var MIN_ED25519_SIGNATURE_LENGTH = ED25519.SIGNATURE_SIZE + ED25519.PUBLIC_KEY_SIZE;
    /**
     * Deserialize the signature from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeSignature(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_SIGNATURE_LENGTH)) {
            throw new Error("Signature data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_SIGNATURE_LENGTH);
        }
        var type = readBuffer.readByte("signature.type");
        var input;
        if (type === 1) {
            input = deserializeEd25519Signature(readBuffer);
        }
        else {
            throw new Error("Unrecognized signature type " + type);
        }
        return input;
    }
    /**
     * Serialize the signature to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeSignature(writeBuffer, object) {
        writeBuffer.writeByte("signature.type", object.type);
        if (object.type === 1) {
            serializeEd25519Signature(writeBuffer, object);
        }
        else {
            throw new Error("Unrecognized signature type " + object.type);
        }
    }
    /**
     * Deserialize the Ed25519 signature from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeEd25519Signature(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_ED25519_SIGNATURE_LENGTH)) {
            throw new Error("Ed25519 signature data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_ED25519_SIGNATURE_LENGTH);
        }
        var publicKey = readBuffer.readFixedBufferHex("ed25519Signature.publicKey", ED25519.PUBLIC_KEY_SIZE);
        var signature = readBuffer.readFixedBufferHex("ed25519Signature.signature", ED25519.SIGNATURE_SIZE);
        return {
            type: 1,
            publicKey: publicKey,
            signature: signature
        };
    }
    /**
     * Serialize the Ed25519 signature to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeEd25519Signature(writeBuffer, object) {
        writeBuffer.writeFixedBufferHex("ed25519Signature.publicKey", ED25519.PUBLIC_KEY_SIZE, object.publicKey);
        writeBuffer.writeFixedBufferHex("ed25519Signature.signature", ED25519.SIGNATURE_SIZE, object.signature);
    }

    var MIN_UNLOCK_BLOCK_LENGTH = BYTE_SIZE;
    var MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = MIN_SIGNATURE_LENGTH + MIN_ED25519_SIGNATURE_LENGTH;
    var MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = UINT16_SIZE;
    /**
     * Deserialize the unlock blocks from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeUnlockBlocks(readBuffer) {
        var numUnlockBlocks = readBuffer.readUInt16("transactionEssence.numUnlockBlocks");
        var unlockBlocks = [];
        for (var i = 0; i < numUnlockBlocks; i++) {
            unlockBlocks.push(deserializeUnlockBlock(readBuffer));
        }
        return unlockBlocks;
    }
    /**
     * Serialize the unlock blocks to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param objects The objects to serialize.
     */
    function serializeUnlockBlocks(writeBuffer, objects) {
        writeBuffer.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);
        for (var i = 0; i < objects.length; i++) {
            serializeUnlockBlock(writeBuffer, objects[i]);
        }
    }
    /**
     * Deserialize the unlock block from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeUnlockBlock(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_UNLOCK_BLOCK_LENGTH)) {
            throw new Error("Unlock Block data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_UNLOCK_BLOCK_LENGTH);
        }
        var type = readBuffer.readByte("unlockBlock.type");
        var unlockBlock;
        if (type === 0) {
            unlockBlock = deserializeSignatureUnlockBlock(readBuffer);
        }
        else if (type === 1) {
            unlockBlock = deserializeReferenceUnlockBlock(readBuffer);
        }
        else {
            throw new Error("Unrecognized unlock block type " + type);
        }
        return unlockBlock;
    }
    /**
     * Serialize the unlock block to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeUnlockBlock(writeBuffer, object) {
        writeBuffer.writeByte("unlockBlock.type", object.type);
        if (object.type === 0) {
            serializeSignatureUnlockBlock(writeBuffer, object);
        }
        else if (object.type === 1) {
            serializeReferenceUnlockBlock(writeBuffer, object);
        }
        else {
            throw new Error("Unrecognized unlock block type " + object.type);
        }
    }
    /**
     * Deserialize the signature unlock block from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeSignatureUnlockBlock(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
            throw new Error("Signature Unlock Block data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH);
        }
        var signature = deserializeSignature(readBuffer);
        return {
            type: 0,
            signature: signature
        };
    }
    /**
     * Serialize the signature unlock block to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeSignatureUnlockBlock(writeBuffer, object) {
        serializeSignature(writeBuffer, object.signature);
    }
    /**
     * Deserialize the reference unlock block from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeReferenceUnlockBlock(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
            throw new Error("Reference Unlock Block data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_REFERENCE_UNLOCK_BLOCK_LENGTH);
        }
        var reference = readBuffer.readUInt16("referenceUnlockBlock.reference");
        return {
            type: 1,
            reference: reference
        };
    }
    /**
     * Serialize the reference unlock block to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeReferenceUnlockBlock(writeBuffer, object) {
        writeBuffer.writeUInt16("referenceUnlockBlock.reference", object.reference);
    }

    var MIN_PAYLOAD_LENGTH = TYPE_LENGTH;
    var MIN_MILESTONE_PAYLOAD_LENGTH = (2 * UINT64_SIZE) + (2 * 64);
    var MIN_INDEXATION_PAYLOAD_LENGTH = STRING_LENGTH + STRING_LENGTH;
    var MIN_TRANSACTION_PAYLOAD_LENGTH = UINT32_SIZE;
    /**
     * Deserialize the payload from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializePayload(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_PAYLOAD_LENGTH)) {
            throw new Error("Payload data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_PAYLOAD_LENGTH);
        }
        var payloadLength = readBuffer.readUInt32("payload.length");
        if (!readBuffer.hasRemaining(payloadLength)) {
            throw new Error("Payload length " + payloadLength + " exceeds the remaining data " + readBuffer.unused());
        }
        var payload;
        if (payloadLength > 0) {
            var payloadType = readBuffer.readUInt32("payload.type");
            if (payloadType === 0) {
                payload = deserializeTransactionPayload(readBuffer);
            }
            else if (payloadType === 1) {
                payload = deserializeMilestonePayload(readBuffer);
            }
            else if (payloadType === 2) {
                payload = deserializeIndexationPayload(readBuffer);
            }
            else {
                throw new Error("Unrecognized payload type " + payloadType);
            }
        }
        return payload;
    }
    /**
     * Serialize the payload essence to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializePayload(writeBuffer, object) {
        // Store the location for the payload length and write 0
        // we will rewind and fill in once the size of the payload is known
        var payloadLengthWriteIndex = writeBuffer.getWriteIndex();
        writeBuffer.writeUInt32("payload.length", 0);
        if (!object) ;
        else if (object.type === 0) {
            writeBuffer.writeUInt32("payload.type", object.type);
            serializeTransactionPayload(writeBuffer, object);
        }
        else if (object.type === 1) {
            writeBuffer.writeUInt32("payload.type", object.type);
            serializeMilestonePayload(writeBuffer, object);
        }
        else if (object.type === 2) {
            writeBuffer.writeUInt32("payload.type", object.type);
            serializeIndexationPayload(writeBuffer, object);
        }
        else {
            throw new Error("Unrecognized transaction type " + object.type);
        }
        var endOfPayloadWriteIndex = writeBuffer.getWriteIndex();
        writeBuffer.setWriteIndex(payloadLengthWriteIndex);
        writeBuffer.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - UINT32_SIZE);
        writeBuffer.setWriteIndex(endOfPayloadWriteIndex);
    }
    /**
     * Deserialize the transaction payload from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeTransactionPayload(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_TRANSACTION_PAYLOAD_LENGTH)) {
            throw new Error("Transaction Payload data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_TRANSACTION_PAYLOAD_LENGTH);
        }
        var type = readBuffer.readUInt32("payloadTransaction.type");
        var essence;
        var unlockBlocks;
        if (type === 0) {
            essence = deserializeTransactionEssence(readBuffer);
            unlockBlocks = deserializeUnlockBlocks(readBuffer);
        }
        else {
            throw new Error("Unrecognized transaction type " + type);
        }
        return {
            type: 0,
            essence: essence,
            unlockBlocks: unlockBlocks
        };
    }
    /**
     * Serialize the transaction payload essence to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeTransactionPayload(writeBuffer, object) {
        writeBuffer.writeUInt32("payloadTransaction.type", object.type);
        if (object.type === 0) {
            serializeTransactionEssence(writeBuffer, object.essence);
            serializeUnlockBlocks(writeBuffer, object.unlockBlocks);
        }
        else {
            throw new Error("Unrecognized transaction type " + object.type);
        }
    }
    /**
     * Deserialize the milestone payload from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeMilestonePayload(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_MILESTONE_PAYLOAD_LENGTH)) {
            throw new Error("Milestone Payload data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_MILESTONE_PAYLOAD_LENGTH);
        }
        var index = readBuffer.readUInt64("payloadMilestone.index");
        var timestamp = readBuffer.readUInt64("payloadMilestone.timestamp");
        var inclusionMerkleProof = readBuffer.readFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64);
        var signature = readBuffer.readFixedBufferHex("payloadMilestone.signature", 64);
        return {
            type: 1,
            index: Number(index),
            timestamp: Number(timestamp),
            inclusionMerkleProof: inclusionMerkleProof,
            signature: signature
        };
    }
    /**
     * Serialize the milestone payload essence to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeMilestonePayload(writeBuffer, object) {
        writeBuffer.writeUInt64("payloadMilestone.index", BigInt(object.index));
        writeBuffer.writeUInt64("payloadMilestone.dataLength", BigInt(object.timestamp));
        writeBuffer.writeFixedBufferHex("payloadMilestone.data", 64, object.inclusionMerkleProof);
        writeBuffer.writeFixedBufferHex("payloadMilestone.data", 64, object.signature);
    }
    /**
     * Deserialize the indexation payload from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeIndexationPayload(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_INDEXATION_PAYLOAD_LENGTH)) {
            throw new Error("Indexation Payload data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_INDEXATION_PAYLOAD_LENGTH);
        }
        var index = readBuffer.readString("payloadIndexation.index");
        var dataLength = readBuffer.readUInt32("payloadIndexation.dataLength");
        var data = readBuffer.readFixedBufferHex("payloadIndexation.data", dataLength);
        return {
            type: 2,
            index: index,
            data: data
        };
    }
    /**
     * Serialize the indexation payload essence to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeIndexationPayload(writeBuffer, object) {
        writeBuffer.writeString("payloadIndexation.index", object.index);
        writeBuffer.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
        writeBuffer.writeFixedBufferHex("payloadIndexation.data", object.data.length / 2, object.data);
    }

    var MIN_MESSAGE_LENGTH = BYTE_SIZE +
        (2 * MESSAGE_ID_LENGTH) +
        MIN_PAYLOAD_LENGTH +
        UINT64_SIZE;
    /**
     * Deserialize the message from binary.
     * @param readBuffer The message to deserialize.
     * @returns The deserialized message.
     */
    function deserializeMessage(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_MESSAGE_LENGTH)) {
            throw new Error("Message data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_MESSAGE_LENGTH);
        }
        var version = readBuffer.readByte("message.version");
        if (version !== 1) {
            throw new Error("Unsupported message version number: " + version);
        }
        var parent1MessageId = readBuffer.readFixedBufferHex("message.parent1MessageId", MESSAGE_ID_LENGTH);
        var parent2MessageId = readBuffer.readFixedBufferHex("message.parent2MessageId", MESSAGE_ID_LENGTH);
        var payload = deserializePayload(readBuffer);
        var nonce = readBuffer.readFixedBufferHex("message.nonce", UINT64_SIZE);
        var unused = readBuffer.unused();
        if (unused !== 0) {
            throw new Error("Message data length " + readBuffer.length() + " has unused data " + unused);
        }
        return {
            version: version,
            payload: payload,
            parent1MessageId: parent1MessageId,
            parent2MessageId: parent2MessageId,
            nonce: nonce
        };
    }
    /**
     * Serialize the message essence to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeMessage(writeBuffer, object) {
        var _a;
        writeBuffer.writeByte("message.version", object.version);
        writeBuffer.writeFixedBufferHex("message.parent1MessageId", MESSAGE_ID_LENGTH, object.parent1MessageId);
        writeBuffer.writeFixedBufferHex("message.parent2MessageId", MESSAGE_ID_LENGTH, object.parent2MessageId);
        serializePayload(writeBuffer, object.payload);
        writeBuffer.writeFixedBufferHex("message.nonce", UINT64_SIZE, (_a = object.nonce) !== null && _a !== void 0 ? _a : "");
    }

    /**
     * Log a message to the console.
     * @param prefix The prefix for the output.
     * @param message The message to log.
     */
    function logMessage(prefix, message) {
        console.log(prefix + "\tVersion:", message.version);
        console.log(prefix + "\tParent 1 Message Id:", message.parent1MessageId);
        console.log(prefix + "\tParent 2 Message Id:", message.parent2MessageId);
        logPayload(prefix + "\t", message.payload);
        if (message.nonce) {
            console.log(prefix + "\tNonce:", message.nonce);
        }
    }
    /**
     * Log a message to the console.
     * @param prefix The prefix for the output.
     * @param unknownPayload The payload.
     */
    function logPayload(prefix, unknownPayload) {
        if (unknownPayload) {
            if (unknownPayload.type === 0) {
                var payload = unknownPayload;
                console.log(prefix + "Transaction Payload");
                if (payload.essence.type === 0) {
                    if (payload.essence.inputs) {
                        console.log(prefix + "\tInputs:", payload.essence.inputs.length);
                        for (var _i = 0, _a = payload.essence.inputs; _i < _a.length; _i++) {
                            var input = _a[_i];
                            logInput(prefix + "\t\t", input);
                        }
                    }
                    if (payload.essence.outputs) {
                        console.log(prefix + "\tOutputs:", payload.essence.outputs.length);
                        for (var _b = 0, _c = payload.essence.outputs; _b < _c.length; _b++) {
                            var output = _c[_b];
                            logOutput(prefix + "\t\t", output);
                        }
                    }
                    logPayload(prefix + "\t", payload.essence.payload);
                }
                if (payload.unlockBlocks) {
                    console.log(prefix + "\tUnlock Blocks:", payload.unlockBlocks.length);
                    for (var _d = 0, _e = payload.unlockBlocks; _d < _e.length; _d++) {
                        var unlockBlock = _e[_d];
                        logUnlockBlock(prefix + "\t\t", unlockBlock);
                    }
                }
            }
            else if (unknownPayload.type === 1) {
                var payload = unknownPayload;
                console.log(prefix + "Milestone Payload");
                console.log(prefix + "\tIndex:", payload.index);
                console.log(prefix + "\tTimestamp:", payload.timestamp);
                console.log(prefix + "\tInclusion Merkle Proof:", payload.inclusionMerkleProof);
                console.log(prefix + "\tSignature:", payload.signature);
            }
            else if (unknownPayload.type === 2) {
                var payload = unknownPayload;
                console.log(prefix + "Indexation Payload");
                console.log(prefix + "\tIndex:", payload.index);
                console.log(prefix + "\tData:", Buffer.from(payload.data, "hex").toString());
            }
        }
    }
    /**
     * Log an address to the console.
     * @param prefix The prefix for the output.
     * @param unknownAddress The address to log.
     */
    function logAddress(prefix, unknownAddress) {
        if (unknownAddress) {
            if (unknownAddress.type === 1) {
                var address = unknownAddress;
                console.log(prefix + "Ed25519 Address");
                console.log(prefix + "\tAddress:", address.address);
            }
        }
    }
    /**
     * Log signature to the console.
     * @param prefix The prefix for the output.
     * @param unknownSignature The signature to log.
     */
    function logSignature(prefix, unknownSignature) {
        if (unknownSignature) {
            if (unknownSignature.type === 1) {
                var signature = unknownSignature;
                console.log(prefix + "Ed25519 Signature");
                console.log(prefix + "\tPublic Key:", signature.publicKey);
                console.log(prefix + "\tSignature:", signature.signature);
            }
        }
    }
    /**
     * Log input to the console.
     * @param prefix The prefix for the output.
     * @param unknownInput The input to log.
     */
    function logInput(prefix, unknownInput) {
        if (unknownInput) {
            if (unknownInput.type === 0) {
                var input = unknownInput;
                console.log(prefix + "UTXO Input");
                console.log(prefix + "\tTransaction Id:", input.transactionId);
                console.log(prefix + "\tTransaction Output Index:", input.transactionOutputIndex);
            }
        }
    }
    /**
     * Log output to the console.
     * @param prefix The prefix for the output.
     * @param unknownOutput The output to log.
     */
    function logOutput(prefix, unknownOutput) {
        if (unknownOutput) {
            if (unknownOutput.type === 0) {
                var output = unknownOutput;
                console.log(prefix + "Signature Locked Single Output");
                logAddress(prefix + "\t\t", output.address);
                console.log(prefix + "\t\tAmount:", output.amount);
            }
        }
    }
    /**
     * Log unlock block to the console.
     * @param prefix The prefix for the output.
     * @param unknownUnlockBlock The unlock block to log.
     */
    function logUnlockBlock(prefix, unknownUnlockBlock) {
        if (unknownUnlockBlock) {
            if (unknownUnlockBlock.type === 0) {
                var unlockBlock = unknownUnlockBlock;
                console.log(prefix + "\tSignature Unlock Block");
                logSignature(prefix + "\t\t\t", unlockBlock.signature);
            }
            else if (unknownUnlockBlock.type === 1) {
                var unlockBlock = unknownUnlockBlock;
                console.log(prefix + "\tReference Unlock Block");
                console.log(prefix + "\t\tReference:", unlockBlock.reference);
            }
        }
    }

    /**
     * Keep track of the read index within a buffer.
     */
    var ReadBuffer = /** @class */ (function () {
        /**
         * Create a new instance of ReadBuffer.
         * @param buffer The buffer to access.
         * @param readStartIndex The index to start the reading from.
         */
        function ReadBuffer(buffer, readStartIndex) {
            if (readStartIndex === void 0) { readStartIndex = 0; }
            this._buffer = buffer;
            this._readIndex = readStartIndex;
        }
        /**
         * Get the length of the buffer.
         * @returns The buffer length.
         */
        ReadBuffer.prototype.length = function () {
            return this._buffer.length;
        };
        /**
         * Does the buffer have enough data remaining.
         * @param remaining The amount of space needed.
         * @returns True if it has enough data.
         */
        ReadBuffer.prototype.hasRemaining = function (remaining) {
            return this._readIndex + remaining <= this._buffer.length;
        };
        /**
         * How much unused data is there.
         * @returns The amount of unused data.
         */
        ReadBuffer.prototype.unused = function () {
            return this._buffer.length - this._readIndex;
        };
        /**
         * Read fixed length buffer.
         * @param name The name of the data we are trying to read.
         * @param length The length of the data to read.
         * @returns The buffer.
         */
        ReadBuffer.prototype.readFixedBufferHex = function (name, length) {
            if (!this.hasRemaining(length)) {
                throw new Error(name + " length " + length + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.slice(this._readIndex, this._readIndex + length);
            this._readIndex += length;
            // console.log(name, val.toString("hex"));
            return val.toString("hex");
        };
        /**
         * Read a byte from the buffer.
         * @param name The name of the data we are trying to read.
         * @returns The value.
         */
        ReadBuffer.prototype.readByte = function (name) {
            if (!this.hasRemaining(1)) {
                throw new Error(name + " length " + 1 + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.readUInt8(this._readIndex);
            this._readIndex += 1;
            // console.log(name, val);
            return val;
        };
        /**
         * Read a UInt16 from the buffer.
         * @param name The name of the data we are trying to read.
         * @returns The value.
         */
        ReadBuffer.prototype.readUInt16 = function (name) {
            if (!this.hasRemaining(2)) {
                throw new Error(name + " length " + 2 + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.readUInt16LE(this._readIndex);
            this._readIndex += 2;
            // console.log(name, val);
            return val;
        };
        /**
         * Read a UInt32 from the buffer.
         * @param name The name of the data we are trying to read.
         * @returns The value.
         */
        ReadBuffer.prototype.readUInt32 = function (name) {
            if (!this.hasRemaining(4)) {
                throw new Error(name + " length " + 4 + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.readUInt32LE(this._readIndex);
            this._readIndex += 4;
            // console.log(name, val);
            return val;
        };
        /**
         * Read a UInt64 from the buffer.
         * @param name The name of the data we are trying to read.
         * @returns The value.
         */
        ReadBuffer.prototype.readUInt64 = function (name) {
            if (!this.hasRemaining(8)) {
                throw new Error(name + " length " + 8 + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.readBigUInt64LE(this._readIndex);
            this._readIndex += 8;
            // console.log(name, val);
            return val;
        };
        /**
         * Read a string from the buffer.
         * @param name The name of the data we are trying to read.
         * @returns The string.
         */
        ReadBuffer.prototype.readString = function (name) {
            var stringLength = this.readUInt16(name);
            if (!this.hasRemaining(stringLength)) {
                throw new Error(name + " length " + stringLength + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.slice(this._readIndex, this._readIndex + stringLength);
            this._readIndex += stringLength;
            // console.log(name, val);
            return val.toString();
        };
        return ReadBuffer;
    }());

    exports.ARRAY_LENGTH = ARRAY_LENGTH;
    exports.BYTE_SIZE = BYTE_SIZE;
    exports.Client = Client;
    exports.ClientError = ClientError;
    exports.ED25519 = ED25519;
    exports.MESSAGE_ID_LENGTH = MESSAGE_ID_LENGTH;
    exports.MIN_ADDRESS_LENGTH = MIN_ADDRESS_LENGTH;
    exports.MIN_ED25519_ADDRESS_LENGTH = MIN_ED25519_ADDRESS_LENGTH;
    exports.MIN_ED25519_SIGNATURE_LENGTH = MIN_ED25519_SIGNATURE_LENGTH;
    exports.MIN_INDEXATION_PAYLOAD_LENGTH = MIN_INDEXATION_PAYLOAD_LENGTH;
    exports.MIN_INPUT_LENGTH = MIN_INPUT_LENGTH;
    exports.MIN_MILESTONE_PAYLOAD_LENGTH = MIN_MILESTONE_PAYLOAD_LENGTH;
    exports.MIN_OUTPUT_LENGTH = MIN_OUTPUT_LENGTH;
    exports.MIN_PAYLOAD_LENGTH = MIN_PAYLOAD_LENGTH;
    exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = MIN_REFERENCE_UNLOCK_BLOCK_LENGTH;
    exports.MIN_SIGNATURE_LENGTH = MIN_SIGNATURE_LENGTH;
    exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH;
    exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = MIN_SIG_LOCKED_OUTPUT_LENGTH;
    exports.MIN_TRANSACTION_ESSENCE_LENGTH = MIN_TRANSACTION_ESSENCE_LENGTH;
    exports.MIN_TRANSACTION_PAYLOAD_LENGTH = MIN_TRANSACTION_PAYLOAD_LENGTH;
    exports.MIN_UNLOCK_BLOCK_LENGTH = MIN_UNLOCK_BLOCK_LENGTH;
    exports.MIN_UTXO_INPUT_LENGTH = MIN_UTXO_INPUT_LENGTH;
    exports.ReadBuffer = ReadBuffer;
    exports.STRING_LENGTH = STRING_LENGTH;
    exports.TRANSACTION_ID_LENGTH = TRANSACTION_ID_LENGTH;
    exports.TYPE_LENGTH = TYPE_LENGTH;
    exports.UINT16_SIZE = UINT16_SIZE;
    exports.UINT32_SIZE = UINT32_SIZE;
    exports.UINT64_SIZE = UINT64_SIZE;
    exports.deserializeAddress = deserializeAddress;
    exports.deserializeEd25519Address = deserializeEd25519Address;
    exports.deserializeEd25519Signature = deserializeEd25519Signature;
    exports.deserializeIndexationPayload = deserializeIndexationPayload;
    exports.deserializeInput = deserializeInput;
    exports.deserializeInputs = deserializeInputs;
    exports.deserializeMessage = deserializeMessage;
    exports.deserializeMilestonePayload = deserializeMilestonePayload;
    exports.deserializeOutput = deserializeOutput;
    exports.deserializeOutputs = deserializeOutputs;
    exports.deserializePayload = deserializePayload;
    exports.deserializeReferenceUnlockBlock = deserializeReferenceUnlockBlock;
    exports.deserializeSigLockedSingleOutput = deserializeSigLockedSingleOutput;
    exports.deserializeSignature = deserializeSignature;
    exports.deserializeSignatureUnlockBlock = deserializeSignatureUnlockBlock;
    exports.deserializeTransactionEssence = deserializeTransactionEssence;
    exports.deserializeTransactionPayload = deserializeTransactionPayload;
    exports.deserializeUTXOInput = deserializeUTXOInput;
    exports.deserializeUnlockBlock = deserializeUnlockBlock;
    exports.deserializeUnlockBlocks = deserializeUnlockBlocks;
    exports.isHex = isHex;
    exports.logAddress = logAddress;
    exports.logInput = logInput;
    exports.logMessage = logMessage;
    exports.logOutput = logOutput;
    exports.logPayload = logPayload;
    exports.logSignature = logSignature;
    exports.logUnlockBlock = logUnlockBlock;
    exports.serializeAddress = serializeAddress;
    exports.serializeEd25519Address = serializeEd25519Address;
    exports.serializeEd25519Signature = serializeEd25519Signature;
    exports.serializeIndexationPayload = serializeIndexationPayload;
    exports.serializeInput = serializeInput;
    exports.serializeInputs = serializeInputs;
    exports.serializeMessage = serializeMessage;
    exports.serializeMilestonePayload = serializeMilestonePayload;
    exports.serializeOutput = serializeOutput;
    exports.serializeOutputs = serializeOutputs;
    exports.serializePayload = serializePayload;
    exports.serializeReferenceUnlockBlock = serializeReferenceUnlockBlock;
    exports.serializeSigLockedSingleOutput = serializeSigLockedSingleOutput;
    exports.serializeSignature = serializeSignature;
    exports.serializeSignatureUnlockBlock = serializeSignatureUnlockBlock;
    exports.serializeTransactionEssence = serializeTransactionEssence;
    exports.serializeTransactionPayload = serializeTransactionPayload;
    exports.serializeUTXOInput = serializeUTXOInput;
    exports.serializeUnlockBlock = serializeUnlockBlock;
    exports.serializeUnlockBlocks = serializeUnlockBlocks;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
