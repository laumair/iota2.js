"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeEd25519Address = exports.deserializeEd25519Address = exports.serializeAddress = exports.deserializeAddress = exports.MIN_ED25519_ADDRESS_LENGTH = exports.MIN_ADDRESS_LENGTH = void 0;
const ed25519_1 = require("../crypto/ed25519");
const common_1 = require("./common");
exports.MIN_ADDRESS_LENGTH = common_1.SMALL_TYPE_LENGTH;
exports.MIN_ED25519_ADDRESS_LENGTH = exports.MIN_ADDRESS_LENGTH + ed25519_1.Ed25519.ADDRESS_LENGTH;
/**
 * Deserialize the address from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeAddress(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_ADDRESS_LENGTH)) {
        throw new Error(`Address data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_ADDRESS_LENGTH}`);
    }
    const type = readBuffer.readByte("address.type", false);
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
    const type = readBuffer.readByte("ed25519Address.type");
    if (type !== 1) {
        throw new Error(`Type mismatch in ed25519Address ${type}`);
    }
    const address = readBuffer.readFixedBufferHex("ed25519Address.address", ed25519_1.Ed25519.ADDRESS_LENGTH);
    return {
        type,
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
    writeBuffer.writeByte("ed25519Address.type", object.type);
    writeBuffer.writeFixedBufferHex("ed25519Address.address", ed25519_1.Ed25519.ADDRESS_LENGTH, object.address);
}
exports.serializeEd25519Address = serializeEd25519Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvYWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBNEM7QUFJNUMscUNBQTZDO0FBRWhDLFFBQUEsa0JBQWtCLEdBQVcsMEJBQWlCLENBQUM7QUFDL0MsUUFBQSwwQkFBMEIsR0FBVywwQkFBa0IsR0FBRyxpQkFBTyxDQUFDLGNBQWMsQ0FBQztBQUU5Rjs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsVUFBc0I7SUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsMEJBQWtCLENBQUMsRUFBRTtRQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixVQUFVLENBQUMsTUFBTSxFQUNoRCxnRUFBZ0UsMEJBQWtCLEVBQUUsQ0FBQyxDQUFDO0tBQzdGO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEQsSUFBSSxPQUFPLENBQUM7SUFFWixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDWixPQUFPLEdBQUcseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDeEQ7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBaEJELGdEQWdCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxXQUF3QixFQUFFLE1BQXVCO0lBQzlFLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDbkIsdUJBQXVCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMvRDtBQUNMLENBQUM7QUFORCw0Q0FNQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQix5QkFBeUIsQ0FBQyxVQUFzQjtJQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxrQ0FBMEIsQ0FBQyxFQUFFO1FBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLFVBQVUsQ0FBQyxNQUFNLEVBQ3hELGdFQUFnRSxrQ0FBMEIsRUFBRSxDQUFDLENBQUM7S0FDckc7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEQsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM5RDtJQUVELE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRWhHLE9BQU87UUFDSCxJQUFJO1FBQ0osT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBakJELDhEQWlCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQix1QkFBdUIsQ0FBQyxXQUF3QixFQUFFLE1BQXVCO0lBQ3JGLFdBQVcsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFELFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEcsQ0FBQztBQUhELDBEQUdDIn0=