"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeUTXOInput = exports.deserializeUTXOInput = exports.serializeInput = exports.deserializeInput = exports.serializeInputs = exports.deserializeInputs = exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH = void 0;
const common_1 = require("./common");
exports.MIN_INPUT_LENGTH = common_1.SMALL_TYPE_LENGTH;
exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH + common_1.TRANSACTION_ID_LENGTH + common_1.UINT16_SIZE;
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
    const type = readBuffer.readByte("input.type", false);
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
    const type = readBuffer.readByte("utxoInput.type");
    if (type !== 0) {
        throw new Error(`Type mismatch in utxoInput ${type}`);
    }
    const transactionId = readBuffer.readFixedBufferHex("utxoInput.transactionId", common_1.TRANSACTION_ID_LENGTH);
    const transactionOutputIndex = readBuffer.readUInt16("utxoInput.transactionOutputIndex");
    return {
        type,
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
    writeBuffer.writeByte("utxoInput.type", object.type);
    writeBuffer.writeFixedBufferHex("utxoInput.transactionId", common_1.TRANSACTION_ID_LENGTH, object.transactionId);
    writeBuffer.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
}
exports.serializeUTXOInput = serializeUTXOInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHFDQUFpRjtBQUVwRSxRQUFBLGdCQUFnQixHQUFXLDBCQUFpQixDQUFDO0FBQzdDLFFBQUEscUJBQXFCLEdBQVcsd0JBQWdCLEdBQUcsOEJBQXFCLEdBQUcsb0JBQVcsQ0FBQztBQUVwRzs7OztHQUlHO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQUMsVUFBc0I7SUFDcEQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTVELE1BQU0sTUFBTSxHQUFpQixFQUFFLENBQUM7SUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDN0M7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBVEQsOENBU0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZUFBZSxDQUFDLFdBQXdCLEVBQ3BELE9BQXFCO0lBQ3JCLFdBQVcsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0M7QUFDTCxDQUFDO0FBUEQsMENBT0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsVUFBc0I7SUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsd0JBQWdCLENBQUMsRUFBRTtRQUM1QyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixVQUFVLENBQUMsTUFBTSxFQUM5QyxnRUFBZ0Usd0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0tBQzNGO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEQsSUFBSSxLQUFLLENBQUM7SUFFVixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDWixLQUFLLEdBQUcsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUM7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDdEQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBaEJELDRDQWdCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixjQUFjLENBQUMsV0FBd0IsRUFDbkQsTUFBa0I7SUFDbEIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNuQixrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDM0M7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTRCLE1BQTZCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNyRjtBQUNMLENBQUM7QUFQRCx3Q0FPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxVQUFzQjtJQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyw2QkFBcUIsQ0FBQyxFQUFFO1FBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLFVBQVUsQ0FBQyxNQUFNLEVBQ25ELGdFQUFnRSw2QkFBcUIsRUFBRSxDQUFDLENBQUM7S0FDaEc7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkQsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN6RDtJQUVELE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBeUIsRUFBRSw4QkFBcUIsQ0FBQyxDQUFDO0lBQ3RHLE1BQU0sc0JBQXNCLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBRXpGLE9BQU87UUFDSCxJQUFJO1FBQ0osYUFBYTtRQUNiLHNCQUFzQjtLQUN6QixDQUFDO0FBQ04sQ0FBQztBQW5CRCxvREFtQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsV0FBd0IsRUFDdkQsTUFBa0I7SUFDbEIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsV0FBVyxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixFQUFFLDhCQUFxQixFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4RyxXQUFXLENBQUMsV0FBVyxDQUFDLGtDQUFrQyxFQUFFLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQy9GLENBQUM7QUFMRCxnREFLQyJ9