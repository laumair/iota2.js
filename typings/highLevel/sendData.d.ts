/// <reference types="node" />
import { IClient } from "../api/models/IClient";
import { IMessage } from "../models/IMessage";
/**
 * Send a data message.
 * @param client The client to send the transfer with.
 * @param indexationKey The index name.
 * @param indexationData The index data.
 * @returns The id of the message created and the message.
 */
export declare function sendData(client: IClient, indexationKey: string, indexationData: Buffer): Promise<{
    message: IMessage;
    messageId: string;
}>;
