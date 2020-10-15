import { IClient } from "../api/models/IClient";
import { Bip32Path } from "../crypto/bip32Path";
import { ISeed } from "../models/ISeed";
/**
 * Get all the unspent addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @returns All the unspent addresses.
 */
export declare function getAllUnspentAddresses(client: IClient, seed: ISeed, basePath: Bip32Path, startIndex?: number): Promise<{
    address: string;
    index: number;
    amount: number;
}[]>;
