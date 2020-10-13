import { IEd25519Address } from "../models/IEd25519Address";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
export declare const MIN_ADDRESS_LENGTH: number;
export declare const MIN_ED25519_ADDRESS_LENGTH: number;
/**
 * Deserialize the address from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeAddress(readBuffer: ReadBuffer): IEd25519Address;
/**
 * Serialize the address to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeAddress(writeBuffer: WriteBuffer, object: IEd25519Address): void;
/**
 * Deserialize the Ed25519 address from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeEd25519Address(readBuffer: ReadBuffer): IEd25519Address;
/**
 * Serialize the ed25519 address to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeEd25519Address(writeBuffer: WriteBuffer, object: IEd25519Address): void;
