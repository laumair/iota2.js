import { IClient } from "../api/models/IClient";
import { Bip32Path } from "../crypto/bip32Path";
import { IMessage } from "../models/IMessage";
import { ISeed } from "../models/ISeed";
import { sendAdvanced } from "./sendAdvanced";

/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param address The address to send the funds to.
 * @param amount The amount to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export async function send(
    client: IClient,
    seed: ISeed,
    basePath: Bip32Path,
    address: string,
    amount: number,
    startIndex?: number): Promise<{
        messageId: string;
        message: IMessage;
    }> {
    const response = await sendAdvanced(
        client,
        seed,
        basePath,
        [{ address, amount }], startIndex);

    return {
        messageId: response.messageId,
        message: response.message
    };
}
