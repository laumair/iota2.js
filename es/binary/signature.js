"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeEd25519Signature = exports.deserializeEd25519Signature = exports.serializeSignature = exports.deserializeSignature = exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH = void 0;
const ed25519_1 = require("../crypto/ed25519");
const common_1 = require("./common");
exports.MIN_SIGNATURE_LENGTH = common_1.SMALL_TYPE_LENGTH;
exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH + ed25519_1.Ed25519.SIGNATURE_SIZE + ed25519_1.Ed25519.PUBLIC_KEY_SIZE;
/**
 * Deserialize the signature from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeSignature(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_SIGNATURE_LENGTH)) {
        throw new Error(`Signature data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_SIGNATURE_LENGTH}`);
    }
    const type = readBuffer.readByte("signature.type", false);
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
    const type = readBuffer.readByte("ed25519Signature.type");
    if (type !== 1) {
        throw new Error(`Type mismatch in ed25519Signature ${type}`);
    }
    const publicKey = readBuffer.readFixedBufferHex("ed25519Signature.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE);
    const signature = readBuffer.readFixedBufferHex("ed25519Signature.signature", ed25519_1.Ed25519.SIGNATURE_SIZE);
    return {
        type,
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
    writeBuffer.writeByte("ed25519Signature.type", object.type);
    writeBuffer.writeFixedBufferHex("ed25519Signature.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
    writeBuffer.writeFixedBufferHex("ed25519Signature.signature", ed25519_1.Ed25519.SIGNATURE_SIZE, object.signature);
}
exports.serializeEd25519Signature = serializeEd25519Signature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9zaWduYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQTRDO0FBSTVDLHFDQUE2QztBQUVoQyxRQUFBLG9CQUFvQixHQUFXLDBCQUFpQixDQUFDO0FBQ2pELFFBQUEsNEJBQTRCLEdBQ3JDLDRCQUFvQixHQUFHLGlCQUFPLENBQUMsY0FBYyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDO0FBRTVFOzs7O0dBSUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxVQUFzQjtJQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBb0IsQ0FBQyxFQUFFO1FBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLFVBQVUsQ0FBQyxNQUFNLEVBQ2xELGdFQUFnRSw0QkFBb0IsRUFBRSxDQUFDLENBQUM7S0FDL0Y7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFELElBQUksS0FBSyxDQUFDO0lBRVYsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ1osS0FBSyxHQUFHLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ25EO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzFEO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQWhCRCxvREFnQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsV0FBd0IsRUFDdkQsTUFBeUI7SUFDekIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNuQix5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2pFO0FBQ0wsQ0FBQztBQVBELGdEQU9DO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLDJCQUEyQixDQUFDLFVBQXNCO0lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG9DQUE0QixDQUFDLEVBQUU7UUFDeEQsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsVUFBVSxDQUFDLE1BQU0sRUFDMUQsZ0VBQWdFLG9DQUE0QixFQUFFLENBQUMsQ0FBQztLQUN2RztJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMxRCxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2hFO0lBRUQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixDQUFDLDRCQUE0QixFQUFFLGlCQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkcsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixDQUFDLDRCQUE0QixFQUFFLGlCQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFdEcsT0FBTztRQUNILElBQUk7UUFDSixTQUFTO1FBQ1QsU0FBUztLQUNaLENBQUM7QUFDTixDQUFDO0FBbkJELGtFQW1CQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQix5QkFBeUIsQ0FBQyxXQUF3QixFQUM5RCxNQUF5QjtJQUN6QixXQUFXLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxXQUFXLENBQUMsbUJBQW1CLENBQUMsNEJBQTRCLEVBQUUsaUJBQU8sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pHLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyw0QkFBNEIsRUFBRSxpQkFBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUcsQ0FBQztBQUxELDhEQUtDIn0=