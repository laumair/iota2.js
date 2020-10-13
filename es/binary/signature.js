"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeEd25519Signature = exports.deserializeEd25519Signature = exports.serializeSignature = exports.deserializeSignature = exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH = void 0;
const ed25519_1 = require("../crypto/ed25519");
const common_1 = require("./common");
exports.MIN_SIGNATURE_LENGTH = common_1.BYTE_SIZE;
exports.MIN_ED25519_SIGNATURE_LENGTH = ed25519_1.Ed25519.SIGNATURE_SIZE + ed25519_1.Ed25519.PUBLIC_KEY_SIZE;
/**
 * Deserialize the signature from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeSignature(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_SIGNATURE_LENGTH)) {
        throw new Error(`Signature data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_SIGNATURE_LENGTH}`);
    }
    const type = readBuffer.readByte("signature.type");
    let input;
    if (type === 1) {
        input = deserializeEd25519Signature(readBuffer);
    }
    else {
        throw new Error(`Unrecognized signature type ${type}`);
    }
    return input;
}
exports.deserializeSignature = deserializeSignature;
/**
 * Serialize the signature to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeSignature(writeBuffer, object) {
    writeBuffer.writeByte("signature.type", object.type);
    if (object.type === 1) {
        serializeEd25519Signature(writeBuffer, object);
    }
    else {
        throw new Error(`Unrecognized signature type ${object.type}`);
    }
}
exports.serializeSignature = serializeSignature;
/**
 * Deserialize the Ed25519 signature from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeEd25519Signature(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_ED25519_SIGNATURE_LENGTH)) {
        throw new Error(`Ed25519 signature data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_ED25519_SIGNATURE_LENGTH}`);
    }
    const publicKey = readBuffer.readFixedBufferHex("ed25519Signature.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE);
    const signature = readBuffer.readFixedBufferHex("ed25519Signature.signature", ed25519_1.Ed25519.SIGNATURE_SIZE);
    return {
        type: 1,
        publicKey,
        signature
    };
}
exports.deserializeEd25519Signature = deserializeEd25519Signature;
/**
 * Serialize the Ed25519 signature to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeEd25519Signature(writeBuffer, object) {
    writeBuffer.writeFixedBufferHex("ed25519Signature.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
    writeBuffer.writeFixedBufferHex("ed25519Signature.signature", ed25519_1.Ed25519.SIGNATURE_SIZE, object.signature);
}
exports.serializeEd25519Signature = serializeEd25519Signature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9zaWduYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQTRDO0FBSTVDLHFDQUFxQztBQUV4QixRQUFBLG9CQUFvQixHQUFXLGtCQUFTLENBQUM7QUFDekMsUUFBQSw0QkFBNEIsR0FBVyxpQkFBTyxDQUFDLGNBQWMsR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQztBQUVyRzs7OztHQUlHO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsVUFBc0I7SUFDdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsNEJBQW9CLENBQUMsRUFBRTtRQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixVQUFVLENBQUMsTUFBTSxFQUNsRCxnRUFBZ0UsNEJBQW9CLEVBQUUsQ0FBQyxDQUFDO0tBQy9GO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ25ELElBQUksS0FBSyxDQUFDO0lBRVYsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ1osS0FBSyxHQUFHLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ25EO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzFEO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQWhCRCxvREFnQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsV0FBd0IsRUFDdkQsTUFBeUI7SUFDekIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFckQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNuQix5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2pFO0FBQ0wsQ0FBQztBQVRELGdEQVNDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLDJCQUEyQixDQUFDLFVBQXNCO0lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG9DQUE0QixDQUFDLEVBQUU7UUFDeEQsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsVUFBVSxDQUFDLE1BQU0sRUFDMUQsZ0VBQWdFLG9DQUE0QixFQUFFLENBQUMsQ0FBQztLQUN2RztJQUVELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsRUFBRSxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZHLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsRUFBRSxpQkFBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXRHLE9BQU87UUFDSCxJQUFJLEVBQUUsQ0FBQztRQUNQLFNBQVM7UUFDVCxTQUFTO0tBQ1osQ0FBQztBQUNOLENBQUM7QUFkRCxrRUFjQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQix5QkFBeUIsQ0FBQyxXQUF3QixFQUM5RCxNQUF5QjtJQUN6QixXQUFXLENBQUMsbUJBQW1CLENBQUMsNEJBQTRCLEVBQUUsaUJBQU8sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pHLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyw0QkFBNEIsRUFBRSxpQkFBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUcsQ0FBQztBQUpELDhEQUlDIn0=