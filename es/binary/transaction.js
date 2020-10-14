"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTransactionEssence = exports.deserializeTransactionEssence = exports.MIN_TRANSACTION_ESSENCE_LENGTH = void 0;
const common_1 = require("./common");
const input_1 = require("./input");
const output_1 = require("./output");
const payload_1 = require("./payload");
exports.MIN_TRANSACTION_ESSENCE_LENGTH = common_1.UINT32_SIZE + (2 * common_1.ARRAY_LENGTH) + common_1.UINT32_SIZE;
/**
 * Deserialize the transaction essence from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeTransactionEssence(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_TRANSACTION_ESSENCE_LENGTH)) {
        throw new Error(`Transaction essence data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_TRANSACTION_ESSENCE_LENGTH}`);
    }
    const type = readBuffer.readUInt32("transactionEssence.type");
    if (type !== 0) {
        throw new Error(`Type mismatch in transactionEssence ${type}`);
    }
    const inputs = input_1.deserializeInputs(readBuffer);
    const outputs = output_1.deserializeOutputs(readBuffer);
    const payload = payload_1.deserializePayload(readBuffer);
    if (payload && payload.type !== 2) {
        throw new Error("Transaction essence can only contain embedded Indexation Payload");
    }
    return {
        type,
        inputs,
        outputs,
        payload
    };
}
exports.deserializeTransactionEssence = deserializeTransactionEssence;
/**
 * Serialize the transaction essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeTransactionEssence(writeBuffer, object) {
    writeBuffer.writeUInt32("transactionEssence.type", object.type);
    input_1.serializeInputs(writeBuffer, object.inputs);
    output_1.serializeOutputs(writeBuffer, object.outputs);
    payload_1.serializePayload(writeBuffer, object.payload);
}
exports.serializeTransactionEssence = serializeTransactionEssence;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHFDQUFxRDtBQUNyRCxtQ0FBNkQ7QUFDN0QscUNBQWdFO0FBQ2hFLHVDQUFpRTtBQUVwRCxRQUFBLDhCQUE4QixHQUFXLG9CQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcscUJBQVksQ0FBQyxHQUFHLG9CQUFXLENBQUM7QUFFckc7Ozs7R0FJRztBQUNILFNBQWdCLDZCQUE2QixDQUFDLFVBQXNCO0lBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHNDQUE4QixDQUFDLEVBQUU7UUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsVUFBVSxDQUFDLE1BQU0sRUFDNUQsZ0VBQWdFLHNDQUE4QixFQUFFLENBQUMsQ0FBQztLQUN6RztJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM5RCxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsTUFBTSxNQUFNLEdBQUcseUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0MsTUFBTSxPQUFPLEdBQUcsMkJBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFL0MsTUFBTSxPQUFPLEdBQUcsNEJBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO0tBQ3ZGO0lBRUQsT0FBTztRQUNILElBQUk7UUFDSixNQUFNO1FBQ04sT0FBTztRQUNQLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQXpCRCxzRUF5QkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsMkJBQTJCLENBQUMsV0FBd0IsRUFDaEUsTUFBMkI7SUFDM0IsV0FBVyxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEUsdUJBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLHlCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsMEJBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBTkQsa0VBTUMifQ==