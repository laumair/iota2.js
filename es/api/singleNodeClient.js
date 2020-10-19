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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleNodeClient = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const clientError_1 = require("./clientError");
/**
 * Client for API communication.
 */
class SingleNodeClient {
    /**
     * Create a new instance of client.
     * @param endpoint The endpoint.
     */
    constructor(endpoint) {
        if (!/^https?:\/\/\w+(\.\w+)*(:\d+)?(\/.*)?$/.test(endpoint)) {
            throw new Error("The endpoint is not in the correct format");
        }
        this._endpoint = endpoint.replace(/\/+$/, "");
    }
    /**
     * Get the health of the node.
     * @returns True if the node is healthy.
     */
    health() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.fetchStatus("/health");
            if (status === 200) {
                return true;
            }
            else if (status === 503) {
                return false;
            }
            throw new clientError_1.ClientError("Unexpected response code", "/health", status);
        });
    }
    /**
     * Get the info about the node.
     * @returns The node information.
     */
    info() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", "/api/v1/info");
        });
    }
    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    tips() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", "/api/v1/tips");
        });
    }
    /**
     * Get the message data by id.
     * @param messageId The message to get the data for.
     * @returns The message data.
     */
    message(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `/api/v1/messages/${messageId}`);
        });
    }
    /**
     * Get the message metadata by id.
     * @param messageId The message to get the metadata for.
     * @returns The message metadata.
     */
    messageMetadata(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `/api/v1/messages/${messageId}/metadata`);
        });
    }
    /**
     * Get the message raw data by id.
     * @param messageId The message to get the data for.
     * @returns The message raw data.
     */
    messageRaw(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchBinary("get", `/api/v1/messages/${messageId}/raw`);
        });
    }
    /**
     * Submit message.
     * @param message The message to submit.
     * @returns The messageId.
     */
    messageSubmit(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.fetchJson("post", "/api/v1/messages", message);
            return response.messageId;
        });
    }
    /**
     * Submit message in raw format.
     * @param message The message to submit.
     * @returns The messageId.
     */
    messageSubmitRaw(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.fetchBinary("post", "/api/v1/messages", message);
            return response.messageId;
        });
    }
    /**
     * Find messages by index.
     * @param indexationKey The index value.
     * @returns The messageId.
     */
    messagesFind(indexationKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `/api/v1/messages?index=${encodeURIComponent(indexationKey)}`);
        });
    }
    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    messageChildren(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `/api/v1/messages/${messageId}/children`);
        });
    }
    /**
     * Find an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    output(outputId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `/api/v1/outputs/${outputId}`);
        });
    }
    /**
     * Get the address details.
     * @param address The address to get the details for.
     * @returns The address details.
     */
    address(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `/api/v1/addresses/${address}`);
        });
    }
    /**
     * Get the address outputs.
     * @param address The address to get the outputs for.
     * @returns The address outputs.
     */
    addressOutputs(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `/api/v1/addresses/${address}/outputs`);
        });
    }
    /**
     * Get the requested milestone.
     * @param index The index of the milestone to get.
     * @returns The milestone details.
     */
    milestone(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `/api/v1/milestones/${index}`);
        });
    }
    /**
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     * @private
     */
    fetchStatus(route) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield cross_fetch_1.default(`${this._endpoint}${route}`, {
                method: "get"
            });
            return response.status;
        });
    }
    /**
     * Perform a request in json format.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @private
     */
    fetchJson(method, route, requestData) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield cross_fetch_1.default(`${this._endpoint}${route}`, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: requestData ? JSON.stringify(requestData) : undefined
            });
            const responseData = yield response.json();
            if (response.ok && !responseData.error) {
                return responseData.data;
            }
            throw new clientError_1.ClientError((_b = (_a = responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData.error) === null || _c === void 0 ? void 0 : _c.code);
        });
    }
    /**
     * Perform a request for binary data.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @private
     */
    fetchBinary(method, route, requestData) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield cross_fetch_1.default(`${this._endpoint}${route}`, {
                method,
                headers: {
                    "Content-Type": "application/octet-stream"
                },
                body: requestData
            });
            let responseData;
            if (response.ok) {
                if (method === "get") {
                    return Buffer.from(yield response.arrayBuffer());
                }
                responseData = yield response.json();
                if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
                    return responseData === null || responseData === void 0 ? void 0 : responseData.data;
                }
            }
            if (!responseData) {
                responseData = yield response.json();
            }
            throw new clientError_1.ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
        });
    }
}
exports.SingleNodeClient = SingleNodeClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvc2luZ2xlTm9kZUNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBZ0M7QUFJaEMsK0NBQTRDO0FBWTVDOztHQUVHO0FBQ0gsTUFBYSxnQkFBZ0I7SUFNekI7OztPQUdHO0lBQ0gsWUFBWSxRQUFnQjtRQUN4QixJQUFJLENBQUMsd0NBQXdDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztTQUNoRTtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7T0FHRztJQUNVLE1BQU07O1lBQ2YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWpELElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDaEIsT0FBTyxJQUFJLENBQUM7YUFDZjtpQkFBTSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBRUQsTUFBTSxJQUFJLHlCQUFXLENBQUMsMEJBQTBCLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNVLElBQUk7O1lBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFlLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMvRCxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDVSxJQUFJOztZQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBZSxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDL0QsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE9BQU8s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