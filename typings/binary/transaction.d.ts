import { ITransactionEssence } from "../models/ITransactionEssence";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
export declare const MIN_TRANSACTION_ESSENCE_LENGTH: number;
/**
 * Deserialize the transaction essence from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTransactionEssence(readBuffer: ReadBuffer): ITransactionEssence;
/**
 * Serialize the transaction essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTransactionEssence(writeBuffer: WriteBuffer, object: ITransactionEssence): void;
