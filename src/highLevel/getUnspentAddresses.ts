import { IClient } from "../api/models/IClient";
import { Bip32Path } from "../crypto/bip32Path";
import { Ed25519 } from "../crypto/ed25519";
import { ISeed } from "../models/ISeed";

/**
 * Get all the unspent addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param countLimit Limit the number of items to find.
 * @returns All the unspent addresses.
 */
export async function getUnspentAddresses(
    client: IClient,
    seed: ISeed,
    basePath: Bip32Path,
    startIndex?: number,
    countLimit?: number): Promise<{
        address: string;
        index: number;
        balance: number;
    }[]> {
    let localStartIndex = startIndex ?? 0;
    const localCountLimit = countLimit ?? Number.MAX_SAFE_INTEGER;
    let finished = false;
    const allUnspent: {
        address: string;
        index: number;
        balance: number;
    }[] = [];

    do {
        basePath.push(localStartIndex);
        const addressKeyPair = seed.generateSeedFromPath(basePath).keyPair();
        basePath.pop();

        const addr = Ed25519.publicKeyToAddress(addressKeyPair.publicKey);
        const addressResponse = await client.address(addr);

        // If there are no outputs for the address we have reached the
        // end of the used addresses
        if (addressResponse.count === 0) {
            finished = true;
        } else {
            allUnspent.push({
                address: addr,
                index: localStartIndex,
                balance: addressResponse.balance
            });

            if (allUnspent.length === localCountLimit) {
                finished = true;
            }
        }

        localStartIndex++;
    } while (!finished);

    return allUnspent;
}
