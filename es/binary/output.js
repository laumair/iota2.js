"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeSigLockedSingleOutput = exports.deserializeSigLockedSingleOutput = exports.serializeOutput = exports.deserializeOutput = exports.serializeOutputs = exports.deserializeOutputs = exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH = void 0;
const address_1 = require("./address");
const common_1 = require("./common");
exports.MIN_OUTPUT_LENGTH = common_1.BYTE_SIZE;
exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = common_1.BYTE_SIZE + address_1.MIN_ADDRESS_LENGTH + address_1.MIN_ED25519_ADDRESS_LENGTH;
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
    const type = readBuffer.readByte("output.type");
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
    writeBuffer.writeByte("output.type", object.type);
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
    const address = address_1.deserializeAddress(readBuffer);
    const amount = readBuffer.readUInt64("address.amount");
    return {
        type: 0,
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
    address_1.serializeAddress(writeBuffer, object.address);
    writeBuffer.writeUInt64("address.amount", BigInt(object.amount));
}
exports.serializeSigLockedSingleOutput = serializeSigLockedSingleOutput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsdUNBQWlIO0FBQ2pILHFDQUFxQztBQUV4QixRQUFBLGlCQUFpQixHQUFXLGtCQUFTLENBQUM7QUFDdEMsUUFBQSw0QkFBNEIsR0FBVyxrQkFBUyxHQUFHLDRCQUFrQixHQUFHLG9DQUEwQixDQUFDO0FBRWhIOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxVQUFzQjtJQUNyRCxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFL0QsTUFBTSxNQUFNLEdBQTZCLEVBQUUsQ0FBQztJQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUM5QztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFURCxnREFTQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxXQUF3QixFQUNyRCxPQUFpQztJQUNqQyxXQUFXLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU5RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxlQUFlLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVDO0FBQ0wsQ0FBQztBQVBELDRDQU9DO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGlCQUFpQixDQUFDLFVBQXNCO0lBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHlCQUFpQixDQUFDLEVBQUU7UUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsVUFBVSxDQUFDLE1BQU0sRUFDL0MsZ0VBQWdFLHlCQUFpQixFQUFFLENBQUMsQ0FBQztLQUM1RjtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDaEQsSUFBSSxLQUFLLENBQUM7SUFFVixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDWixLQUFLLEdBQUcsZ0NBQWdDLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDeEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDdkQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBaEJELDhDQWdCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixlQUFlLENBQUMsV0FBd0IsRUFDcEQsTUFBOEI7SUFDOUIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWxELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDbkIsOEJBQThCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZEO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE2QixNQUE2QixDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDdEY7QUFDTCxDQUFDO0FBVEQsMENBU0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZ0NBQWdDLENBQUMsVUFBc0I7SUFDbkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsb0NBQTRCLENBQUMsRUFBRTtRQUN4RCxNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxVQUFVLENBQUMsTUFBTSxFQUN2RSxnRUFBZ0Usb0NBQTRCLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZHO0lBRUQsTUFBTSxPQUFPLEdBQUcsNEJBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXZELE9BQU87UUFDSCxJQUFJLEVBQUUsQ0FBQztRQUNQLE9BQU87UUFDUCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUN6QixDQUFDO0FBQ04sQ0FBQztBQWRELDRFQWNDO0FBR0Q7Ozs7R0FJRztBQUNILFNBQWdCLDhCQUE4QixDQUFDLFdBQXdCLEVBQ25FLE1BQThCO0lBQzlCLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDckUsQ0FBQztBQUpELHdFQUlDIn0=