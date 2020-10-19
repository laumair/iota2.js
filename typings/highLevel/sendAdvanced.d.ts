/// <reference types="node" />
import { IClient } from "../api/models/IClient";
import { Bip32Path } from "../crypto/bip32Path";
import { IMessage } from "../models/IMessage";
import { ISeed } from "../models/ISeed";
/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param outputs The outputs to send.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param indexationKey Optional indexation key.
 * @param indexationData Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
export declare function sendAdvanced(client: IClient, seed: ISeed, basePath: Bip32Path, outputs: {
    address: string;
    amount: number;
}[], startIndex?: number, indexationKey?: string, indexationData?: Buffer): Promise<{
    messageId: string;
    message: IMessage;
}>;
