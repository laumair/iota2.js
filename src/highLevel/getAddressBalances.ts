import { IClient } from "../api/models/IClient";

/**
 * Get the balance for a list of addresses.
 * @param client The client to send the transfer with.
 * @param addresses The list of addresses to get the balance for.
 * @returns The balances.
 */
export async function getAddressBalances(
    client: IClient,
    addresses: string[]): Promise<number[]> {
    const balances: number[] = [];

    for (const address of addresses) {
        const addressOutputIds = await client.addressOutputs(address);
        let balance = 0;

        for (const addressOutputId of addressOutputIds.outputIds) {
            const addressOutput = await client.output(addressOutputId);

            if (!addressOutput.isSpent) {
                balance += addressOutput.output.amount;
            }
        }

        balances.push(balance);
    }

    return balances;
}
