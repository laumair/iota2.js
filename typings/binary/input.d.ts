import { IUTXOInput } from "../models/IUTXOInput";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
export declare const MIN_INPUT_LENGTH: number;
export declare const MIN_UTXO_INPUT_LENGTH: number;
/**
 * Deserialize the inputs from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeInputs(readBuffer: ReadBuffer): IUTXOInput[];
/**
 * Serialize the inputs to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeInputs(writeBuffer: WriteBuffer, objects: IUTXOInput[]): void;
/**
 * Deserialize the input from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeInput(readBuffer: ReadBuffer): IUTXOInput;
/**
 * Serialize the input to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeInput(writeBuffer: WriteBuffer, object: IUTXOInput): void;
/**
 * Deserialize the utxo input from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeUTXOInput(readBuffer: ReadBuffer): IUTXOInput;
/**
 * Serialize the utxo input to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeUTXOInput(writeBuffer: WriteBuffer, object: IUTXOInput): void;
