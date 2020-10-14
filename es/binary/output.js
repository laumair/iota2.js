"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeSigLockedSingleOutput = exports.deserializeSigLockedSingleOutput = exports.serializeOutput = exports.deserializeOutput = exports.serializeOutputs = exports.deserializeOutputs = exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH = void 0;
const address_1 = require("./address");
const common_1 = require("./common");
exports.MIN_OUTPUT_LENGTH = common_1.SMALL_TYPE_LENGTH;
exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH + address_1.MIN_ADDRESS_LENGTH + address_1.MIN_ED25519_ADDRESS_LENGTH;
/**
 * Deserialize the outputs from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeOutputs(readBuffer) {
    const numOutputs = readBuffer.readUInt16("outputs.numOutputs");
    const inputs = [];
    for (let i = 0; i < numOutputs; i++) {
        inputs.push(deserializeOutput(readBuffer));
    }
    return inputs;
}
exports.deserializeOutputs = deserializeOutputs;
/**
 * Serialize the outputs to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param objects The objects to serialize.
 */
function serializeOutputs(writeBuffer, objects) {
    writeBuffer.writeUInt16("outputs.numOutputs", objects.length);
    for (let i = 0; i < objects.length; i++) {
        serializeOutput(writeBuffer, objects[i]);
    }
}
exports.serializeOutputs = serializeOutputs;
/**
 * Deserialize the output from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeOutput(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_OUTPUT_LENGTH)) {
        throw new Error(`Output data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_OUTPUT_LENGTH}`);
    }
    const type = readBuffer.readByte("output.type", false);
    let input;
    if (type === 0) {
        input = deserializeSigLockedSingleOutput(readBuffer);
    }
    else {
        throw new Error(`Unrecognized output type ${type}`);
    }
    return input;
}
exports.deserializeOutput = deserializeOutput;
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
        throw new Error(`Unrecognized output type ${object.type}`);
    }
}
exports.serializeOutput = serializeOutput;
/**
 * Deserialize the signature locked single output from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeSigLockedSingleOutput(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_SIG_LOCKED_OUTPUT_LENGTH)) {
        throw new Error(`Signature Locked Single Output data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_SIG_LOCKED_OUTPUT_LENGTH}`);
    }
    const type = readBuffer.readByte("sigLockedSingleOutput.type");
    if (type !== 0) {
        throw new Error(`Type mismatch in sigLockedSingleOutput ${type}`);
    }
    const address = address_1.deserializeAddress(readBuffer);
    const amount = readBuffer.readUInt64("sigLockedSingleOutput.amount");
    return {
        type,
        address,
        amount: Number(amount)
    };
}
exports.deserializeSigLockedSingleOutput = deserializeSigLockedSingleOutput;
/**
 * Serialize the signature locked single output to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeSigLockedSingleOutput(writeBuffer, object) {
    writeBuffer.writeByte("sigLockedSingleOutput.type", object.type);
    address_1.serializeAddress(writeBuffer, object.address);
    writeBuffer.writeUInt64("sigLockedSingleOutput.amount", BigInt(object.amount));
}
exports.serializeSigLockedSingleOutput = serializeSigLockedSingleOutput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsdUNBQWlIO0FBQ2pILHFDQUE2QztBQUVoQyxRQUFBLGlCQUFpQixHQUFXLDBCQUFpQixDQUFDO0FBQzlDLFFBQUEsNEJBQTRCLEdBQVcseUJBQWlCLEdBQUcsNEJBQWtCLEdBQUcsb0NBQTBCLENBQUM7QUFFeEg7Ozs7R0FJRztBQUNILFNBQWdCLGtCQUFrQixDQUFDLFVBQXNCO0lBQ3JELE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUUvRCxNQUFNLE1BQU0sR0FBNkIsRUFBRSxDQUFDO0lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVRELGdEQVNDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFdBQXdCLEVBQ3JELE9BQWlDO0lBQ2pDLFdBQVcsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTlELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUM7QUFDTCxDQUFDO0FBUEQsNENBT0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQUMsVUFBc0I7SUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMseUJBQWlCLENBQUMsRUFBRTtRQUM3QyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixVQUFVLENBQUMsTUFBTSxFQUMvQyxnRUFBZ0UseUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0tBQzVGO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkQsSUFBSSxLQUFLLENBQUM7SUFFVixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDWixLQUFLLEdBQUcsZ0NBQWdDLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDeEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDdkQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBaEJELDhDQWdCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixlQUFlLENBQUMsV0FBd0IsRUFDcEQsTUFBOEI7SUFDOUIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNuQiw4QkFBOEIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDdkQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTZCLE1BQTZCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN0RjtBQUNMLENBQUM7QUFQRCwwQ0FPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQ0FBZ0MsQ0FBQyxVQUFzQjtJQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxvQ0FBNEIsQ0FBQyxFQUFFO1FBQ3hELE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLFVBQVUsQ0FBQyxNQUFNLEVBQ3ZFLGdFQUFnRSxvQ0FBNEIsRUFBRSxDQUFDLENBQUM7S0FDdkc7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDL0QsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNyRTtJQUVELE1BQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUVyRSxPQUFPO1FBQ0gsSUFBSTtRQUNKLE9BQU87UUFDUCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUN6QixDQUFDO0FBQ04sQ0FBQztBQW5CRCw0RUFtQkM7QUFHRDs7OztHQUlHO0FBQ0gsU0FBZ0IsOEJBQThCLENBQUMsV0FBd0IsRUFDbkUsTUFBOEI7SUFDOUIsV0FBVyxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakUsMEJBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxXQUFXLENBQUMsV0FBVyxDQUFDLDhCQUE4QixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNuRixDQUFDO0FBTEQsd0VBS0MifQ==