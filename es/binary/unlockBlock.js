"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeReferenceUnlockBlock = exports.deserializeReferenceUnlockBlock = exports.serializeSignatureUnlockBlock = exports.deserializeSignatureUnlockBlock = exports.serializeUnlockBlock = exports.deserializeUnlockBlock = exports.serializeUnlockBlocks = exports.deserializeUnlockBlocks = exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH = void 0;
const common_1 = require("./common");
const signature_1 = require("./signature");
exports.MIN_UNLOCK_BLOCK_LENGTH = common_1.SMALL_TYPE_LENGTH;
exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH + signature_1.MIN_SIGNATURE_LENGTH;
exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH + common_1.UINT16_SIZE;
/**
 * Deserialize the unlock blocks from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeUnlockBlocks(readBuffer) {
    const numUnlockBlocks = readBuffer.readUInt16("transactionEssence.numUnlockBlocks");
    const unlockBlocks = [];
    for (let i = 0; i < numUnlockBlocks; i++) {
        unlockBlocks.push(deserializeUnlockBlock(readBuffer));
    }
    return unlockBlocks;
}
exports.deserializeUnlockBlocks = deserializeUnlockBlocks;
/**
 * Serialize the unlock blocks to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param objects The objects to serialize.
 */
function serializeUnlockBlocks(writeBuffer, objects) {
    writeBuffer.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);
    for (let i = 0; i < objects.length; i++) {
        serializeUnlockBlock(writeBuffer, objects[i]);
    }
}
exports.serializeUnlockBlocks = serializeUnlockBlocks;
/**
 * Deserialize the unlock block from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeUnlockBlock(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Unlock Block data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readBuffer.readByte("unlockBlock.type", false);
    let unlockBlock;
    if (type === 0) {
        unlockBlock = deserializeSignatureUnlockBlock(readBuffer);
    }
    else if (type === 1) {
        unlockBlock = deserializeReferenceUnlockBlock(readBuffer);
    }
    else {
        throw new Error(`Unrecognized unlock block type ${type}`);
    }
    return unlockBlock;
}
exports.deserializeUnlockBlock = deserializeUnlockBlock;
/**
 * Serialize the unlock block to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeUnlockBlock(writeBuffer, object) {
    if (object.type === 0) {
        serializeSignatureUnlockBlock(writeBuffer, object);
    }
    else if (object.type === 1) {
        serializeReferenceUnlockBlock(writeBuffer, object);
    }
    else {
        throw new Error(`Unrecognized unlock block type ${object.type}`);
    }
}
exports.serializeUnlockBlock = serializeUnlockBlock;
/**
 * Deserialize the signature unlock block from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeSignatureUnlockBlock(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Signature Unlock Block data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readBuffer.readByte("signatureUnlockBlock.type");
    if (type !== 0) {
        throw new Error(`Type mismatch in signatureUnlockBlock ${type}`);
    }
    const signature = signature_1.deserializeSignature(readBuffer);
    return {
        type,
        signature
    };
}
exports.deserializeSignatureUnlockBlock = deserializeSignatureUnlockBlock;
/**
 * Serialize the signature unlock block to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeSignatureUnlockBlock(writeBuffer, object) {
    writeBuffer.writeByte("signatureUnlockBlock.type", object.type);
    signature_1.serializeSignature(writeBuffer, object.signature);
}
exports.serializeSignatureUnlockBlock = serializeSignatureUnlockBlock;
/**
 * Deserialize the reference unlock block from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeReferenceUnlockBlock(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Reference Unlock Block data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readBuffer.readByte("referenceUnlockBlock.type");
    if (type !== 1) {
        throw new Error(`Type mismatch in referenceUnlockBlock ${type}`);
    }
    const reference = readBuffer.readUInt16("referenceUnlockBlock.reference");
    return {
        type,
        reference
    };
}
exports.deserializeReferenceUnlockBlock = deserializeReferenceUnlockBlock;
/**
 * Serialize the reference unlock block to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeReferenceUnlockBlock(writeBuffer, object) {
    writeBuffer.writeByte("referenceUnlockBlock.type", object.type);
    writeBuffer.writeUInt16("referenceUnlockBlock.reference", object.reference);
}
exports.serializeReferenceUnlockBlock = serializeReferenceUnlockBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3VubG9ja0Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHFDQUEwRDtBQUMxRCwyQ0FBNkY7QUFFaEYsUUFBQSx1QkFBdUIsR0FBVywwQkFBaUIsQ0FBQztBQUNwRCxRQUFBLGlDQUFpQyxHQUMxQywrQkFBdUIsR0FBRyxnQ0FBb0IsQ0FBQztBQUN0QyxRQUFBLGlDQUFpQyxHQUFXLCtCQUF1QixHQUFHLG9CQUFXLENBQUM7QUFFL0Y7Ozs7R0FJRztBQUNILFNBQWdCLHVCQUF1QixDQUFDLFVBQXNCO0lBQzFELE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUNwRixNQUFNLFlBQVksR0FBc0QsRUFBRSxDQUFDO0lBQzNFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsWUFBWSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQ3pEO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQVBELDBEQU9DO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLHFCQUFxQixDQUFDLFdBQXdCLEVBQzFELE9BQTBEO0lBQzFELFdBQVcsQ0FBQyxXQUFXLENBQUMsb0NBQW9DLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTlFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqRDtBQUNMLENBQUM7QUFQRCxzREFPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixzQkFB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