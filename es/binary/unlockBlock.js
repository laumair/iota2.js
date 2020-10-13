"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeReferenceUnlockBlock = exports.deserializeReferenceUnlockBlock = exports.serializeSignatureUnlockBlock = exports.deserializeSignatureUnlockBlock = exports.serializeUnlockBlock = exports.deserializeUnlockBlock = exports.serializeUnlockBlocks = exports.deserializeUnlockBlocks = exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH = void 0;
const common_1 = require("./common");
const signature_1 = require("./signature");
exports.MIN_UNLOCK_BLOCK_LENGTH = common_1.BYTE_SIZE;
exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = signature_1.MIN_SIGNATURE_LENGTH + signature_1.MIN_ED25519_SIGNATURE_LENGTH;
exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = common_1.UINT16_SIZE;
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
    const type = readBuffer.readByte("unlockBlock.type");
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
    writeBuffer.writeByte("unlockBlock.type", object.type);
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
    const signature = signature_1.deserializeSignature(readBuffer);
    return {
        type: 0,
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
    const reference = readBuffer.readUInt16("referenceUnlockBlock.reference");
    return {
        type: 1,
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
    writeBuffer.writeUInt16("referenceUnlockBlock.reference", object.reference);
}
exports.serializeReferenceUnlockBlock = serializeReferenceUnlockBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3VubG9ja0Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHFDQUFrRDtBQUNsRCwyQ0FBMkg7QUFFOUcsUUFBQSx1QkFBdUIsR0FBVyxrQkFBUyxDQUFDO0FBQzVDLFFBQUEsaUNBQWlDLEdBQVcsZ0NBQW9CLEdBQUcsd0NBQTRCLENBQUM7QUFDaEcsUUFBQSxpQ0FBaUMsR0FBVyxvQkFBVyxDQUFDO0FBRXJFOzs7O0dBSUc7QUFDSCxTQUFnQix1QkFBdUIsQ0FBQyxVQUFzQjtJQUMxRCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDcEYsTUFBTSxZQUFZLEdBQXNELEVBQUUsQ0FBQztJQUMzRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUN6RDtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFQRCwwREFPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixxQkFBcUIsQ0FBQyxXQUF3QixFQUMxRCxPQUEwRDtJQUMxRCxXQUFXLENBQUMsV0FBVyxDQUFDLG9DQUFvQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU5RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakQ7QUFDTCxDQUFDO0FBUEQsc0RBT0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isc0JBQXNCLENBQUMsVUFBc0I7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