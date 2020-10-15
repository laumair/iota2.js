import { IClient } from "../api/models/IClient";
/**
 * Get the balance for a list of addresses.
 * @param client The client to send the transfer with.
 * @param addresses The list of addresses to get the balance for.
 * @returns The balances.
 */
export declare function getAddressBalances(client: IClient, addresses: string[]): Promise<number[]>;
