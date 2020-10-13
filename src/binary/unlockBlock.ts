import { IReferenceUnlockBlock } from "../models/IReferenceUnlockBlock";
import { ISignatureUnlockBlock } from "../models/ISignatureUnlockBlock";
import { ITypeBase } from "../models/ITypeBase";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
import { BYTE_SIZE, UINT16_SIZE } from "./common";
import { deserializeSignature, MIN_ED25519_SIGNATURE_LENGTH, MIN_SIGNATURE_LENGTH, serializeSignature } from "./signature";

export const MIN_UNLOCK_BLOCK_LENGTH: number = BYTE_SIZE;
export const MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH: number = MIN_SIGNATURE_LENGTH + MIN_ED25519_SIGNATURE_LENGTH;
export const MIN_REFERENCE_UNLOCK_BLOCK_LENGTH: number = UINT16_SIZE;

/**
 * Deserialize the unlock blocks from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockBlocks(readBuffer: ReadBuffer): (IReferenceUnlockBlock | ISignatureUnlockBlock)[] {
    const numUnlockBlocks = readBuffer.readUInt16("transactionEssence.numUnlockBlocks");
    const unlockBlocks: (IReferenceUnlockBlock | ISignatureUnlockBlock)[] = [];
    for (let i = 0; i < numUnlockBlocks; i++) {
        unlockBlocks.push(deserializeUnlockBlock(readBuffer));
    }
    return unlockBlocks;
}

/**
 * Serialize the unlock blocks to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeUnlockBlocks(writeBuffer: WriteBuffer,
    objects: (IReferenceUnlockBlock | ISignatureUnlockBlock)[]): void {
    writeBuffer.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeUnlockBlock(writeBuffer, objects[i]);
    }
}

/**
 * Deserialize the unlock block from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockBlock(readBuffer: ReadBuffer): IReferenceUnlockBlock | ISignatureUnlockBlock {
    if (!readBuffer.hasRemaining(MIN_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Unlock Block data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_UNLOCK_BLOCK_LENGTH}`);
    }

    const type = readBuffer.readByte("unlockBlock.type");
    let unlockBlock;

    if (type === 0) {
        unlockBlock = deserializeSignatureUnlockBlock(readBuffer);
    } else if (type === 1) {
        unlockBlock = deserializeReferenceUnlockBlock(readBuffer);
    } else {
        throw new Error(`Unrecognized unlock block type ${type}`);
    }

    return unlockBlock;
}

/**
 * Serialize the unlock block to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeUnlockBlock(writeBuffer: WriteBuffer,
    object: IReferenceUnlockBlock | ISignatureUnlockBlock): void {
    writeBuffer.writeByte("unlockBlock.type", object.type);

    if (object.type === 0) {
        serializeSignatureUnlockBlock(writeBuffer, object);
    } else if (object.type === 1) {
        serializeReferenceUnlockBlock(writeBuffer, object);
    } else {
        throw new Error(`Unrecognized unlock block type ${(object as ITypeBase<unknown>).type}`);
    }
}

/**
 * Deserialize the signature unlock block from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSignatureUnlockBlock(readBuffer: ReadBuffer): ISignatureUnlockBlock {
    if (!readBuffer.hasRemaining(MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Signature Unlock Block data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH}`);
    }

    const signature = deserializeSignature(readBuffer);

    return {
        type: 0,
        signature
    };
}

/**
 * Serialize the signature unlock block to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeSignatureUnlockBlock(writeBuffer: WriteBuffer,
    object: ISignatureUnlockBlock): void {
    serializeSignature(writeBuffer, object.signature);
}

/**
 * Deserialize the reference unlock block from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeReferenceUnlockBlock(readBuffer: ReadBuffer): IReferenceUnlockBlock {
    if (!readBuffer.hasRemaining(MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Reference Unlock Block data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_REFERENCE_UNLOCK_BLOCK_LENGTH}`);
    }

    const reference = readBuffer.readUInt16("referenceUnlockBlock.reference");

    return {
        type: 1,
        reference
    };
}

/**
 * Serialize the reference unlock block to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeReferenceUnlockBlock(writeBuffer: WriteBuffer,
    object: IReferenceUnlockBlock): void {
    writeBuffer.writeUInt16("referenceUnlockBlock.reference", object.reference);
}