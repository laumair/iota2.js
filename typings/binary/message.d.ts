import { IMessage } from "../models/IMessage";
import { ReadStream } from "../utils/readStream";
import { WriteStream } from "../utils/writeStream";
/**
 * Deserialize the message from binary.
 * @param readStream The message to deserialize.
 * @returns The deserialized message.
 */
export declare function deserializeMessage(readStream: ReadStream): IMessage;
/**
 * Serialize the message essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeMessage(writeStream: WriteStream, object: IMessage): void;
