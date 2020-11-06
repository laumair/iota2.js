"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeEd25519Address = exports.deserializeEd25519Address = exports.serializeAddress = exports.deserializeAddress = exports.MIN_ED25519_ADDRESS_LENGTH = exports.MIN_ADDRESS_LENGTH = void 0;
var ed25519Address_1 = require("../crypto/ed25519Address");
var common_1 = require("./common");
exports.MIN_ADDRESS_LENGTH = common_1.SMALL_TYPE_LENGTH;
exports.MIN_ED25519_ADDRESS_LENGTH = exports.MIN_ADDRESS_LENGTH + ed25519Address_1.Ed25519Address.ADDRESS_LENGTH;
/**
 * Deserialize the address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeAddress(readStream) {
    if (!readStream.hasRemaining(exports.MIN_ADDRESS_LENGTH)) {
        throw new Error("Address data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ADDRESS_LENGTH);
    }
    var type = readStream.readByte("address.type", false);
    var address;
    if (type === 1) {
        address = deserializeEd25519Address(readStream);
    }
    else {
        throw new Error("Unrecognized address type " + type);
    }
    return address;
}
exports.deserializeAddress = deserializeAddress;
/**
 * Serialize the address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeAddress(writeStream, object) {
    if (object.type === 1) {
        serializeEd25519Address(writeStream, object);
    }
    else {
        throw new Error("Unrecognized address type " + object.type);
    }
}
exports.serializeAddress = serializeAddress;
/**
 * Deserialize the Ed25519 address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeEd25519Address(readStream) {
    if (!readStream.hasRemaining(exports.MIN_ED25519_ADDRESS_LENGTH)) {
        throw new Error("Ed25519 address data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ED25519_ADDRESS_LENGTH);
    }
    var type = readStream.readByte("ed25519Address.type");
    if (type !== 1) {
        throw new Error("Type mismatch in ed25519Address " + type);
    }
    var address = readStream.readFixedHex("ed25519Address.address", ed25519Address_1.Ed25519Address.ADDRESS_LENGTH);
    return {
        type: type,
        address: address
    };
}
exports.deserializeEd25519Address = deserializeEd25519Address;
/**
 * Serialize the ed25519 address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeEd25519Address(writeStream, object) {
    writeStream.writeByte("ed25519Address.type", object.type);
    writeStream.writeFixedHex("ed25519Address.address", ed25519Address_1.Ed25519Address.ADDRESS_LENGTH, object.address);
}
exports.serializeEd25519Address = serializeEd25519Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvYWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEQ7QUFJMUQsbUNBQTZDO0FBRWhDLFFBQUEsa0JBQWtCLEdBQVcsMEJBQWlCLENBQUM7QUFDL0MsUUFBQSwwQkFBMEIsR0FBVywwQkFBa0IsR0FBRywrQkFBYyxDQUFDLGNBQWMsQ0FBQztBQUVyRzs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsVUFBc0I7SUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsMEJBQWtCLENBQUMsRUFBRTtRQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFtQixVQUFVLENBQUMsTUFBTSxFQUFFLHFFQUNjLDBCQUFvQixDQUFDLENBQUM7S0FDN0Y7SUFFRCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RCxJQUFJLE9BQU8sQ0FBQztJQUVaLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNaLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNuRDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBNkIsSUFBTSxDQUFDLENBQUM7S0FDeEQ7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBaEJELGdEQWdCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxXQUF3QixFQUFFLE1BQXVCO0lBQzlFLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDbkIsdUJBQXVCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUE2QixNQUFNLENBQUMsSUFBTSxDQUFDLENBQUM7S0FDL0Q7QUFDTCxDQUFDO0FBTkQsNENBTUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IseUJBQXlCLENBQUMsVUFBc0I7SUFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsa0NBQTBCLENBQUMsRUFBRTtRQUN0RCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUEyQixVQUFVLENBQUMsTUFBTSxFQUFFLHFFQUNNLGtDQUE0QixDQUFDLENBQUM7S0FDckc7SUFFRCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEQsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBbUMsSUFBTSxDQUFDLENBQUM7S0FDOUQ7SUFFRCxJQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLHdCQUF3QixFQUFFLCtCQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFakcsT0FBTztRQUNILElBQUksTUFBQTtRQUNKLE9BQU8sU0FBQTtLQUNWLENBQUM7QUFDTixDQUFDO0FBakJELDhEQWlCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQix1QkFBdUIsQ0FBQyxXQUF3QixFQUFFLE1BQXVCO0lBQ3JGLFdBQVcsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFELFdBQVcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLEVBQUUsK0JBQWMsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZHLENBQUM7QUFIRCwwREFHQyJ9