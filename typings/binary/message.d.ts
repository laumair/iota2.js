import { IMessage } from "../models/IMessage";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
/**
 * Deserialize the message from binary.
 * @param readBuffer The message to deserialize.
 * @returns The deserialized message.
 */
export declare function deserializeMessage(readBuffer: ReadBuffer): IMessage;
/**
 * Serialize the message essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeMessage(writeBuffer: WriteBuffer, object: IMessage): void;
