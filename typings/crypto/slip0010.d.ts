/// <reference types="node" />
import { Bip32Path } from "./bip32Path";
/**
 * Class to help with slip0010 key derivation.
 * https://github.com/satoshilabs/slips/blob/master/slip-0010.md
 */
export declare class Slip0010 {
    /**
     * Get the master key from the seed.
     * @param seed The seed to generate the master key from.
     * @returns The key and chain code.
     */
    static getMasterKeyFromSeed(seed: Buffer): {
        privateKey: Buffer;
        chainCode: Buffer;
    };
    /**
     * Derive a key from the path.
     * @param seed The seed.
     * @param path The path.
     * @returns The key and chain code.
     */
    static derivePath(seed: Buffer, path: Bip32Path): {
        privateKey: Buffer;
        chainCode: Buffer;
    };
    /**
     * Get the public key from the private key.
     * @param privateKey The private key.
     * @param withZeroByte Include a zero bute prefix.
     * @returns The public key.
     */
    static getPublicKey(privateKey: Buffer, withZeroByte?: boolean): Buffer;
}
