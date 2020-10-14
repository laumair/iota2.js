import { Client } from "../api/client";
import { IIndexationPayload } from "../models/IIndexationPayload";
import { IMessage } from "../models/IMessage";

/**
 * Send a data transfer.
 * @param client The client to send the transfer with.
 * @param index The index name.
 * @param data The index data.
 * @returns The id of the message created.
 */
export async function sendData(client: Client, index: string, data: string): Promise<string> {
    const indexationPayload: IIndexationPayload = {
        type: 2,
        index,
        data
    };

    const tips = await client.tips();

    const message: IMessage = {
        version: 1,
        parent1MessageId: tips.tip1MessageId,
        parent2MessageId: tips.tip2MessageId,
        payload: indexationPayload,
        nonce: 0
    };

    return client.messageSubmit(message);
}
