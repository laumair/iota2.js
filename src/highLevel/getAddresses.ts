import { Bip32Path } from "../crypto/bip32Path";
import { Ed25519 } from "../crypto/ed25519";
import { ISeed } from "../models/ISeed";
import { DEFAULT_CHUNK_SIZE } from "./common";
import { getAddressesKeyPairs } from "./getAddressesKeyPairs";

/**
 * Generate a list of address key pairs.
 * @param seed The seed.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex The start index to generate from, defaults to 0.
 * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
 * @returns A list of the signature key pairs for the addresses.
 */
export function getAddresses(
    seed: ISeed,
    basePath: Bip32Path,
    startIndex: number = 0,
    count: number = DEFAULT_CHUNK_SIZE): string[] {
    return getAddressesKeyPairs(seed, basePath, startIndex, count).map(kp => Ed25519.publicKeyToAddress(kp.publicKey));
}
