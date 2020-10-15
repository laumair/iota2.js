import { IClient } from "../api/models/IClient";
import { Bip32Path } from "../crypto/bip32Path";
import { Ed25519 } from "../crypto/ed25519";
import { ISeed } from "../models/ISeed";
import { DEFAULT_CHUNK_SIZE } from "./common";
import { getAddressesKeyPairs } from "./getAddressesKeyPairs";

/**
 * Get all the unspent addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @returns All the unspent addresses.
 */
export async function getAllUnspentAddresses(
    client: IClient,
    seed: ISeed,
    basePath: Bip32Path,
    startIndex?: number): Promise<{
        address: string;
        index: number;
        amount: number;
    }[]> {
    let localStartIndex = startIndex ?? 0;
    let finished = false;
    const allUnspent: {
        address: string;
        index: number;
        amount: number;
    }[] = [];

    do {
        const addresses = getAddressesKeyPairs(seed, basePath, localStartIndex, DEFAULT_CHUNK_SIZE);

        for (let i = 0; i < addresses.length; i++) {
            const addr = Ed25519.publicKeyToAddress(addresses[i].publicKey);
            const addressOutputIds = await client.addressOutputs(addr);

            let amount = 0;

            for (const addressOutputId of addressOutputIds.outputIds) {
                const addressOutput = await client.output(addressOutputId);

                if (!addressOutput.isSpent && addressOutput.output.amount !== 0) {
                    amount += addressOutput.output.amount;
                }
            }

            if (amount === 0) {
                finished = true;
            } else {
                allUnspent.push({
                    address: addr,
                    index: localStartIndex + i,
                    amount
                });
            }
        }

        localStartIndex += DEFAULT_CHUNK_SIZE;
    } while (!finished);

    return allUnspent;
}
