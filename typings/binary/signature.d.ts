import { IEd25519Signature } from "../models/IEd25519Signature";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
export declare const MIN_SIGNATURE_LENGTH: number;
export declare const MIN_ED25519_SIGNATURE_LENGTH: number;
/**
 * Deserialize the signature from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSignature(readBuffer: ReadBuffer): IEd25519Signature;
/**
 * Serialize the signature to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSignature(writeBuffer: WriteBuffer, object: IEd25519Signature): void;
/**
 * Deserialize the Ed25519 signature from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeEd25519Signature(readBuffer: ReadBuffer): IEd25519Signature;
/**
 * Serialize the Ed25519 signature to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeEd25519Signature(writeBuffer: WriteBuffer, object: IEd25519Signature): void;
