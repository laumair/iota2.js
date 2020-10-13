"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeEd25519Address = exports.deserializeEd25519Address = exports.serializeAddress = exports.deserializeAddress = exports.MIN_ED25519_ADDRESS_LENGTH = exports.MIN_ADDRESS_LENGTH = void 0;
const ed25519_1 = require("../crypto/ed25519");
const common_1 = require("./common");
exports.MIN_ADDRESS_LENGTH = common_1.BYTE_SIZE;
exports.MIN_ED25519_ADDRESS_LENGTH = ed25519_1.ED25519.ADDRESS_LENGTH;
/**
 * Deserialize the address from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeAddress(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_ADDRESS_LENGTH)) {
        throw new Error(`Address data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_ADDRESS_LENGTH}`);
    }
    const type = readBuffer.readByte("address.type");
    let address;
    if (type === 1) {
        address = deserializeEd25519Address(readBuffer);
    }
    else {
        throw new Error(`Unrecognized address type ${type}`);
    }
    return address;
}
exports.deserializeAddress = deserializeAddress;
/**
 * Serialize the address to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeAddress(writeBuffer, object) {
    writeBuffer.writeByte("address.type", object.type);
    if (object.type === 1) {
        serializeEd25519Address(writeBuffer, object);
    }
    else {
        throw new Error(`Unrecognized address type ${object.type}`);
    }
}
exports.serializeAddress = serializeAddress;
/**
 * Deserialize the Ed25519 address from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeEd25519Address(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_ED25519_ADDRESS_LENGTH)) {
        throw new Error(`Ed25519 address data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_ED25519_ADDRESS_LENGTH}`);
    }
    const address = readBuffer.readFixedBufferHex("ed25519Address.address", ed25519_1.ED25519.ADDRESS_LENGTH);
    return {
        type: 1,
        address
    };
}
exports.deserializeEd25519Address = deserializeEd25519Address;
/**
 * Serialize the ed25519 address to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeEd25519Address(writeBuffer, object) {
    writeBuffer.writeFixedBufferHex("ed25519Address.address", ed25519_1.ED25519.ADDRESS_LENGTH, object.address);
}
exports.serializeEd25519Address = serializeEd25519Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvYWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBNEM7QUFJNUMscUNBQXFDO0FBRXhCLFFBQUEsa0JBQWtCLEdBQVcsa0JBQVMsQ0FBQztBQUN2QyxRQUFBLDBCQUEwQixHQUFXLGlCQUFPLENBQUMsY0FBYyxDQUFDO0FBRXpFOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxVQUFzQjtJQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQywwQkFBa0IsQ0FBQyxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsQ0FBQyxNQUFNLEVBQ2hELGdFQUFnRSwwQkFBa0IsRUFBRSxDQUFDLENBQUM7S0FDN0Y7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELElBQUksT0FBTyxDQUFDO0lBRVosSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ1osT0FBTyxHQUFHLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ25EO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3hEO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQWhCRCxnREFnQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsV0FBd0IsRUFBRSxNQUF1QjtJQUM5RSxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbkQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNuQix1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDaEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQy9EO0FBQ0wsQ0FBQztBQVJELDRDQVFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLHlCQUF5QixDQUFDLFVBQXNCO0lBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGtDQUEwQixDQUFDLEVBQUU7UUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsVUFBVSxDQUFDLE1BQU0sRUFDeEQsZ0VBQWdFLGtDQUEwQixFQUFFLENBQUMsQ0FBQztLQUNyRztJQUVELE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRWhHLE9BQU87UUFDSCxJQUFJLEVBQUUsQ0FBQztRQUNQLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQVpELDhEQVlDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLHVCQUF1QixDQUFDLFdBQXdCLEVBQUUsTUFBdUI7SUFDckYsV0FBVyxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixFQUFFLGlCQUFPLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0RyxDQUFDO0FBRkQsMERBRUMifQ==