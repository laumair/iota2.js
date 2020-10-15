import { Bip32Path } from "../crypto/bip32Path";
import { IKeyPair } from "../models/IKeyPair";
import { ISeed } from "../models/ISeed";
/**
 * Generate a list of address key pairs.
 * @param seed The seed.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex The start index to generate from, defaults to 0.
 * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
 * @returns A list of the signature key pairs for the addresses.
 */
export declare function getAddressesKeyPairs(seed: ISeed, basePath: Bip32Path, startIndex?: number, count?: number): IKeyPair[];
