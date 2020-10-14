import { Client } from "../api/client";
import { ISeed } from "../models/ISeed";
import { ISignatureKeyPair } from "../models/ISignatureKeyPair";
/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param outputs The outputs to send.
 * @param index Optional index name.
 * @param data Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
export declare function sendTransfer(client: Client, seed: ISeed, outputs: {
    address: string;
    amount: number;
}[], index?: string, data?: string): Promise<{
    messageId: string;
    remainderAddress?: string;
}>;
/**
 * Generate a list of address key pairs.
 * @param seed The seed.
 * @param startIndex The start index to generate from.
 * @param count The number of address seeds
 * @returns A list of the signature key pairs for the addresses.
 */
export declare function generateAddressKeyPairs(seed: ISeed, startIndex: number, count: number): ISignatureKeyPair[];
