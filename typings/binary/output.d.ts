import { ISigLockedSingleOutput } from "../models/ISigLockedSingleOutput";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
export declare const MIN_OUTPUT_LENGTH: number;
export declare const MIN_SIG_LOCKED_OUTPUT_LENGTH: number;
/**
 * Deserialize the outputs from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeOutputs(readBuffer: ReadBuffer): ISigLockedSingleOutput[];
/**
 * Serialize the outputs to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeOutputs(writeBuffer: WriteBuffer, objects: ISigLockedSingleOutput[]): void;
/**
 * Deserialize the output from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeOutput(readBuffer: ReadBuffer): ISigLockedSingleOutput;
/**
 * Serialize the output to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeOutput(writeBuffer: WriteBuffer, object: ISigLockedSingleOutput): void;
/**
 * Deserialize the signature locked single output from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSigLockedSingleOutput(readBuffer: ReadBuffer): ISigLockedSingleOutput;
/**
 * Serialize the signature locked single output to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSigLockedSingleOutput(writeBuffer: WriteBuffer, object: ISigLockedSingleOutput): void;
