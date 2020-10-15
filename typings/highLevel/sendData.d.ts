/// <reference types="node" />
import { IClient } from "../api/models/IClient";
import { IMessage } from "../models/IMessage";
/**
 * Send a data message.
 * @param client The client to send the transfer with.
 * @param index The index name.
 * @param data The index data.
 * @returns The id of the message created and the message.
 */
export declare function sendData(client: IClient, index: string, data: Buffer): Promise<{
    message: IMessage;
    messageId: string;
}>;
