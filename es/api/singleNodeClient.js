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
     * @param index The index value.
     * @returns The messageId.
     */
    messagesFind(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `/api/v1/messages?index=${encodeURIComponent(index)}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvc2luZ2xlTm9kZUNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBZ0M7QUFJaEMsK0NBQTRDO0FBWTVDOztHQUVHO0FBQ0gsTUFBYSxnQkFBZ0I7SUFNekI7OztPQUdHO0lBQ0gsWUFBWSxRQUFnQjtRQUN4QixJQUFJLENBQUMsd0NBQXdDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztTQUNoRTtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7T0FHRztJQUNVLE1BQU07O1lBQ2YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWpELElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDaEIsT0FBTyxJQUFJLENBQUM7YUFDZjtpQkFBTSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBRUQsTUFBTSxJQUFJLHlCQUFXLENBQUMsMEJBQTBCLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNVLElBQUk7O1lBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFlLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMvRCxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDVSxJQUFJOztZQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBZSxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDL0QsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE9BQU8sQ0FBQyxTQUFpQjs7WUFDbEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFrQixLQUFLLEVBQUUsb0JBQW9CLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDbkYsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLGVBQWUsQ0FBQyxTQUFpQjs7WUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUEwQixLQUFLLEVBQUUsb0JBQW9CLFNBQVMsV0FBVyxDQUFDLENBQUM7UUFDcEcsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLFVBQVUsQ0FBQyxTQUFpQjs7WUFDckMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxvQkFBb0IsU0FBUyxNQUFNLENBQUMsQ0FBQztRQUN4RSxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsYUFBYSxDQUFDLE9BQWlCOztZQUN4QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQXVCLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUVqRyxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDOUIsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLGdCQUFnQixDQUFDLE9BQWU7O1lBQ3pDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBYSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFekYsT0FBUSxRQUF1QixDQUFDLFNBQVMsQ0FBQztRQUM5QyxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsWUFBWSxDQUFDLEtBQWE7O1lBQ25DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FDakIsS0FBSyxFQUNMLDBCQUEwQixrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUN4RCxDQUFDO1FBQ04sQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLGVBQWUsQ0FBQyxTQUFpQjs7WUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsb0JBQW9CLFNBQVMsV0FBVyxDQUMzQyxDQUFDO1FBQ04sQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE1BQU0sQ0FBQyxRQUFnQjs7WUFDaEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsbUJBQW1CLFFBQVEsRUFBRSxDQUNoQyxDQUFDO1FBQ04sQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE9BQU8sQ0FBQyxPQUFlOztZQUNoQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQ2pCLEtBQUssRUFDTCxxQkFBcUIsT0FBTyxFQUFFLENBQ2pDLENBQUM7UUFDTixDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsY0FBYyxDQUFDLE9BQWU7O1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FDakIsS0FBSyxFQUNMLHFCQUFxQixPQUFPLFVBQVUsQ0FDekMsQ0FBQztRQUNOLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxTQUFTLENBQUMsS0FBYTs7WUFDaEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsc0JBQXNCLEtBQUssRUFBRSxDQUNoQyxDQUFDO1FBQ04sQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVyxXQUFXLENBQUMsS0FBYTs7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxxQkFBSyxDQUN4QixHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxFQUFFLEVBQzNCO2dCQUNJLE1BQU0sRUFBRSxLQUFLO2FBQ2hCLENBQ0osQ0FBQztZQUVGLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUMzQixDQUFDO0tBQUE7SUFFRDs7Ozs7OztPQU9HO0lBQ1csU0FBUyxDQUFPLE1BQXNCLEVBQUUsS0FBYSxFQUFFLFdBQWU7OztZQUNoRixNQUFNLFFBQVEsR0FBRyxNQUFNLHFCQUFLLENBQ3hCLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLEVBQUUsRUFDM0I7Z0JBQ0ksTUFBTTtnQkFDTixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUzthQUM5RCxDQUNKLENBQUM7WUFFRixNQUFNLFlBQVksR0FBaUIsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFekQsSUFBSSxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtnQkFDcEMsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDO2FBQzVCO1lBRUQsTUFBTSxJQUFJLHlCQUFXLGFBQ2pCLFlBQVksQ0FBQyxLQUFLLDBDQUFFLE9BQU8sbUNBQUksUUFBUSxDQUFDLFVBQVUsRUFDbEQsS0FBSyxFQUNMLFFBQVEsQ0FBQyxNQUFNLFFBQ2YsWUFBWSxDQUFDLEtBQUssMENBQUUsSUFBSSxDQUMzQixDQUFDOztLQUNMO0lBRUQ7Ozs7Ozs7T0FPRztJQUNXLFdBQVcsQ0FBSSxNQUFzQixFQUFFLEtBQWEsRUFBRSxXQUFvQjs7O1lBQ3BGLE1BQU0sUUFBUSxHQUFHLE1BQU0scUJBQUssQ0FDeEIsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssRUFBRSxFQUMzQjtnQkFDSSxNQUFNO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxjQUFjLEVBQUUsMEJBQTBCO2lCQUM3QztnQkFDRCxJQUFJLEVBQUUsV0FBVzthQUNwQixDQUNKLENBQUM7WUFFRixJQUFJLFlBQXNDLENBQUM7WUFDM0MsSUFBSSxRQUFRLENBQUMsRUFBRSxFQUFFO2dCQUNiLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtvQkFDbEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7aUJBQ3BEO2dCQUNELFlBQVksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFckMsSUFBSSxFQUFDLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxLQUFLLENBQUEsRUFBRTtvQkFDdEIsT0FBTyxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsSUFBUyxDQUFDO2lCQUNsQzthQUNKO1lBRUQsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDZixZQUFZLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEM7WUFFRCxNQUFNLElBQUkseUJBQVcsYUFDakIsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssMENBQUUsT0FBTyxtQ0FBSSxRQUFRLENBQUMsVUFBVSxFQUNuRCxLQUFLLEVBQ0wsUUFBUSxDQUFDLE1BQU0sUUFDZixZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsS0FBSywwQ0FBRSxJQUFJLENBQzVCLENBQUM7O0tBQ0w7Q0FDSjtBQXhRRCw0Q0F3UUMifQ==