import { IKeyPair } from "../models/IKeyPair";
import { ISeed } from "../models/ISeed";
import { Bip32Path } from "./bip32Path";
/**
 * Class to help with seeds.
 */
export declare class Ed25519Seed implements ISeed {
    /**
     * SeedSize is the size, in bytes, of private key seeds.
     */
    static SEED_SIZE_BYTES: number;
    /**
     * The secret key for the seed.
     */
    private _secretKey;
    /**
     * Create a seed from the bytes.
     * @param bytes The binary representation of the seed.
     * @returns The seed.
     */
    static fromBytes(bytes: Uint8Array): Ed25519Seed;
    /**
     * Generate a new random seed.
     * @returns The random seed.
     */
    static random(): Ed25519Seed;
    /**
     * Get the key pair from the seed.
     * @returns The key pair.
     */
    keyPair(): IKeyPair;
    /**
     * Generate a new seed from the path.
     * @param path The path to generate the seed for.
     * @returns The generated seed.
     */
    generateSeedFromPath(path: Bip32Path): ISeed;
    /**
     * Return the key as bytes.
     * @returns The key as bytes.
     */
    toBytes(): Uint8Array;
}
