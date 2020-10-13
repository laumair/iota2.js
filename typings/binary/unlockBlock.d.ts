import { IReferenceUnlockBlock } from "../models/IReferenceUnlockBlock";
import { ISignatureUnlockBlock } from "../models/ISignatureUnlockBlock";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
export declare const MIN_UNLOCK_BLOCK_LENGTH: number;
export declare const MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH: number;
export declare const MIN_REFERENCE_UNLOCK_BLOCK_LENGTH: number;
/**
 * Deserialize the unlock blocks from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeUnlockBlocks(readBuffer: ReadBuffer): (IReferenceUnlockBlock | ISignatureUnlockBlock)[];
/**
 * Serialize the unlock blocks to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeUnlockBlocks(writeBuffer: WriteBuffer, objects: (IReferenceUnlockBlock | ISignatureUnlockBlock)[]): void;
/**
 * Deserialize the unlock block from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeUnlockBlock(readBuffer: ReadBuffer): IReferenceUnlockBlock | ISignatureUnlockBlock;
/**
 * Serialize the unlock block to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeUnlockBlock(writeBuffer: WriteBuffer, object: IReferenceUnlockBlock | ISignatureUnlockBlock): void;
/**
 * Deserialize the signature unlock block from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSignatureUnlockBlock(readBuffer: ReadBuffer): ISignatureUnlockBlock;
/**
 * Serialize the signature unlock block to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSignatureUnlockBlock(writeBuffer: WriteBuffer, object: ISignatureUnlockBlock): void;
/**
 * Deserialize the reference unlock block from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeReferenceUnlockBlock(readBuffer: ReadBuffer): IReferenceUnlockBlock;
/**
 * Serialize the reference unlock block to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeReferenceUnlockBlock(writeBuffer: WriteBuffer, object: IReferenceUnlockBlock): void;
