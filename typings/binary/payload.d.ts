import { IIndexationPayload } from "../models/IIndexationPayload";
import { IMilestonePayload } from "../models/IMilestonePayload";
import { ITransactionPayload } from "../models/ITransactionPayload";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
export declare const MIN_PAYLOAD_LENGTH: number;
export declare const MIN_MILESTONE_PAYLOAD_LENGTH: number;
export declare const MIN_INDEXATION_PAYLOAD_LENGTH: number;
export declare const MIN_TRANSACTION_PAYLOAD_LENGTH: number;
/**
 * Deserialize the payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializePayload(readBuffer: ReadBuffer): IIndexationPayload | IMilestonePayload | ITransactionPayload | undefined;
/**
 * Serialize the payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializePayload(writeBuffer: WriteBuffer, object: IIndexationPayload | IMilestonePayload | ITransactionPayload | undefined): void;
/**
 * Deserialize the transaction payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTransactionPayload(readBuffer: ReadBuffer): ITransactionPayload;
/**
 * Serialize the transaction payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTransactionPayload(writeBuffer: WriteBuffer, object: ITransactionPayload): void;
/**
 * Deserialize the milestone payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeMilestonePayload(readBuffer: ReadBuffer): IMilestonePayload;
/**
 * Serialize the milestone payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeMilestonePayload(writeBuffer: WriteBuffer, object: IMilestonePayload): void;
/**
 * Deserialize the indexation payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeIndexationPayload(readBuffer: ReadBuffer): IIndexationPayload;
/**
 * Serialize the indexation payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeIndexationPayload(writeBuffer: WriteBuffer, object: IIndexationPayload): void;
