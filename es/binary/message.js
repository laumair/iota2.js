"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeMessage = exports.deserializeMessage = void 0;
const common_1 = require("./common");
const payload_1 = require("./payload");
const MIN_MESSAGE_LENGTH = common_1.BYTE_SIZE +
    (2 * common_1.MESSAGE_ID_LENGTH) +
    payload_1.MIN_PAYLOAD_LENGTH +
    common_1.UINT64_SIZE;
const EMPTY_MESSAGE_ID_HEX = "0".repeat(common_1.MESSAGE_ID_LENGTH * 2);
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
    const nonce = readBuffer.readUInt64("message.nonce");
    const unused = readBuffer.unused();
    if (unused !== 0) {
        throw new Error(`Message data length ${readBuffer.length()} has unused data ${unused}`);
    }
    return {
        version,
        payload,
        parent1MessageId,
        parent2MessageId,
        nonce: Number(nonce)
    };
}
exports.deserializeMessage = deserializeMessage;
/**
 * Serialize the message essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeMessage(writeBuffer, object) {
    var _a, _b;
    writeBuffer.writeByte("message.version", object.version);
    writeBuffer.writeFixedBufferHex("message.parent1MessageId", common_1.MESSAGE_ID_LENGTH, (_a = object.parent1MessageId) !== null && _a !== void 0 ? _a : EMPTY_MESSAGE_ID_HEX);
    writeBuffer.writeFixedBufferHex("message.parent2MessageId", common_1.MESSAGE_ID_LENGTH, (_b = object.parent2MessageId) !== null && _b !== void 0 ? _b : EMPTY_MESSAGE_ID_HEX);
    payload_1.serializePayload(writeBuffer, object.payload);
    writeBuffer.writeUInt64("message.nonce", BigInt(object.nonce));
}
exports.serializeMessage = serializeMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxxQ0FBcUU7QUFDckUsdUNBQXFGO0FBRXJGLE1BQU0sa0JBQWtCLEdBQVcsa0JBQVM7SUFDeEMsQ0FBQyxDQUFDLEdBQUcsMEJBQWlCLENBQUM7SUFDdkIsNEJBQWtCO0lBQ2xCLG9CQUFXLENBQUM7QUFFaEIsTUFBTSxvQkFBb0IsR0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLDBCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRXZFOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxVQUFzQjtJQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsQ0FBQyxNQUFNLEVBQ2hELGdFQUFnRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7S0FDN0Y7SUFFRCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkQsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUNyRTtJQUVELE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixDQUFDLDBCQUEwQixFQUFFLDBCQUFpQixDQUFDLENBQUM7SUFDdEcsTUFBTSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLEVBQUUsMEJBQWlCLENBQUMsQ0FBQztJQUV0RyxNQUFNLE9BQU8sR0FBRyw0QkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXJELE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQyxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixVQUFVLENBQUMsTUFBTSxFQUNwRCxvQkFBb0IsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUNyQztJQUVELE9BQU87UUFDSCxPQUFPO1FBQ1AsT0FBTztRQUNQLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDdkIsQ0FBQztBQUNOLENBQUM7QUEvQkQsZ0RBK0JDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFdBQXdCLEVBQ3JELE1BQWdCOztJQUNoQixXQUFXLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV6RCxXQUFXLENBQUMsbUJBQW1CLENBQUMsMEJBQTBCLEVBQ3RELDBCQUFpQixRQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsbUNBQUksb0JBQW9CLENBQUMsQ0FBQztJQUN4RSxXQUFXLENBQUMsbUJBQW1CLENBQUMsMEJBQTBCLEVBQ3RELDBCQUFpQixRQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsbUNBQUksb0JBQW9CLENBQUMsQ0FBQztJQUV4RSwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlDLFdBQVcsQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBWkQsNENBWUMifQ==