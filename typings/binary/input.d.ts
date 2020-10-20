import { IUTXOInput } from "../models/IUTXOInput";
import { ReadStream } from "../utils/readStream";
import { WriteStream } from "../utils/writeStream";
export declare const MIN_INPUT_LENGTH: number;
export declare const MIN_UTXO_INPUT_LENGTH: number;
/**
 * Deserialize the inputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeInputs(readStream: ReadStream): IUTXOInput[];
/**
 * Serialize the inputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeInputs(writeStream: WriteStream, objects: IUTXOInput[]): void;
/**
 * Deserialize the input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeInput(readStream: ReadStream): IUTXOInput;
/**
 * Serialize the input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeInput(writeStream: WriteStream, object: IUTXOInput): void;
/**
 * Deserialize the utxo input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeUTXOInput(readStream: ReadStream): IUTXOInput;
/**
 * Serialize the utxo input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeUTXOInput(writeStream: WriteStream, object: IUTXOInput): void;
