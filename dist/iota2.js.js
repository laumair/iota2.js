(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cross-fetch')) :
    typeof define === 'function' && define.amd ? define(['exports', 'cross-fetch'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Iota2 = {}, global['cross-fetch']));
}(this, (function (exports, fetch) { 'use strict';

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
         * Get the message metadata by id.
         * @param messageId The message to get the metadata for.
         * @returns The message metadata.
         */
        Client.prototype.messageMetadata = function (messageId) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/messages/" + messageId)];
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
                    return [2 /*return*/, this.fetchJson("get", "/api/v1/messages/" + messageId + "/data")];
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
                    return [2 /*return*/, this.fetchBinary("/api/v1/messages/" + messageId + "/raw")];
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
         * @param route The route of the request.
         * @returns The response.
         * @private
         */
        Client.prototype.fetchBinary = function (route) {
            var _a, _b, _c;
            return __awaiter(this, void 0, Promise, function () {
                var response, _d, _e, responseData;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, fetch__default['default']("" + this._endpoint + route, {
                                method: "get",
                                headers: {
                                    "Content-Type": "application/octet-stream"
                                }
                            })];
                        case 1:
                            response = _f.sent();
                            if (!response.ok) return [3 /*break*/, 3];
                            _e = (_d = Buffer).from;
                            return [4 /*yield*/, response.arrayBuffer()];
                        case 2: return [2 /*return*/, _e.apply(_d, [_f.sent()])];
                        case 3: return [4 /*yield*/, response.json()];
                        case 4:
                            responseData = _f.sent();
                            throw new ClientError((_b = (_a = responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData.error) === null || _c === void 0 ? void 0 : _c.code);
                    }
                });
            });
        };
        return Client;
    }());

    /**
     * Log a message to the console.
     * @param prefix The prefix for the output.
     * @param message The message to log.
     */
    function logMessage(prefix, message) {
        console.log(prefix + "\tVersion:", message.version);
        console.log(prefix + "\tParent 1:", message.parent1);
        console.log(prefix + "\tParent 2:", message.parent2);
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
                            if (input.type === 0) {
                                console.log(prefix + "\tUTXO Input");
                                console.log(prefix + "\t\t\tTransaction Id:", input.transactionId);
                                console.log(prefix + "\t\t\tTransaction Output Index:", input.transactionOutputIndex);
                            }
                        }
                    }
                    if (payload.essence.outputs) {
                        console.log(prefix + "\tOutputs:", payload.essence.outputs.length);
                        for (var _b = 0, _c = payload.essence.outputs; _b < _c.length; _b++) {
                            var output = _c[_b];
                            if (output.type === 0) {
                                console.log(prefix + "\tSignature Locked Single Output");
                                logAddress(prefix + "\t\t\t", output.address);
                                console.log(prefix + "\t\t\tAmount:", output.amount);
                            }
                        }
                    }
                    logPayload(prefix + "\t", payload.essence.payload);
                }
                if (payload.unlockBlocks) {
                    console.log(prefix + "\tUnlock Blocks:", payload.unlockBlocks.length);
                    for (var _d = 0, _e = payload.unlockBlocks; _d < _e.length; _d++) {
                        var unlockBlock = _e[_d];
                        if (unlockBlock.type === 0) {
                            console.log(prefix + "\tSignature Unlock Block");
                            logSignature(prefix + "\t\t\t", unlockBlock.signature);
                        }
                        else if (unlockBlock.type === 1) {
                            console.log(prefix + "\tReference Unlock Block");
                            console.log(prefix + "\t\tReference:", unlockBlock.reference);
                        }
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
                console.log(prefix + "\tAddress:", signature.address);
            }
        }
    }

    exports.Client = Client;
    exports.ClientError = ClientError;
    exports.logAddress = logAddress;
    exports.logMessage = logMessage;
    exports.logPayload = logPayload;
    exports.logSignature = logSignature;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
