"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeUTXOInput = exports.deserializeUTXOInput = exports.serializeInput = exports.deserializeInput = exports.serializeInputs = exports.deserializeInputs = exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH = void 0;
const common_1 = require("./common");
exports.MIN_INPUT_LENGTH = common_1.BYTE_SIZE;
exports.MIN_UTXO_INPUT_LENGTH = common_1.TRANSACTION_ID_LENGTH + common_1.UINT16_SIZE;
/**
 * Deserialize the inputs from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeInputs(readBuffer) {
    const numInputs = readBuffer.readUInt16("inputs.numInputs");
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
        inputs.push(deserializeInput(readBuffer));
    }
    return inputs;
}
exports.deserializeInputs = deserializeInputs;
/**
 * Serialize the inputs to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param objects The objects to serialize.
 */
function serializeInputs(writeBuffer, objects) {
    writeBuffer.writeUInt16("inputs.numInputs", objects.length);
    for (let i = 0; i < objects.length; i++) {
        serializeInput(writeBuffer, objects[i]);
    }
}
exports.serializeInputs = serializeInputs;
/**
 * Deserialize the input from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeInput(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_INPUT_LENGTH)) {
        throw new Error(`Input data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_INPUT_LENGTH}`);
    }
    const type = readBuffer.readByte("input.type");
    let input;
    if (type === 0) {
        input = deserializeUTXOInput(readBuffer);
    }
    else {
        throw new Error(`Unrecognized input type ${type}`);
    }
    return input;
}
exports.deserializeInput = deserializeInput;
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
        throw new Error(`Unrecognized input type ${object.type}`);
    }
}
exports.serializeInput = serializeInput;
/**
 * Deserialize the utxo input from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeUTXOInput(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_UTXO_INPUT_LENGTH)) {
        throw new Error(`UTXO Input data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_UTXO_INPUT_LENGTH}`);
    }
    const transactionId = readBuffer.readFixedBufferHex("utxoInput.transactionId", common_1.TRANSACTION_ID_LENGTH);
    const transactionOutputIndex = readBuffer.readUInt16("utxoInput.transactionOutputIndex");
    return {
        type: 0,
        transactionId,
        transactionOutputIndex
    };
}
exports.deserializeUTXOInput = deserializeUTXOInput;
/**
 * Serialize the utxo input to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeUTXOInput(writeBuffer, object) {
    writeBuffer.writeFixedBufferHex("utxoInput.transactionId", common_1.TRANSACTION_ID_LENGTH, object.transactionId);
    writeBuffer.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
}
exports.serializeUTXOInput = serializeUTXOInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHFDQUF5RTtBQUU1RCxRQUFBLGdCQUFnQixHQUFXLGtCQUFTLENBQUM7QUFDckMsUUFBQSxxQkFBcUIsR0FBVyw4QkFBcUIsR0FBRyxvQkFBVyxDQUFDO0FBRWpGOzs7O0dBSUc7QUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxVQUFzQjtJQUNwRCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFNUQsTUFBTSxNQUFNLEdBQWlCLEVBQUUsQ0FBQztJQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUM3QztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFURCw4Q0FTQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixlQUFlLENBQUMsV0FBd0IsRUFDcEQsT0FBcUI7SUFDckIsV0FBVyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFNUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsY0FBYyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzQztBQUNMLENBQUM7QUFQRCwwQ0FPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxVQUFzQjtJQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyx3QkFBZ0IsQ0FBQyxFQUFFO1FBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLFVBQVUsQ0FBQyxNQUFNLEVBQzlDLGdFQUFnRSx3QkFBZ0IsRUFBRSxDQUFDLENBQUM7S0FDM0Y7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9DLElBQUksS0FBSyxDQUFDO0lBRVYsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ1osS0FBSyxHQUFHLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzVDO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3REO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQWhCRCw0Q0FnQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLFdBQXdCLEVBQ25ELE1BQWtCO0lBQ2xCLFdBQVcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVqRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ25CLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUMzQztTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBNEIsTUFBNkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3JGO0FBQ0wsQ0FBQztBQVRELHdDQVNDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLG9CQUFvQixDQUFDLFVBQXNCO0lBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDZCQUFxQixDQUFDLEVBQUU7UUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsVUFBVSxDQUFDLE1BQU0sRUFDbkQsZ0VBQWdFLDZCQUFxQixFQUFFLENBQUMsQ0FBQztLQUNoRztJQUVELE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBeUIsRUFBRSw4QkFBcUIsQ0FBQyxDQUFDO0lBQ3RHLE1BQU0sc0JBQXNCLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBRXpGLE9BQU87UUFDSCxJQUFJLEVBQUUsQ0FBQztRQUNQLGFBQWE7UUFDYixzQkFBc0I7S0FDekIsQ0FBQztBQUNOLENBQUM7QUFkRCxvREFjQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxXQUF3QixFQUN2RCxNQUFrQjtJQUNsQixXQUFXLENBQUMsbUJBQW1CLENBQUMseUJBQXlCLEVBQUUsOEJBQXFCLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hHLFdBQVcsQ0FBQyxXQUFXLENBQUMsa0NBQWtDLEVBQUUsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDL0YsQ0FBQztBQUpELGdEQUlDIn0=