import { Client } from "../api/client";
/**
 * Send a data transfer.
 * @param client The client to send the transfer with.
 * @param index The index name.
 * @param data The index data.
 * @returns The id of the message created.
 */
export declare function sendData(client: Client, index: string, data: string): Promise<string>;
