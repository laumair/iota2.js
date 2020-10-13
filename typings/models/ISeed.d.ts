/// <reference types="node" />
import { Bip32Path } from "../crypto/bip32Path";
import { ISignatureKeyPair } from "./ISignatureKeyPair";
/**
 * Interface definitions for seed.
 */
export interface ISeed {
    /**
     * Generate the private key from the bip32 path.
     * @param path The path of the sub seed to generate.
     * @returns The private key.
     */
    generateSubseed(path: Bip32Path): ISeed;
    /**
     * Generate a key pair from the seed.
     * @returns The key pair.
     */
    generateKeyPair(): ISignatureKeyPair;
    /**
     * Return the key as bytes.
     * @returns The key as bytes.
     */
    toBytes(): Buffer;
    /**
     * Return the key as string.
     * @returns The key as string.
     */
    toString(): string;
}
