import { IReferenceUnlockBlock } from "../models/IReferenceUnlockBlock";
import { ISignatureUnlockBlock } from "../models/ISignatureUnlockBlock";
import { ITypeBase } from "../models/ITypeBase";
import { ReadStream } from "../utils/readStream";
import { WriteStream } from "../utils/writeStream";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "./common";
import { deserializeSignature, MIN_SIGNATURE_LENGTH, serializeSignature } from "./signature";

export const MIN_UNLOCK_BLOCK_LENGTH: number = SMALL_TYPE_LENGTH;
export const MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH: number =
    MIN_UNLOCK_BLOCK_LENGTH + MIN_SIGNATURE_LENGTH;
export const MIN_REFERENCE_UNLOCK_BLOCK_LENGTH: number = MIN_UNLOCK_BLOCK_LENGTH + UINT16_SIZE;

/**
 * Deserialize the unlock blocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockBlocks(readStream: ReadStream): (IReferenceUnlockBlock | ISignatureUnlockBlock)[] {
    const numUnlockBlocks = readStream.readUInt16("transactionEssence.numUnlockBlocks");
    const unlockBlocks: (IReferenceUnlockBlock | ISignatureUnlockBlock)[] = [];
    for (let i = 0; i < numUnlockBlocks; i++) {
        unlockBlocks.push(deserializeUnlockBlock(readStream));
    }
    return unlockBlocks;
}

/**
 * Serialize the unlock blocks to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeUnlockBlocks(writeStream: WriteStream,
    objects: (IReferenceUnlockBlock | ISignatureUnlockBlock)[]): void {
    writeStream.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeUnlockBlock(writeStream, objects[i]);
    }
}

/**
 * Deserialize the unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockBlock(readStream: ReadStream): IReferenceUnlockBlock | ISignatureUnlockBlock {
    if (!readStream.hasRemaining(MIN_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Unlock Block data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_UNLOCK_BLOCK_LENGTH}`);
    }

    const type = readStream.readByte("unlockBlock.type", false);
    let unlockBlock;

    if (type === 0) {
        unlockBlock = deserializeSignatureUnlockBlock(readStream);
    } else if (type === 1) {
        unlockBlock = deserializeReferenceUnlockBlock(readStream);
    } else {
        throw new Error(`Unrecognized unlock block type ${type}`);
    }

    return unlockBlock;
}

/**
 * Serialize the unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeUnlockBlock(writeStream: WriteStream,
    object: IReferenceUnlockBlock | ISignatureUnlockBlock): void {
    if (object.type === 0) {
        serializeSignatureUnlockBlock(writeStream, object);
    } else if (object.type === 1) {
        serializeReferenceUnlockBlock(writeStream, object);
    } else {
        throw new Error(`Unrecognized unlock block type ${(object as ITypeBase<unknown>).type}`);
    }
}

/**
 * Deserialize the signature unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSignatureUnlockBlock(readStream: ReadStream): ISignatureUnlockBlock {
    if (!readStream.hasRemaining(MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Signature Unlock Block data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH}`);
    }

    const type = readStream.readByte("signatureUnlockBlock.type");
    if (type !== 0) {
        throw new Error(`Type mismatch in signatureUnlockBlock ${type}`);
    }

    const signature = deserializeSignature(readStream);

    return {
        type,
        signature
    };
}

/**
 * Serialize the signature unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSignatureUnlockBlock(writeStream: WriteStream,
    object: ISignatureUnlockBlock): void {
    writeStream.writeByte("signatureUnlockBlock.type", object.type);
    serializeSignature(writeStream, object.signature);
}

/**
 * Deserialize the reference unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeReferenceUnlockBlock(readStream: ReadStream): IReferenceUnlockBlock {
    if (!readStream.hasRemaining(MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Reference Unlock Block data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_REFERENCE_UNLOCK_BLOCK_LENGTH}`);
    }

    const type = readStream.readByte("referenceUnlockBlock.type");
    if (type !== 1) {
        throw new Error(`Type mismatch in referenceUnlockBlock ${type}`);
    }

    const reference = readStream.readUInt16("referenceUnlockBlock.reference");

    return {
        type,
        reference
    };
}

/**
 * Serialize the reference unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeReferenceUnlockBlock(writeStream: WriteStream,
    object: IReferenceUnlockBlock): void {
    writeStream.writeByte("referenceUnlockBlock.type", object.type);
    writeStream.writeUInt16("referenceUnlockBlock.reference", object.reference);
}
