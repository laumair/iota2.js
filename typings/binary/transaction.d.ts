import { ITransactionEssence } from "../models/ITransactionEssence";
import { ReadStream } from "../utils/readStream";
import { WriteStream } from "../utils/writeStream";
export declare const MIN_TRANSACTION_ESSENCE_LENGTH: number;
/**
 * Deserialize the transaction essence from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTransactionEssence(readStream: ReadStream): ITransactionEssence;
/**
 * Serialize the transaction essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTransactionEssence(writeStream: WriteStream, object: ITransactionEssence): void;
