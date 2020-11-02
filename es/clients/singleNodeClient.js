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
exports.SingleNodeClient = void 0;
var clientError_1 = require("../api/clientError");
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
        return __awaiter(this, void 0, void 0, function () {
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
                        throw new clientError_1.ClientError("Unexpected response code", "/health", status);
                }
            });
        });
    };
    /**
     * Get the info about the node.
     * @returns The node information.
     */
    SingleNodeClient.prototype.info = function () {
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
     * @param indexationKey The index value.
     * @returns The messageId.
     */
    SingleNodeClient.prototype.messagesFind = function (indexationKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "/api/v1/messages?index=" + encodeURIComponent(indexationKey))];
            });
        });
    };
    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    SingleNodeClient.prototype.messageChildren = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "/api/v1/milestones/" + index)];
            });
        });
    };
    /**
     * Get the list of peers.
     * @returns The list of peers.
     */
    SingleNodeClient.prototype.peers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "/api/v1/peers")];
            });
        });
    };
    /**
     * Add a new peer.
     * @param multiAddress The address of the peer to add.
     * @param alias An optional alias for the peer.
     * @returns The details for the created peer.
     */
    SingleNodeClient.prototype.peerAdd = function (multiAddress, alias) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("post", "/api/v1/peers", {
                        multiAddress: multiAddress,
                        alias: alias
                    })];
            });
        });
    };
    /**
     * Delete a peer.
     * @param peerId The peer to delete.
     * @returns Nothing.
     */
    SingleNodeClient.prototype.peerDelete = function (peerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
                return [2 /*return*/, this.fetchJson("delete", "/api/v1/peers/" + peerId)];
            });
        });
    };
    /**
     * Get a peer.
     * @param peerId The peer to delete.
     * @returns The details for the created peer.
     */
    SingleNodeClient.prototype.peer = function (peerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "/api/v1/peers/" + peerId)];
            });
        });
    };
    /**
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     * @internal
     */
    SingleNodeClient.prototype.fetchStatus = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + route, {
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
     * @internal
     */
    SingleNodeClient.prototype.fetchJson = function (method, route, requestData) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var response, responseData;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + route, {
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
                        throw new clientError_1.ClientError((_b = (_a = responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData.error) === null || _c === void 0 ? void 0 : _c.code);
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
     * @internal
     */
    SingleNodeClient.prototype.fetchBinary = function (method, route, requestData) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var response, responseData, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + route, {
                            method: method,
                            headers: {
                                "Content-Type": "application/octet-stream"
                            },
                            body: requestData
                        })];
                    case 1:
                        response = _e.sent();
                        if (!response.ok) return [3 /*break*/, 5];
                        if (!(method === "get")) return [3 /*break*/, 3];
                        _d = Uint8Array.bind;
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 2: return [2 /*return*/, new (_d.apply(Uint8Array, [void 0, _e.sent()]))()];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        responseData = _e.sent();
                        if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
                            return [2 /*return*/, responseData === null || responseData === void 0 ? void 0 : responseData.data];
                        }
                        _e.label = 5;
                    case 5:
                        if (!!responseData) return [3 /*break*/, 7];
                        return [4 /*yield*/, response.json()];
                    case 6:
                        responseData = _e.sent();
                        _e.label = 7;
                    case 7: throw new clientError_1.ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
                }
            });
        });
    };
    return SingleNodeClient;
}());
exports.SingleNodeClient = SingleNodeClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQWlEO0FBaUJqRDs7R0FFRztBQUNIO0lBT0k7OztPQUdHO0lBQ0gsMEJBQVksUUFBZ0I7UUFDeEIsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxRCxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDaEU7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7O09BR0c7SUFDVSxpQ0FBTSxHQUFuQjs7Ozs7NEJBQ21CLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUE7O3dCQUExQyxNQUFNLEdBQUcsU0FBaUM7d0JBRWhELElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTs0QkFDaEIsc0JBQU8sSUFBSSxFQUFDO3lCQUNmOzZCQUFNLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTs0QkFDdkIsc0JBQU8sS0FBSyxFQUFDO3lCQUNoQjt3QkFFRCxNQUFNLElBQUkseUJBQVcsQ0FBQywwQkFBMEIsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7S0FDeEU7SUFFRDs7O09BR0c7SUFDVSwrQkFBSSxHQUFqQjs7O2dCQUNJLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQWUsS0FBSyxFQUFFLGNBQWMsQ0FBQyxFQUFDOzs7S0FDOUQ7SUFFRDs7O09BR0c7SUFDVSwrQkFBSSxHQUFqQjs7O2dCQUNJLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQWUsS0FBSyxFQUFFLGNBQWMsQ0FBQyxFQUFDOzs7S0FDOUQ7SUFFRDs7OztPQUlHO0lBQ1Usa0NBQU8sR0FBcEIsVUFBcUIsU0FBaUI7OztnQkFDbEMsc0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBa0IsS0FBSyxFQUFFLHNCQUFvQixTQUFXLENBQUMsRUFBQzs7O0tBQ2xGO0lBRUQ7Ozs7T0FJRztJQUNVLDBDQUFlLEdBQTVCLFVBQTZCLFNBQWlCOzs7Z0JBQzFDLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQTBCLEtBQUssRUFBRSxzQkFBb0IsU0FBUyxjQUFXLENBQUMsRUFBQzs7O0tBQ25HO0lBRUQ7Ozs7T0FJRztJQUNVLHFDQUFVLEdBQXZCLFVBQXdCLFNBQWlCOzs7Z0JBQ3JDLHNCQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLHNCQUFvQixTQUFTLFNBQU0sQ0FBQyxFQUFDOzs7S0FDdkU7SUFFRDs7OztPQUlHO0lBQ1Usd0NBQWEsR0FBMUIsVUFBMkIsT0FBaUI7Ozs7OzRCQUN2QixxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUF1QixNQUFNLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLEVBQUE7O3dCQUExRixRQUFRLEdBQUcsU0FBK0U7d0JBRWhHLHNCQUFPLFFBQVEsQ0FBQyxTQUFTLEVBQUM7Ozs7S0FDN0I7SUFFRDs7OztPQUlHO0lBQ1UsMkNBQWdCLEdBQTdCLFVBQThCLE9BQW1COzs7Ozs0QkFDNUIscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBYSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLEVBQUE7O3dCQUFsRixRQUFRLEdBQUcsU0FBdUU7d0JBRXhGLHNCQUFRLFFBQXVCLENBQUMsU0FBUyxFQUFDOzs7O0tBQzdDO0lBRUQ7Ozs7T0FJRztJQUNVLHVDQUFZLEdBQXpCLFVBQTBCLGFBQXFCOzs7Z0JBQzNDLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQ2pCLEtBQUssRUFDTCw0QkFBMEIsa0JBQWtCLENBQUMsYUFBYSxDQUFHLENBQ2hFLEVBQUM7OztLQUNMO0lBRUQ7Ozs7T0FJRztJQUNVLDBDQUFlLEdBQTVCLFVBQTZCLFNBQWlCOzs7Z0JBQzFDLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQ2pCLEtBQUssRUFDTCxzQkFBb0IsU0FBUyxjQUFXLENBQzNDLEVBQUM7OztLQUNMO0lBRUQ7Ozs7T0FJRztJQUNVLGlDQUFNLEdBQW5CLFVBQW9CLFFBQWdCOzs7Z0JBQ2hDLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQ2pCLEtBQUssRUFDTCxxQkFBbUIsUUFBVSxDQUNoQyxFQUFDOzs7S0FDTDtJQUVEOzs7O09BSUc7SUFDVSxrQ0FBTyxHQUFwQixVQUFxQixPQUFlOzs7Z0JBQ2hDLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQ2pCLEtBQUssRUFDTCx1QkFBcUIsT0FBUyxDQUNqQyxFQUFDOzs7S0FDTDtJQUVEOzs7O09BSUc7SUFDVSx5Q0FBYyxHQUEzQixVQUE0QixPQUFlOzs7Z0JBQ3ZDLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQ2pCLEtBQUssRUFDTCx1QkFBcUIsT0FBTyxhQUFVLENBQ3pDLEVBQUM7OztLQUNMO0lBRUQ7Ozs7T0FJRztJQUNVLG9DQUFTLEdBQXRCLFVBQXVCLEtBQWE7OztnQkFDaEMsc0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FDakIsS0FBSyxFQUNMLHdCQUFzQixLQUFPLENBQ2hDLEVBQUM7OztLQUNMO0lBRUQ7OztPQUdHO0lBQ1UsZ0NBQUssR0FBbEI7OztnQkFDSSxzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsZUFBZSxDQUNsQixFQUFDOzs7S0FDTDtJQUVEOzs7OztPQUtHO0lBQ1Usa0NBQU8sR0FBcEIsVUFBcUIsWUFBb0IsRUFBRSxLQUFjOzs7Z0JBQ3JELHNCQUFPLElBQUksQ0FBQyxTQUFTLENBSWpCLE1BQU0sRUFDTixlQUFlLEVBQ2Y7d0JBQ0ksWUFBWSxjQUFBO3dCQUNaLEtBQUssT0FBQTtxQkFDUixDQUNKLEVBQUM7OztLQUNMO0lBRUQ7Ozs7T0FJRztJQUNVLHFDQUFVLEdBQXZCLFVBQXdCLE1BQWM7OztnQkFDbEMsbUVBQW1FO2dCQUNuRSxzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixRQUFRLEVBQ1IsbUJBQWlCLE1BQVEsQ0FDNUIsRUFBQzs7O0tBQ0w7SUFFRDs7OztPQUlHO0lBQ1UsK0JBQUksR0FBakIsVUFBa0IsTUFBYzs7O2dCQUM1QixzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsbUJBQWlCLE1BQVEsQ0FDNUIsRUFBQzs7O0tBQ0w7SUFFRDs7Ozs7T0FLRztJQUNXLHNDQUFXLEdBQXpCLFVBQTBCLEtBQWE7Ozs7OzRCQUNsQixxQkFBTSxLQUFLLENBQ3hCLEtBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFPLEVBQzNCOzRCQUNJLE1BQU0sRUFBRSxLQUFLO3lCQUNoQixDQUNKLEVBQUE7O3dCQUxLLFFBQVEsR0FBRyxTQUtoQjt3QkFFRCxzQkFBTyxRQUFRLENBQUMsTUFBTSxFQUFDOzs7O0tBQzFCO0lBRUQ7Ozs7Ozs7T0FPRztJQUNXLG9DQUFTLEdBQXZCLFVBQThCLE1BQWlDLEVBQUUsS0FBYSxFQUFFLFdBQWU7Ozs7Ozs0QkFDMUUscUJBQU0sS0FBSyxDQUN4QixLQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBTyxFQUMzQjs0QkFDSSxNQUFNLFFBQUE7NEJBQ04sT0FBTyxFQUFFO2dDQUNMLGNBQWMsRUFBRSxrQkFBa0I7NkJBQ3JDOzRCQUNELElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7eUJBQzlELENBQ0osRUFBQTs7d0JBVEssUUFBUSxHQUFHLFNBU2hCO3dCQUVrQyxxQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUFsRCxZQUFZLEdBQWlCLFNBQXFCO3dCQUV4RCxJQUFJLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFOzRCQUNwQyxzQkFBTyxZQUFZLENBQUMsSUFBSSxFQUFDO3lCQUM1Qjt3QkFFRCxNQUFNLElBQUkseUJBQVcsYUFDakIsWUFBWSxDQUFDLEtBQUssMENBQUUsT0FBTyxtQ0FBSSxRQUFRLENBQUMsVUFBVSxFQUNsRCxLQUFLLEVBQ0wsUUFBUSxDQUFDLE1BQU0sUUFDZixZQUFZLENBQUMsS0FBSywwQ0FBRSxJQUFJLENBQzNCLENBQUM7Ozs7S0FDTDtJQUVEOzs7Ozs7O09BT0c7SUFDVyxzQ0FBVyxHQUF6QixVQUNJLE1BQXNCLEVBQ3RCLEtBQWEsRUFDYixXQUF3Qjs7Ozs7OzRCQUNQLHFCQUFNLEtBQUssQ0FDeEIsS0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQU8sRUFDM0I7NEJBQ0ksTUFBTSxRQUFBOzRCQUNOLE9BQU8sRUFBRTtnQ0FDTCxjQUFjLEVBQUUsMEJBQTBCOzZCQUM3Qzs0QkFDRCxJQUFJLEVBQUUsV0FBVzt5QkFDcEIsQ0FDSixFQUFBOzt3QkFUSyxRQUFRLEdBQUcsU0FTaEI7NkJBR0csUUFBUSxDQUFDLEVBQUUsRUFBWCx3QkFBVzs2QkFDUCxDQUFBLE1BQU0sS0FBSyxLQUFLLENBQUEsRUFBaEIsd0JBQWdCOzZCQUNMLFVBQVU7d0JBQUMscUJBQU0sUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFBOzRCQUFsRCxzQkFBTyxjQUFJLFVBQVUsV0FBQyxTQUE0QixLQUFDLEVBQUM7NEJBRXpDLHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQXBDLFlBQVksR0FBRyxTQUFxQixDQUFDO3dCQUVyQyxJQUFJLEVBQUMsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssQ0FBQSxFQUFFOzRCQUN0QixzQkFBTyxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsSUFBUyxFQUFDO3lCQUNsQzs7OzZCQUdELENBQUMsWUFBWSxFQUFiLHdCQUFhO3dCQUNFLHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQXBDLFlBQVksR0FBRyxTQUFxQixDQUFDOzs0QkFHekMsTUFBTSxJQUFJLHlCQUFXLGFBQ2pCLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxLQUFLLDBDQUFFLE9BQU8sbUNBQUksUUFBUSxDQUFDLFVBQVUsRUFDbkQsS0FBSyxFQUNMLFFBQVEsQ0FBQyxNQUFNLFFBQ2YsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssMENBQUUsSUFBSSxDQUM1QixDQUFDOzs7O0tBQ0w7SUFDTCx1QkFBQztBQUFELENBQUMsQUFwVUQsSUFvVUM7QUFwVVksNENBQWdCIn0=