import { IClient } from "../api/models/IClient";
import { Bip32Path } from "../crypto/bip32Path";
import { Ed25519 } from "../crypto/ed25519";
import { ISeed } from "../models/ISeed";
import { DEFAULT_CHUNK_SIZE } from "./common";
import { getAddressesKeyPairs } from "./getAddressesKeyPairs";

/**
 * Get the first unspent address.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @returns The first unspent address.
 */
export async function getUnspentAddress(
    client: IClient,
    seed: ISeed,
    basePath: Bip32Path,
    startIndex?: number): Promise<{
        address: string;
        index: number;
        amount: number;
    } | undefined> {
    let localStartIndex = startIndex ?? 0;
    let finished = false;
    let unspentAddress: string | undefined;
    let unspentAddressIndex: number | undefined;
    let unspentAmount = 0;

    do {
        const addresses = getAddressesKeyPairs(seed, basePath, localStartIndex, DEFAULT_CHUNK_SIZE);

        for (let i = 0; i < addresses.length; i++) {
            const addr = Ed25519.publicKeyToAddress(addresses[i].publicKey);
            const addressOutputIds = await client.addressOutputs(addr);

            if (addressOutputIds.outputIds.length === 0) {
                finished = true;
            } else {
                for (const addressOutputId of addressOutputIds.outputIds) {
                    const addressOutput = await client.output(addressOutputId);

                    if (addressOutput.output.amount === 0) {
                        finished = true;
                    } else if (!addressOutput.isSpent) {
                        unspentAddress = addr;
                        unspentAddressIndex = localStartIndex + i;
                        unspentAmount += addressOutput.output.amount;
                    }
                }
            }

            if (unspentAddress) {
                finished = true;
            }
        }

        localStartIndex += DEFAULT_CHUNK_SIZE;
    } while (!finished);

    return unspentAddress && unspentAddressIndex !== undefined ? {
        address: unspentAddress,
        index: unspentAddressIndex,
        amount: unspentAmount
    } : undefined;
}
