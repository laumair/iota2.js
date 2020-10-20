import { ISigLockedSingleOutput } from "../models/ISigLockedSingleOutput";
import { ReadStream } from "../utils/readStream";
import { WriteStream } from "../utils/writeStream";
export declare const MIN_OUTPUT_LENGTH: number;
export declare const MIN_SIG_LOCKED_OUTPUT_LENGTH: number;
/**
 * Deserialize the outputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeOutputs(readStream: ReadStream): ISigLockedSingleOutput[];
/**
 * Serialize the outputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeOutputs(writeStream: WriteStream, objects: ISigLockedSingleOutput[]): void;
/**
 * Deserialize the output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeOutput(readStream: ReadStream): ISigLockedSingleOutput;
/**
 * Serialize the output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeOutput(writeStream: WriteStream, object: ISigLockedSingleOutput): void;
/**
 * Deserialize the signature locked single output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSigLockedSingleOutput(readStream: ReadStream): ISigLockedSingleOutput;
/**
 * Serialize the signature locked single output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSigLockedSingleOutput(writeStream: WriteStream, object: ISigLockedSingleOutput): void;
