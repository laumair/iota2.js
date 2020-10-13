/// <reference types="node" />
import { ISignatureKeyPair } from "../models/ISignatureKeyPair";
/**
 * Class to help with ED25519 Signature scheme.
 */
export declare class ED25519 {
    /**
     * Version for signature scheme.
     */
    static VERSION: number;
    /**
     * Public Key size.
     */
    static PUBLIC_KEY_SIZE: number;
    /**
     * Signature size for signing scheme.
     */
    static SIGNATURE_SIZE: number;
    /**
     * Address size.
     */
    static ADDRESS_LENGTH: number;
    /**
     * Generate a key pair from the seed.
     * @param seed The seed to generate the key pair from.
     * @returns The key pair.
     */
    static keyPairFromSeed(seed: Buffer): ISignatureKeyPair;
    /**
     * Privately sign the data.
     * @param keyPair The key pair to sign with.
     * @param buffer The data to sign.
     * @returns The signature.
     */
    static privateSign(keyPair: ISignatureKeyPair, buffer: Buffer): Buffer;
}
