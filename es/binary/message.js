"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeMessage = exports.deserializeMessage = void 0;
const common_1 = require("./common");
const payload_1 = require("./payload");
const MIN_MESSAGE_LENGTH = common_1.BYTE_SIZE +
    (2 * common_1.MESSAGE_ID_LENGTH) +
    payload_1.MIN_PAYLOAD_LENGTH +
    common_1.UINT64_SIZE;
/**
 * Deserialize the message from binary.
 * @param readBuffer The message to deserialize.
 * @returns The deserialized message.
 */
function deserializeMessage(readBuffer) {
    if (!readBuffer.hasRemaining(MIN_MESSAGE_LENGTH)) {
        throw new Error(`Message data is ${readBuffer.length()} in length which is less than the minimimum size required of ${MIN_MESSAGE_LENGTH}`);
    }
    const version = readBuffer.readByte("message.version");
    if (version !== 1) {
        throw new Error(`Unsupported message version number: ${version}`);
    }
    const parent1MessageId = readBuffer.readFixedBufferHex("message.parent1MessageId", common_1.MESSAGE_ID_LENGTH);
    const parent2MessageId = readBuffer.readFixedBufferHex("message.parent2MessageId", common_1.MESSAGE_ID_LENGTH);
    const payload = payload_1.deserializePayload(readBuffer);
    const nonce = readBuffer.readFixedBufferHex("message.nonce", common_1.UINT64_SIZE);
    const unused = readBuffer.unused();
    if (unused !== 0) {
        throw new Error(`Message data length ${readBuffer.length()} has unused data ${unused}`);
    }
    return {
        version,
        payload,
        parent1MessageId,
        parent2MessageId,
        nonce
    };
}
exports.deserializeMessage = deserializeMessage;
/**
 * Serialize the message essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeMessage(writeBuffer, object) {
    var _a;
    writeBuffer.writeByte("message.version", object.version);
    writeBuffer.writeFixedBufferHex("message.parent1MessageId", common_1.MESSAGE_ID_LENGTH, object.parent1MessageId);
    writeBuffer.writeFixedBufferHex("message.parent2MessageId", common_1.MESSAGE_ID_LENGTH, object.parent2MessageId);
    payload_1.serializePayload(writeBuffer, object.payload);
    writeBuffer.writeFixedBufferHex("message.nonce", common_1.UINT64_SIZE, (_a = object.nonce) !== null && _a !== void 0 ? _a : "");
}
exports.serializeMessage = serializeMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxxQ0FBcUU7QUFDckUsdUNBQXFGO0FBRXJGLE1BQU0sa0JBQWtCLEdBQVcsa0JBQVM7SUFDeEMsQ0FBQyxDQUFDLEdBQUcsMEJBQWlCLENBQUM7SUFDdkIsNEJBQWtCO0lBQ2xCLG9CQUFXLENBQUM7QUFFaEI7Ozs7R0FJRztBQUNILFNBQWdCLGtCQUFrQixDQUFDLFVBQXNCO0lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsVUFBVSxDQUFDLE1BQU0sRUFDaEQsZ0VBQWdFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztLQUM3RjtJQUVELE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2RCxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7UUFDZixNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3JFO0lBRUQsTUFBTSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLEVBQUUsMEJBQWlCLENBQUMsQ0FBQztJQUN0RyxNQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsRUFBRSwwQkFBaUIsQ0FBQyxDQUFDO0lBRXRHLE1BQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsb0JBQVcsQ0FBQyxDQUFDO0lBRTFFLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQyxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixVQUFVLENBQUMsTUFBTSxFQUNwRCxvQkFBb0IsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUNyQztJQUVELE9BQU87UUFDSCxPQUFPO1FBQ1AsT0FBTztRQUNQLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsS0FBSztLQUNSLENBQUM7QUFDTixDQUFDO0FBL0JELGdEQStCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxXQUF3QixFQUNyRCxNQUFnQjs7SUFDaEIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFekQsV0FBVyxDQUFDLG1CQUFtQixDQUFDLDBCQUEwQixFQUFFLDBCQUFpQixFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3hHLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQywwQkFBMEIsRUFBRSwwQkFBaUIsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUV4RywwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsb0JBQVcsUUFBRSxNQUFNLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUMsQ0FBQztBQUN0RixDQUFDO0FBVkQsNENBVUMifQ==