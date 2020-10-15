import { IClient } from "../api/models/IClient";
import { IIndexationPayload } from "../models/IIndexationPayload";

/**
 * Retrieve a data message.
 * @param client The client to send the transfer with.
 * @param messageId The message id of the data to get.
 * @returns The message index and data.
 */
export async function retrieveData(client: IClient, messageId: string): Promise<{
    index: string;
    data: Buffer;
} | undefined> {
    const message = await client.message(messageId);

    if (message?.payload) {
        let indexationPayload: IIndexationPayload | undefined;

        if (message.payload.type === 0) {
            indexationPayload = message.payload.essence.payload;
        } else if (message.payload.type === 2) {
            indexationPayload = message.payload;
        }

        if (indexationPayload) {
            return {
                index: indexationPayload.index,
                data: Buffer.from(indexationPayload.data, "hex")
            };
        }
    }
}
