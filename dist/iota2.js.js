(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cross-fetch'), require('tweetnacl'), require('blakejs'), require('crypto')) :
    typeof define === 'function' && define.amd ? define(['exports', 'cross-fetch', 'tweetnacl', 'blakejs', 'crypto'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Iota2 = {}, global['cross-fetch'], global.tweetnacl, global.blakejs, global.crypto));
}(this, (function (exports, fetch, nacl, blakejs, crypto) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
    var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);

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
    var SingleNodeClient = /** @class */ (function () {
        /**
         * Create a new instance of client.
         * @param endpoint The endpoint.
         */
        function SingleNodeClient(endpoint) {
            if (!/^https?:\/\/\w+(\.\w+)*(:\d+)?(\/.*)?$/.test(endpoint)) {
                throw new Error("The endpoint is not in the correct format");
            }
            this._endpoint = endpoint.replace(/\/+$/, "");
        }
        /**
         * Get the health of the node.
         * @returns True if the node is healthy.
         */
        SingleNodeClient.prototype.health = function () {
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
        SingleNodeClient.prototype.info = function () {
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
        SingleNodeClient.prototype.tips = function () {
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
        SingleNodeClient.prototype.message = function (messageId) {
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
        SingleNodeClient.prototype.messageMetadata = function (messageId) {
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
        SingleNodeClient.prototype.messageRaw = function (messageId) {
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
        SingleNodeClient.prototype.messageSubmit = function (message) {
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
        SingleNodeClient.prototype.messageSubmitRaw = function (message) {
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
        SingleNodeClient.prototype.messagesFind = function (index) {
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
        SingleNodeClient.prototype.messageChildren = function (messageId) {
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
        SingleNodeClient.prototype.output = function (outputId) {
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
        SingleNodeClient.prototype.address = function (address) {
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
        SingleNodeClient.prototype.addressOutputs = function (address) {
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
        SingleNodeClient.prototype.milestone = function (index) {
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
        SingleNodeClient.prototype.fetchStatus = function (route) {
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
        SingleNodeClient.prototype.fetchJson = function (method, route, requestData) {
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
        SingleNodeClient.prototype.fetchBinary = function (method, route, requestData) {
            var _a, _b, _c;
            return __awaiter(this, void 0, Promise, function () {
                var response, responseData, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, fetch__default['default']("" + this._endpoint + route, {
                                method: method,
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
        return SingleNodeClient;
    }());

    /**
     * Class to help with Blake2B Signature scheme.
     */
    var Blake2b = /** @class */ (function () {
        function Blake2b() {
        }
        /**
         * Perform Sum 256 on the data.
         * @param data The data to operate on.
         * @returns The sum 256 of the data.
         */
        Blake2b.sum256 = function (data) {
            return Buffer.from(blakejs.blake2b(Buffer.from(data, "hex"), undefined, Blake2b.SIZE_256)).toString("hex");
        };
        /**
         * Blake2b 256.
         */
        Blake2b.SIZE_256 = 32;
        return Blake2b;
    }());

    /**
     * Class to help with Ed25519 Signature scheme.
     */
    var Ed25519 = /** @class */ (function () {
        function Ed25519() {
        }
        /**
         * Privately sign the data.
         * @param privateKey The private key to sign with.
         * @param data The data to sign.
         * @returns The signature.
         */
        Ed25519.signData = function (privateKey, data) {
            return Buffer.from(nacl.sign.detached(data, Buffer.from(privateKey, "hex"))).toString("hex");
        };
        /**
         * Use the public key and signature to validate the data.
         * @param publicKey The public key to verify with.
         * @param signature The signature to verify.
         * @param data The data to verify.
         * @returns True if the data and address is verified.
         */
        Ed25519.verifyData = function (publicKey, signature, data) {
            return nacl.sign.detached.verify(data, Buffer.from(signature, "hex"), Buffer.from(publicKey, "hex"));
        };
        /**
         * Convert the public key to an address.
         * @param publicKey The public key to convert.
         * @returns The address.
         */
        Ed25519.publicKeyToAddress = function (publicKey) {
            return Blake2b.sum256(publicKey);
        };
        /**
         * Use the public key to validate the address.
         * @param publicKey The public key to verify with.
         * @param address The address to verify.
         * @returns True if the data and address is verified.
         */
        Ed25519.verifyAddress = function (publicKey, address) {
            var addressFromPublicKey = Ed25519.publicKeyToAddress(publicKey);
            return addressFromPublicKey === address;
        };
        /**
         * Version for signature scheme.
         */
        Ed25519.VERSION = 1;
        /**
         * Public Key size.
         */
        Ed25519.PUBLIC_KEY_SIZE = 32;
        /**
         * Signature size for signing scheme.
         */
        Ed25519.SIGNATURE_SIZE = 64;
        /**
         * Address size.
         */
        Ed25519.ADDRESS_LENGTH = Blake2b.SIZE_256;
        return Ed25519;
    }());

    var BYTE_SIZE = 1;
    var UINT16_SIZE = 2;
    var UINT32_SIZE = 4;
    var UINT64_SIZE = 8;
    var MESSAGE_ID_LENGTH = Blake2b.SIZE_256;
    var TRANSACTION_ID_LENGTH = Blake2b.SIZE_256;
    var TYPE_LENGTH = UINT32_SIZE;
    var SMALL_TYPE_LENGTH = BYTE_SIZE;
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

    var MIN_ADDRESS_LENGTH = SMALL_TYPE_LENGTH;
    var MIN_ED25519_ADDRESS_LENGTH = MIN_ADDRESS_LENGTH + Ed25519.ADDRESS_LENGTH;
    /**
     * Deserialize the address from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeAddress(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_ADDRESS_LENGTH)) {
            throw new Error("Address data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_ADDRESS_LENGTH);
        }
        var type = readBuffer.readByte("address.type", false);
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
        var type = readBuffer.readByte("ed25519Address.type");
        if (type !== 1) {
            throw new Error("Type mismatch in ed25519Address " + type);
        }
        var address = readBuffer.readFixedBufferHex("ed25519Address.address", Ed25519.ADDRESS_LENGTH);
        return {
            type: type,
            address: address
        };
    }
    /**
     * Serialize the ed25519 address to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeEd25519Address(writeBuffer, object) {
        writeBuffer.writeByte("ed25519Address.type", object.type);
        writeBuffer.writeFixedBufferHex("ed25519Address.address", Ed25519.ADDRESS_LENGTH, object.address);
    }

    var MIN_INPUT_LENGTH = SMALL_TYPE_LENGTH;
    var MIN_UTXO_INPUT_LENGTH = MIN_INPUT_LENGTH + TRANSACTION_ID_LENGTH + UINT16_SIZE;
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
        var type = readBuffer.readByte("input.type", false);
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
        var type = readBuffer.readByte("utxoInput.type");
        if (type !== 0) {
            throw new Error("Type mismatch in utxoInput " + type);
        }
        var transactionId = readBuffer.readFixedBufferHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH);
        var transactionOutputIndex = readBuffer.readUInt16("utxoInput.transactionOutputIndex");
        return {
            type: type,
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
        writeBuffer.writeByte("utxoInput.type", object.type);
        writeBuffer.writeFixedBufferHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH, object.transactionId);
        writeBuffer.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
    }

    var MIN_OUTPUT_LENGTH = SMALL_TYPE_LENGTH;
    var MIN_SIG_LOCKED_OUTPUT_LENGTH = MIN_OUTPUT_LENGTH + MIN_ADDRESS_LENGTH + MIN_ED25519_ADDRESS_LENGTH;
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
        var type = readBuffer.readByte("output.type", false);
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
        var type = readBuffer.readByte("sigLockedSingleOutput.type");
        if (type !== 0) {
            throw new Error("Type mismatch in sigLockedSingleOutput " + type);
        }
        var address = deserializeAddress(readBuffer);
        var amount = readBuffer.readUInt64("sigLockedSingleOutput.amount");
        return {
            type: type,
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
        writeBuffer.writeByte("sigLockedSingleOutput.type", object.type);
        serializeAddress(writeBuffer, object.address);
        writeBuffer.writeUInt64("sigLockedSingleOutput.amount", BigInt(object.amount));
    }

    var MIN_TRANSACTION_ESSENCE_LENGTH = UINT32_SIZE + (2 * ARRAY_LENGTH) + UINT32_SIZE;
    /**
     * Deserialize the transaction essence from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeTransactionEssence(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_TRANSACTION_ESSENCE_LENGTH)) {
            throw new Error("Transaction essence data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_TRANSACTION_ESSENCE_LENGTH);
        }
        var type = readBuffer.readUInt32("transactionEssence.type");
        if (type !== 0) {
            throw new Error("Type mismatch in transactionEssence " + type);
        }
        var inputs = deserializeInputs(readBuffer);
        var outputs = deserializeOutputs(readBuffer);
        var payload = deserializePayload(readBuffer);
        if (payload && payload.type !== 2) {
            throw new Error("Transaction essence can only contain embedded Indexation Payload");
        }
        return {
            type: type,
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
        writeBuffer.writeUInt32("transactionEssence.type", object.type);
        serializeInputs(writeBuffer, object.inputs);
        serializeOutputs(writeBuffer, object.outputs);
        serializePayload(writeBuffer, object.payload);
    }

    var MIN_SIGNATURE_LENGTH = SMALL_TYPE_LENGTH;
    var MIN_ED25519_SIGNATURE_LENGTH = MIN_SIGNATURE_LENGTH + Ed25519.SIGNATURE_SIZE + Ed25519.PUBLIC_KEY_SIZE;
    /**
     * Deserialize the signature from binary.
     * @param readBuffer The buffer to read the data from.
     * @returns The deserialized object.
     */
    function deserializeSignature(readBuffer) {
        if (!readBuffer.hasRemaining(MIN_SIGNATURE_LENGTH)) {
            throw new Error("Signature data is " + readBuffer.length() + " in length which is less than the minimimum size required of " + MIN_SIGNATURE_LENGTH);
        }
        var type = readBuffer.readByte("signature.type", false);
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
        var type = readBuffer.readByte("ed25519Signature.type");
        if (type !== 1) {
            throw new Error("Type mismatch in ed25519Signature " + type);
        }
        var publicKey = readBuffer.readFixedBufferHex("ed25519Signature.publicKey", Ed25519.PUBLIC_KEY_SIZE);
        var signature = readBuffer.readFixedBufferHex("ed25519Signature.signature", Ed25519.SIGNATURE_SIZE);
        return {
            type: type,
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
        writeBuffer.writeByte("ed25519Signature.type", object.type);
        writeBuffer.writeFixedBufferHex("ed25519Signature.publicKey", Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
        writeBuffer.writeFixedBufferHex("ed25519Signature.signature", Ed25519.SIGNATURE_SIZE, object.signature);
    }

    var MIN_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH;
    var MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = MIN_UNLOCK_BLOCK_LENGTH + MIN_SIGNATURE_LENGTH;
    var MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = MIN_UNLOCK_BLOCK_LENGTH + UINT16_SIZE;
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
        var type = readBuffer.readByte("unlockBlock.type", false);
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
        var type = readBuffer.readByte("signatureUnlockBlock.type");
        if (type !== 0) {
            throw new Error("Type mismatch in signatureUnlockBlock " + type);
        }
        var signature = deserializeSignature(readBuffer);
        return {
            type: type,
            signature: signature
        };
    }
    /**
     * Serialize the signature unlock block to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeSignatureUnlockBlock(writeBuffer, object) {
        writeBuffer.writeByte("signatureUnlockBlock.type", object.type);
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
        var type = readBuffer.readByte("referenceUnlockBlock.type");
        if (type !== 1) {
            throw new Error("Type mismatch in referenceUnlockBlock " + type);
        }
        var reference = readBuffer.readUInt16("referenceUnlockBlock.reference");
        return {
            type: type,
            reference: reference
        };
    }
    /**
     * Serialize the reference unlock block to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeReferenceUnlockBlock(writeBuffer, object) {
        writeBuffer.writeByte("referenceUnlockBlock.type", object.type);
        writeBuffer.writeUInt16("referenceUnlockBlock.reference", object.reference);
    }

    var MIN_PAYLOAD_LENGTH = TYPE_LENGTH;
    var MIN_MILESTONE_PAYLOAD_LENGTH = MIN_PAYLOAD_LENGTH + (2 * UINT64_SIZE) + (2 * 64);
    var MIN_INDEXATION_PAYLOAD_LENGTH = MIN_PAYLOAD_LENGTH + STRING_LENGTH + STRING_LENGTH;
    var MIN_TRANSACTION_PAYLOAD_LENGTH = MIN_PAYLOAD_LENGTH + UINT32_SIZE;
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
            var payloadType = readBuffer.readUInt32("payload.type", false);
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
            serializeTransactionPayload(writeBuffer, object);
        }
        else if (object.type === 1) {
            serializeMilestonePayload(writeBuffer, object);
        }
        else if (object.type === 2) {
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
        if (type !== 0) {
            throw new Error("Type mismatch in payloadTransaction " + type);
        }
        var essenceType = readBuffer.readUInt32("payloadTransaction.essenceType", false);
        var essence;
        var unlockBlocks;
        if (essenceType === 0) {
            essence = deserializeTransactionEssence(readBuffer);
            unlockBlocks = deserializeUnlockBlocks(readBuffer);
        }
        else {
            throw new Error("Unrecognized transaction essence type " + type);
        }
        return {
            type: type,
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
        writeBuffer.writeUInt32("payloadMilestone.type", object.type);
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
        var type = readBuffer.readUInt32("payloadMilestone.type");
        if (type !== 1) {
            throw new Error("Type mismatch in payloadMilestone " + type);
        }
        var index = readBuffer.readUInt64("payloadMilestone.index");
        var timestamp = readBuffer.readUInt64("payloadMilestone.timestamp");
        var inclusionMerkleProof = readBuffer.readFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64);
        var signature = readBuffer.readFixedBufferHex("payloadMilestone.signature", 64);
        return {
            type: type,
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
        writeBuffer.writeUInt32("payloadMilestone.type", object.type);
        writeBuffer.writeUInt64("payloadMilestone.index", BigInt(object.index));
        writeBuffer.writeUInt64("payloadMilestone.timestamp", BigInt(object.timestamp));
        writeBuffer.writeFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64, object.inclusionMerkleProof);
        writeBuffer.writeFixedBufferHex("payloadMilestone.signature", 64, object.signature);
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
        var type = readBuffer.readUInt32("payloadIndexation.type");
        if (type !== 2) {
            throw new Error("Type mismatch in payloadIndexation " + type);
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
        writeBuffer.writeUInt32("payloadIndexation.type", object.type);
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
        var nonce = readBuffer.readUInt64("message.nonce");
        var unused = readBuffer.unused();
        if (unused !== 0) {
            throw new Error("Message data length " + readBuffer.length() + " has unused data " + unused);
        }
        return {
            version: version,
            payload: payload,
            parent1MessageId: parent1MessageId,
            parent2MessageId: parent2MessageId,
            nonce: Number(nonce)
        };
    }
    /**
     * Serialize the message essence to binary.
     * @param writeBuffer The buffer to write the data to.
     * @param object The object to serialize.
     */
    function serializeMessage(writeBuffer, object) {
        writeBuffer.writeByte("message.version", object.version);
        writeBuffer.writeFixedBufferHex("message.parent1MessageId", MESSAGE_ID_LENGTH, object.parent1MessageId);
        writeBuffer.writeFixedBufferHex("message.parent2MessageId", MESSAGE_ID_LENGTH, object.parent2MessageId);
        serializePayload(writeBuffer, object.payload);
        writeBuffer.writeUInt64("message.nonce", BigInt(object.nonce));
    }

    /**
     * Class to help with bip32 paths.
     */
    var Bip32Path = /** @class */ (function () {
        /**
         * Create a new instance of Bip32Path.
         * @param initialPath Initial path to create.
         */
        function Bip32Path(initialPath) {
            if (initialPath) {
                this._path = initialPath.split("/");
                if (this._path[0] === "m") {
                    this._path.shift();
                }
            }
            else {
                this._path = [];
            }
        }
        /**
         * Converts the path to a string.
         * @returns The path as a string.
         */
        Bip32Path.prototype.toString = function () {
            return this._path.length > 0 ? "m/" + this._path.join("/") : "m";
        };
        /**
         * Push a new index on to the path.
         * @param index The index to add to the path.
         */
        Bip32Path.prototype.push = function (index) {
            this._path.push("" + index);
        };
        /**
         * Push a new hardened index on to the path.
         * @param index The index to add to the path.
         */
        Bip32Path.prototype.pushHardened = function (index) {
            this._path.push(index + "'");
        };
        /**
         * Pop an index from the path.
         */
        Bip32Path.prototype.pop = function () {
            this._path.pop();
        };
        /**
         * Get the segments.
         * @returns The segments as numbers.
         */
        Bip32Path.prototype.numberSegments = function () {
            return this._path.map(function (p) { return Number.parseInt(p, 10); });
        };
        return Bip32Path;
    }());

    var createHmac = crypto__default['default'].createHmac;

    /**
     * Class to help with slip0010 key derivation.
     * https://github.com/satoshilabs/slips/blob/master/slip-0010.md
     */
    var Slip0010 = /** @class */ (function () {
        function Slip0010() {
        }
        /**
         * Get the master key from the seed.
         * @param seed The seed to generate the master key from.
         * @returns The key and chain code.
         */
        Slip0010.getMasterKeyFromSeed = function (seed) {
            var hmac = createHmac("sha512", "ed25519 seed");
            var fullKey = hmac.update(seed).digest();
            return {
                privateKey: fullKey.slice(0, 32),
                chainCode: fullKey.slice(32)
            };
        };
        /**
         * Derive a key from the path.
         * @param seed The seed.
         * @param path The path.
         * @returns The key and chain code.
         */
        Slip0010.derivePath = function (seed, path) {
            var _a = Slip0010.getMasterKeyFromSeed(seed), privateKey = _a.privateKey, chainCode = _a.chainCode;
            var segments = path.numberSegments();
            for (var i = 0; i < segments.length; i++) {
                var indexBuffer = Buffer.allocUnsafe(4);
                indexBuffer.writeUInt32BE(0x80000000 + segments[i], 0);
                var data = Buffer.concat([Buffer.alloc(1, 0), privateKey, indexBuffer]);
                var fullKey = createHmac("sha512", chainCode)
                    .update(data)
                    .digest();
                privateKey = fullKey.slice(0, 32);
                chainCode = fullKey.slice(32);
            }
            return {
                privateKey: privateKey,
                chainCode: chainCode
            };
        };
        /**
         * Get the public key from the private key.
         * @param privateKey The private key.
         * @param withZeroByte Include a zero bute prefix.
         * @returns The public key.
         */
        Slip0010.getPublicKey = function (privateKey, withZeroByte) {
            if (withZeroByte === void 0) { withZeroByte = true; }
            var keyPair = nacl.sign.keyPair.fromSeed(privateKey);
            var signPk = Buffer.from(keyPair.secretKey.slice(32));
            return withZeroByte
                ? Buffer.concat([Buffer.alloc(1, 0), signPk])
                : signPk;
        };
        return Slip0010;
    }());

    /**
     * Class to help with seeds.
     */
    var Ed25519Seed = /** @class */ (function () {
        function Ed25519Seed() {
            /**
             * The secret key for the seed.
             */
            this._secretKey = Buffer.alloc(0);
        }
        /**
         * Create a seed from the bytes.
         * @param buffer The binary representation of the seed.
         * @returns The seed.
         */
        Ed25519Seed.fromBytes = function (buffer) {
            var seed = new Ed25519Seed();
            seed._secretKey = buffer;
            return seed;
        };
        /**
         * Create a seed from the hex string.
         * @param hex The hex representation of the seed.
         * @returns The seed.
         */
        Ed25519Seed.fromString = function (hex) {
            var seed = new Ed25519Seed();
            seed._secretKey = Buffer.from(hex, "hex");
            return seed;
        };
        /**
         * Generate a new random seed.
         * @returns The random seed.
         */
        Ed25519Seed.random = function () {
            return Ed25519Seed.fromBytes(Buffer.from(nacl.randomBytes(Ed25519Seed.SEED_SIZE_BYTES)));
        };
        /**
         * Get the key pair from the seed.
         * @returns The key pair.
         */
        Ed25519Seed.prototype.keyPair = function () {
            var signKeyPair = nacl.sign.keyPair.fromSeed(this._secretKey);
            return {
                publicKey: Buffer.from(signKeyPair.publicKey).toString("hex"),
                privateKey: Buffer.from(signKeyPair.secretKey).toString("hex")
            };
        };
        /**
         * Generate a new seed from the path.
         * @param path The path to generate the seed for.
         * @returns The generated seed.
         */
        Ed25519Seed.prototype.generateSeedFromPath = function (path) {
            var keys = Slip0010.derivePath(this._secretKey, path);
            return Ed25519Seed.fromBytes(keys.privateKey);
        };
        /**
         * Return the key as bytes.
         * @returns The key as bytes.
         */
        Ed25519Seed.prototype.toBytes = function () {
            return this._secretKey;
        };
        /**
         * Return the key as string.
         * @returns The key as string.
         */
        Ed25519Seed.prototype.toString = function () {
            return this._secretKey.toString("hex");
        };
        /**
         * SeedSize is the size, in bytes, of private key seeds.
         */
        Ed25519Seed.SEED_SIZE_BYTES = 32;
        return Ed25519Seed;
    }());

    var DEFAULT_CHUNK_SIZE = 20;

    /**
     * Get the balance for a list of addresses.
     * @param client The client to send the transfer with.
     * @param addresses The list of addresses to get the balance for.
     * @returns The balances.
     */
    function getAddressBalances(client, addresses) {
        return __awaiter(this, void 0, Promise, function () {
            var balances, _i, addresses_1, address, addressOutputIds, balance, _a, _b, addressOutputId, addressOutput;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        balances = [];
                        _i = 0, addresses_1 = addresses;
                        _c.label = 1;
                    case 1:
                        if (!(_i < addresses_1.length)) return [3 /*break*/, 8];
                        address = addresses_1[_i];
                        return [4 /*yield*/, client.addressOutputs(address)];
                    case 2:
                        addressOutputIds = _c.sent();
                        balance = 0;
                        _a = 0, _b = addressOutputIds.outputIds;
                        _c.label = 3;
                    case 3:
                        if (!(_a < _b.length)) return [3 /*break*/, 6];
                        addressOutputId = _b[_a];
                        return [4 /*yield*/, client.output(addressOutputId)];
                    case 4:
                        addressOutput = _c.sent();
                        if (!addressOutput.isSpent) {
                            balance += addressOutput.output.amount;
                        }
                        _c.label = 5;
                    case 5:
                        _a++;
                        return [3 /*break*/, 3];
                    case 6:
                        balances.push(balance);
                        _c.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/, balances];
                }
            });
        });
    }

    /**
     * Generate a list of address key pairs.
     * @param seed The seed.
     * @param basePath The base path to start looking for addresses.
     * @param startIndex The start index to generate from, defaults to 0.
     * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
     * @returns A list of the signature key pairs for the addresses.
     */
    function getAddressesKeyPairs(seed, basePath, startIndex, count) {
        if (startIndex === void 0) { startIndex = 0; }
        if (count === void 0) { count = DEFAULT_CHUNK_SIZE; }
        var keyPairs = [];
        for (var i = startIndex; i < startIndex + count; i++) {
            basePath.push(i);
            var newSeed = seed.generateSeedFromPath(basePath);
            keyPairs.push(newSeed.keyPair());
            basePath.pop();
        }
        return keyPairs;
    }

    /**
     * Generate a list of address key pairs.
     * @param seed The seed.
     * @param basePath The base path to start looking for addresses.
     * @param startIndex The start index to generate from, defaults to 0.
     * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
     * @returns A list of the signature key pairs for the addresses.
     */
    function getAddresses(seed, basePath, startIndex, count) {
        if (startIndex === void 0) { startIndex = 0; }
        if (count === void 0) { count = DEFAULT_CHUNK_SIZE; }
        return getAddressesKeyPairs(seed, basePath, startIndex, count).map(function (kp) { return Ed25519.publicKeyToAddress(kp.publicKey); });
    }

    /**
     * Get all the unspent addresses.
     * @param client The client to send the transfer with.
     * @param seed The seed to use for address generation.
     * @param basePath The base path to start looking for addresses.
     * @param startIndex Optional start index for the wallet count address, defaults to 0.
     * @returns All the unspent addresses.
     */
    function getAllUnspentAddresses(client, seed, basePath, startIndex) {
        return __awaiter(this, void 0, Promise, function () {
            var localStartIndex, finished, allUnspent, addresses, i, addr, addressOutputIds, amount, _i, _a, addressOutputId, addressOutput;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
                        finished = false;
                        allUnspent = [];
                        _b.label = 1;
                    case 1:
                        addresses = getAddressesKeyPairs(seed, basePath, localStartIndex, DEFAULT_CHUNK_SIZE);
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < addresses.length)) return [3 /*break*/, 9];
                        addr = Ed25519.publicKeyToAddress(addresses[i].publicKey);
                        return [4 /*yield*/, client.addressOutputs(addr)];
                    case 3:
                        addressOutputIds = _b.sent();
                        amount = 0;
                        _i = 0, _a = addressOutputIds.outputIds;
                        _b.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        addressOutputId = _a[_i];
                        return [4 /*yield*/, client.output(addressOutputId)];
                    case 5:
                        addressOutput = _b.sent();
                        if (!addressOutput.isSpent && addressOutput.output.amount !== 0) {
                            amount += addressOutput.output.amount;
                        }
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        if (amount === 0) {
                            finished = true;
                        }
                        else {
                            allUnspent.push({
                                address: addr,
                                index: localStartIndex + i,
                                amount: amount
                            });
                        }
                        _b.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 2];
                    case 9:
                        localStartIndex += DEFAULT_CHUNK_SIZE;
                        _b.label = 10;
                    case 10:
                        if (!finished) return [3 /*break*/, 1];
                        _b.label = 11;
                    case 11: return [2 /*return*/, allUnspent];
                }
            });
        });
    }

    /**
     * Get the balance for the address.
     * @param client The client to send the transfer with.
     * @param seed The seed to use for address generation.
     * @param basePath The base path to start looking for addresses.
     * @param startIndex Optional start index for the wallet count address, defaults to 0.
     * @returns The balance.
     */
    function getBalance(client, seed, basePath, startIndex) {
        return __awaiter(this, void 0, Promise, function () {
            var localStartIndex, finished, balance, addresses, i, addr, addressOutputIds, _i, _a, addressOutputId, addressOutput;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
                        finished = false;
                        balance = 0;
                        _b.label = 1;
                    case 1:
                        addresses = getAddressesKeyPairs(seed, basePath, localStartIndex, DEFAULT_CHUNK_SIZE);
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < addresses.length)) return [3 /*break*/, 9];
                        addr = Ed25519.publicKeyToAddress(addresses[i].publicKey);
                        return [4 /*yield*/, client.addressOutputs(addr)];
                    case 3:
                        addressOutputIds = _b.sent();
                        if (!(addressOutputIds.outputIds.length === 0)) return [3 /*break*/, 4];
                        finished = true;
                        return [3 /*break*/, 8];
                    case 4:
                        _i = 0, _a = addressOutputIds.outputIds;
                        _b.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        addressOutputId = _a[_i];
                        return [4 /*yield*/, client.output(addressOutputId)];
                    case 6:
                        addressOutput = _b.sent();
                        if (addressOutput.output.amount === 0) {
                            finished = true;
                        }
                        else if (!addressOutput.isSpent) {
                            balance += addressOutput.output.amount;
                        }
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8:
                        i++;
                        return [3 /*break*/, 2];
                    case 9:
                        localStartIndex += DEFAULT_CHUNK_SIZE;
                        _b.label = 10;
                    case 10:
                        if (!finished) return [3 /*break*/, 1];
                        _b.label = 11;
                    case 11: return [2 /*return*/, balance];
                }
            });
        });
    }

    /**
     * Get the first unspent address.
     * @param client The client to send the transfer with.
     * @param seed The seed to use for address generation.
     * @param basePath The base path to start looking for addresses.
     * @param startIndex Optional start index for the wallet count address, defaults to 0.
     * @returns The first unspent address.
     */
    function getUnspentAddress(client, seed, basePath, startIndex) {
        return __awaiter(this, void 0, Promise, function () {
            var localStartIndex, finished, unspentAddress, unspentAddressIndex, unspentAmount, addresses, i, addr, addressOutputIds, _i, _a, addressOutputId, addressOutput;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
                        finished = false;
                        unspentAmount = 0;
                        _b.label = 1;
                    case 1:
                        addresses = getAddressesKeyPairs(seed, basePath, localStartIndex, DEFAULT_CHUNK_SIZE);
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < addresses.length)) return [3 /*break*/, 10];
                        addr = Ed25519.publicKeyToAddress(addresses[i].publicKey);
                        return [4 /*yield*/, client.addressOutputs(addr)];
                    case 3:
                        addressOutputIds = _b.sent();
                        if (!(addressOutputIds.outputIds.length === 0)) return [3 /*break*/, 4];
                        finished = true;
                        return [3 /*break*/, 8];
                    case 4:
                        _i = 0, _a = addressOutputIds.outputIds;
                        _b.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        addressOutputId = _a[_i];
                        return [4 /*yield*/, client.output(addressOutputId)];
                    case 6:
                        addressOutput = _b.sent();
                        if (addressOutput.output.amount === 0) {
                            finished = true;
                        }
                        else if (!addressOutput.isSpent) {
                            unspentAddress = addr;
                            unspentAddressIndex = localStartIndex + i;
                            unspentAmount += addressOutput.output.amount;
                        }
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8:
                        if (unspentAddress) {
                            finished = true;
                        }
                        _b.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 2];
                    case 10:
                        localStartIndex += DEFAULT_CHUNK_SIZE;
                        _b.label = 11;
                    case 11:
                        if (!finished) return [3 /*break*/, 1];
                        _b.label = 12;
                    case 12: return [2 /*return*/, unspentAddress && unspentAddressIndex !== undefined ? {
                            address: unspentAddress,
                            index: unspentAddressIndex,
                            amount: unspentAmount
                        } : undefined];
                }
            });
        });
    }

    /**
     * Retrieve a data message.
     * @param client The client to send the transfer with.
     * @param messageId The message id of the data to get.
     * @returns The message index and data.
     */
    function retrieveData(client, messageId) {
        return __awaiter(this, void 0, Promise, function () {
            var message, indexationPayload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.message(messageId)];
                    case 1:
                        message = _a.sent();
                        if (message === null || message === void 0 ? void 0 : message.payload) {
                            indexationPayload = void 0;
                            if (message.payload.type === 0) {
                                indexationPayload = message.payload.essence.payload;
                            }
                            else if (message.payload.type === 2) {
                                indexationPayload = message.payload;
                            }
                            if (indexationPayload) {
                                return [2 /*return*/, {
                                        index: indexationPayload.index,
                                        data: Buffer.from(indexationPayload.data, "hex")
                                    }];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    }

    /**
     * Keep track of the write index within a buffer.
     */
    var WriteBuffer = /** @class */ (function () {
        /**
         * Create a new instance of ReadBuffer.
         */
        function WriteBuffer() {
            this._buffer = Buffer.alloc(WriteBuffer.CHUNK_SIZE);
            this._writeIndex = 0;
        }
        /**
         * Get the length of the buffer.
         * @returns The buffer length.
         */
        WriteBuffer.prototype.length = function () {
            return this._buffer.length;
        };
        /**
         * How much unused data is there.
         * @returns The amount of unused data.
         */
        WriteBuffer.prototype.unused = function () {
            return this._buffer.length - this._writeIndex;
        };
        /**
         * Get the final buffer.
         * @returns The final buffer.
         */
        WriteBuffer.prototype.finalBuffer = function () {
            return this._buffer.slice(0, this._writeIndex);
        };
        /**
         * Get the current write index.
         * @returns The current write index.
         */
        WriteBuffer.prototype.getWriteIndex = function () {
            return this._writeIndex;
        };
        /**
         * Set the current write index.
         * @param writeIndex The current write index.
         */
        WriteBuffer.prototype.setWriteIndex = function (writeIndex) {
            this._writeIndex = writeIndex;
        };
        /**
         * Write fixed length buffer.
         * @param name The name of the data we are trying to write.
         * @param length The length of the data to write.
         * @param val The data to write.
         */
        WriteBuffer.prototype.writeFixedBufferHex = function (name, length, val) {
            if (!isHex(val)) {
                throw new Error("The " + val + " should be in hex format");
            }
            // Hex should be twice the length as each byte is 2 ascii characters
            if (length * 2 !== val.length) {
                throw new Error(name + " length " + val.length + " does not match expected length " + length * 2);
            }
            this.expand(length);
            this._buffer.write(val, this._writeIndex, "hex");
            this._writeIndex += length;
        };
        /**
         * Write a byte to the buffer.
         * @param name The name of the data we are trying to write.
         * @param val The data to write.
         */
        WriteBuffer.prototype.writeByte = function (name, val) {
            this.expand(1);
            this._buffer.writeUInt8(val, this._writeIndex);
            this._writeIndex += 1;
        };
        /**
         * Write a UInt16 to the buffer.
         * @param name The name of the data we are trying to write.
         * @param val The data to write.
         */
        WriteBuffer.prototype.writeUInt16 = function (name, val) {
            this.expand(2);
            this._buffer.writeUInt16LE(val, this._writeIndex);
            this._writeIndex += 2;
        };
        /**
         * Write a UInt32 to the buffer.
         * @param name The name of the data we are trying to write.
         * @param val The data to write.
         */
        WriteBuffer.prototype.writeUInt32 = function (name, val) {
            this.expand(4);
            this._buffer.writeUInt32LE(val, this._writeIndex);
            this._writeIndex += 4;
        };
        /**
         * Write a UInt64 to the buffer.
         * @param name The name of the data we are trying to write.
         * @param val The data to write.
         */
        WriteBuffer.prototype.writeUInt64 = function (name, val) {
            this.expand(8);
            this._buffer.writeBigUInt64LE(val, this._writeIndex);
            this._writeIndex += 8;
        };
        /**
         * Write a string to the buffer.
         * @param name The name of the data we are trying to write.
         * @param val The data to write.
         * @returns The string.
         */
        WriteBuffer.prototype.writeString = function (name, val) {
            this.writeUInt16(name, val.length);
            this.expand(val.length);
            this._buffer.write(val, this._writeIndex);
            this._writeIndex += val.length;
            return val;
        };
        /**
         * Expand the buffer if there is not enough spave.
         * @param additional The amount of space needed.
         */
        WriteBuffer.prototype.expand = function (additional) {
            if (this._writeIndex + additional > this._buffer.byteLength) {
                this._buffer = Buffer.concat([this._buffer, Buffer.alloc(WriteBuffer.CHUNK_SIZE)]);
            }
        };
        /**
         * Chunk size to expand the buffer.
         */
        WriteBuffer.CHUNK_SIZE = 4096;
        return WriteBuffer;
    }());

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
        return __awaiter(this, void 0, Promise, function () {
            var requiredBalance, localStartIndex, consumedBalance, inputsAndSignatureKeyPairs, finished, remainderKeyPair, addresses, _i, addresses_1, address, addressOutputIds, _a, _b, addressOutputId, addressOutput, input, writeBuffer, remainderAddress, outputsWithSerialization, _c, outputs_1, output, sigLockedOutput, writeBuffer, sortedInputs, sortedOutputs, transactionEssence, binaryEssenceBuffer, essenceFinalBuffer, unlockBlocks, addressToUnlockBlock, _d, sortedInputs_1, input, transactionPayload, tips, message, messageId;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!outputs || outputs.length === 0) {
                            throw new Error("You must specify some outputs");
                        }
                        requiredBalance = outputs.reduce(function (total, output) { return total + output.amount; }, 0);
                        localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
                        consumedBalance = 0;
                        inputsAndSignatureKeyPairs = [];
                        finished = false;
                        _e.label = 1;
                    case 1:
                        addresses = getAddressesKeyPairs(seed, basePath, localStartIndex, DEFAULT_CHUNK_SIZE);
                        _i = 0, addresses_1 = addresses;
                        _e.label = 2;
                    case 2:
                        if (!(_i < addresses_1.length)) return [3 /*break*/, 9];
                        address = addresses_1[_i];
                        return [4 /*yield*/, client.addressOutputs(Ed25519.publicKeyToAddress(address.publicKey))];
                    case 3:
                        addressOutputIds = _e.sent();
                        if (!(addressOutputIds.outputIds.length === 0)) return [3 /*break*/, 4];
                        finished = true;
                        remainderKeyPair = address;
                        return [3 /*break*/, 8];
                    case 4:
                        _a = 0, _b = addressOutputIds.outputIds;
                        _e.label = 5;
                    case 5:
                        if (!(_a < _b.length)) return [3 /*break*/, 8];
                        addressOutputId = _b[_a];
                        return [4 /*yield*/, client.output(addressOutputId)];
                    case 6:
                        addressOutput = _e.sent();
                        if (addressOutput.isSpent) {
                            if (addressOutput.output.amount !== 0) {
                                throw new Error("Spent address");
                            }
                        }
                        else if (addressOutput.output.amount !== 0) {
                            if (consumedBalance < requiredBalance) {
                                consumedBalance += addressOutput.output.amount;
                                input = {
                                    type: 0,
                                    transactionId: addressOutput.transactionId,
                                    transactionOutputIndex: addressOutput.outputIndex
                                };
                                writeBuffer = new WriteBuffer();
                                serializeInput(writeBuffer, input);
                                inputsAndSignatureKeyPairs.push({
                                    input: input,
                                    addressKeyPair: address,
                                    serialized: writeBuffer.finalBuffer().toString("hex")
                                });
                            }
                        }
                        _e.label = 7;
                    case 7:
                        _a++;
                        return [3 /*break*/, 5];
                    case 8:
                        _i++;
                        return [3 /*break*/, 2];
                    case 9:
                        localStartIndex += DEFAULT_CHUNK_SIZE;
                        _e.label = 10;
                    case 10:
                        if (!finished) return [3 /*break*/, 1];
                        _e.label = 11;
                    case 11:
                        if (consumedBalance < requiredBalance) {
                            throw new Error("There are not enough funds in the inputs for the required balance");
                        }
                        if (requiredBalance < consumedBalance && remainderKeyPair) {
                            remainderAddress = Ed25519.publicKeyToAddress(remainderKeyPair.publicKey);
                            outputs.push({
                                amount: consumedBalance - requiredBalance,
                                address: remainderAddress
                            });
                        }
                        outputsWithSerialization = [];
                        for (_c = 0, outputs_1 = outputs; _c < outputs_1.length; _c++) {
                            output = outputs_1[_c];
                            sigLockedOutput = {
                                type: 0,
                                address: {
                                    type: 1,
                                    address: output.address
                                },
                                amount: output.amount
                            };
                            writeBuffer = new WriteBuffer();
                            serializeOutput(writeBuffer, sigLockedOutput);
                            outputsWithSerialization.push({
                                output: sigLockedOutput,
                                serialized: writeBuffer.finalBuffer().toString("hex")
                            });
                        }
                        sortedInputs = inputsAndSignatureKeyPairs.sort(function (a, b) { return a.serialized.localeCompare(b.serialized); });
                        sortedOutputs = outputsWithSerialization.sort(function (a, b) { return a.serialized.localeCompare(b.serialized); });
                        transactionEssence = {
                            type: 0,
                            inputs: sortedInputs.map(function (i) { return i.input; }),
                            outputs: sortedOutputs.map(function (o) { return o.output; }),
                            payload: index && data
                                ? {
                                    type: 2,
                                    index: index,
                                    data: data.toString("hex")
                                }
                                : undefined
                        };
                        binaryEssenceBuffer = new WriteBuffer();
                        serializeTransactionEssence(binaryEssenceBuffer, transactionEssence);
                        essenceFinalBuffer = binaryEssenceBuffer.finalBuffer();
                        unlockBlocks = [];
                        addressToUnlockBlock = {};
                        for (_d = 0, sortedInputs_1 = sortedInputs; _d < sortedInputs_1.length; _d++) {
                            input = sortedInputs_1[_d];
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
                                        signature: Ed25519.signData(input.addressKeyPair.privateKey, essenceFinalBuffer)
                                    }
                                });
                                addressToUnlockBlock[input.addressKeyPair.publicKey] = {
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
                    case 12:
                        tips = _e.sent();
                        message = {
                            version: 1,
                            parent1MessageId: tips.tip1MessageId,
                            parent2MessageId: tips.tip2MessageId,
                            payload: transactionPayload,
                            nonce: 0
                        };
                        return [4 /*yield*/, client.messageSubmit(message)];
                    case 13:
                        messageId = _e.sent();
                        return [2 /*return*/, {
                                messageId: messageId,
                                message: message,
                                remainderAddress: remainderAddress
                            }];
                }
            });
        });
    }

    /**
     * Send a transfer from the balance on the seed.
     * @param client The client to send the transfer with.
     * @param seed The seed to use for address generation.
     * @param basePath The base path to start looking for addresses.
     * @param address The address to send the funds to.
     * @param amount The amount to send.
     * @param startIndex The start index for the wallet count address, defaults to 0.
     * @returns The id of the message created and the contructed message.
     */
    function send(client, seed, basePath, address, amount, startIndex) {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sendAdvanced(client, seed, basePath, [{ address: address, amount: amount }], startIndex)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                messageId: response.messageId,
                                message: response.message
                            }];
                }
            });
        });
    }

    /**
     * Send a data message.
     * @param client The client to send the transfer with.
     * @param index The index name.
     * @param data The index data.
     * @returns The id of the message created and the message.
     */
    function sendData(client, index, data) {
        return __awaiter(this, void 0, Promise, function () {
            var indexationPayload, tips, message, messageId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        indexationPayload = {
                            type: 2,
                            index: index,
                            data: data.toString("hex")
                        };
                        return [4 /*yield*/, client.tips()];
                    case 1:
                        tips = _a.sent();
                        message = {
                            version: 1,
                            parent1MessageId: tips.tip1MessageId,
                            parent2MessageId: tips.tip2MessageId,
                            payload: indexationPayload,
                            nonce: 0
                        };
                        return [4 /*yield*/, client.messageSubmit(message)];
                    case 2:
                        messageId = _a.sent();
                        return [2 /*return*/, {
                                message: message,
                                messageId: messageId
                            }];
                }
            });
        });
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
        if (message.nonce !== undefined) {
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
         * @param moveIndex Move the index pointer on.
         * @returns The buffer.
         */
        ReadBuffer.prototype.readFixedBufferHex = function (name, length, moveIndex) {
            if (moveIndex === void 0) { moveIndex = true; }
            if (!this.hasRemaining(length)) {
                throw new Error(name + " length " + length + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.slice(this._readIndex, this._readIndex + length);
            if (moveIndex) {
                this._readIndex += length;
            }
            return val.toString("hex");
        };
        /**
         * Read a byte from the buffer.
         * @param name The name of the data we are trying to read.
         * @param moveIndex Move the index pointer on.
         * @returns The value.
         */
        ReadBuffer.prototype.readByte = function (name, moveIndex) {
            if (moveIndex === void 0) { moveIndex = true; }
            if (!this.hasRemaining(1)) {
                throw new Error(name + " length " + 1 + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.readUInt8(this._readIndex);
            if (moveIndex) {
                this._readIndex += 1;
            }
            return val;
        };
        /**
         * Read a UInt16 from the buffer.
         * @param name The name of the data we are trying to read.
         * @param moveIndex Move the index pointer on.
         * @returns The value.
         */
        ReadBuffer.prototype.readUInt16 = function (name, moveIndex) {
            if (moveIndex === void 0) { moveIndex = true; }
            if (!this.hasRemaining(2)) {
                throw new Error(name + " length " + 2 + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.readUInt16LE(this._readIndex);
            if (moveIndex) {
                this._readIndex += 2;
            }
            return val;
        };
        /**
         * Read a UInt32 from the buffer.
         * @param name The name of the data we are trying to read.
         * @param moveIndex Move the index pointer on.
         * @returns The value.
         */
        ReadBuffer.prototype.readUInt32 = function (name, moveIndex) {
            if (moveIndex === void 0) { moveIndex = true; }
            if (!this.hasRemaining(4)) {
                throw new Error(name + " length " + 4 + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.readUInt32LE(this._readIndex);
            if (moveIndex) {
                this._readIndex += 4;
            }
            return val;
        };
        /**
         * Read a UInt64 from the buffer.
         * @param name The name of the data we are trying to read.
         * @param moveIndex Move the index pointer on.
         * @returns The value.
         */
        ReadBuffer.prototype.readUInt64 = function (name, moveIndex) {
            if (moveIndex === void 0) { moveIndex = true; }
            if (!this.hasRemaining(8)) {
                throw new Error(name + " length " + 8 + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.readBigUInt64LE(this._readIndex);
            if (moveIndex) {
                this._readIndex += 8;
            }
            return val;
        };
        /**
         * Read a string from the buffer.
         * @param name The name of the data we are trying to read.
         * @param moveIndex Move the index pointer on.
         * @returns The string.
         */
        ReadBuffer.prototype.readString = function (name, moveIndex) {
            if (moveIndex === void 0) { moveIndex = true; }
            var stringLength = this.readUInt16(name);
            if (!this.hasRemaining(stringLength)) {
                throw new Error(name + " length " + stringLength + " exceeds the remaining data " + this.unused());
            }
            var val = this._buffer.slice(this._readIndex, this._readIndex + stringLength);
            if (moveIndex) {
                this._readIndex += stringLength;
            }
            return val.toString();
        };
        return ReadBuffer;
    }());

    exports.ARRAY_LENGTH = ARRAY_LENGTH;
    exports.BYTE_SIZE = BYTE_SIZE;
    exports.Bip32Path = Bip32Path;
    exports.Blake2b = Blake2b;
    exports.ClientError = ClientError;
    exports.DEFAULT_CHUNK_SIZE = DEFAULT_CHUNK_SIZE;
    exports.Ed25519 = Ed25519;
    exports.Ed25519Seed = Ed25519Seed;
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
    exports.SMALL_TYPE_LENGTH = SMALL_TYPE_LENGTH;
    exports.STRING_LENGTH = STRING_LENGTH;
    exports.SingleNodeClient = SingleNodeClient;
    exports.Slip0010 = Slip0010;
    exports.TRANSACTION_ID_LENGTH = TRANSACTION_ID_LENGTH;
    exports.TYPE_LENGTH = TYPE_LENGTH;
    exports.UINT16_SIZE = UINT16_SIZE;
    exports.UINT32_SIZE = UINT32_SIZE;
    exports.UINT64_SIZE = UINT64_SIZE;
    exports.WriteBuffer = WriteBuffer;
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
    exports.getAddressBalances = getAddressBalances;
    exports.getAddresses = getAddresses;
    exports.getAddressesKeyPairs = getAddressesKeyPairs;
    exports.getAllUnspentAddresses = getAllUnspentAddresses;
    exports.getBalance = getBalance;
    exports.getUnspentAddress = getUnspentAddress;
    exports.isHex = isHex;
    exports.logAddress = logAddress;
    exports.logInput = logInput;
    exports.logMessage = logMessage;
    exports.logOutput = logOutput;
    exports.logPayload = logPayload;
    exports.logSignature = logSignature;
    exports.logUnlockBlock = logUnlockBlock;
    exports.retrieveData = retrieveData;
    exports.send = send;
    exports.sendAdvanced = sendAdvanced;
    exports.sendData = sendData;
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
