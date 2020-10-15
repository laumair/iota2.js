import { Bip32Path } from "../crypto/bip32Path";
import { IKeyPair } from "../models/IKeyPair";
import { ISeed } from "../models/ISeed";
import { DEFAULT_CHUNK_SIZE } from "./common";

/**
 * Generate a list of address key pairs.
 * @param seed The seed.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex The start index to generate from, defaults to 0.
 * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
 * @returns A list of the signature key pairs for the addresses.
 */
export function getAddressesKeyPairs(
    seed: ISeed,
    basePath: Bip32Path,
    startIndex: number = 0,
    count: number = DEFAULT_CHUNK_SIZE): IKeyPair[] {
    const keyPairs: IKeyPair[] = [];

    for (let i = startIndex; i < startIndex + count; i++) {
        basePath.push(i);

        const newSeed = seed.generateSeedFromPath(basePath);
        keyPairs.push(newSeed.keyPair());

        basePath.pop();
    }

    return keyPairs;
}
