export declare class Ed25519 {
    static PUBLIC_KEY_SIZE: number;
    static PRIVATE_KEY_SIZE: number;
    static SIGNATURE_SIZE: number;
    static SEED_SIZE: number;
    /**
     * Public returns the PublicKey corresponding to priv.
     * @param privateKey The private key to get the corresponding public key.
     * @returns The public key.
     */
    static publicKeyFromPrivateKey(privateKey: Uint8Array): Uint8Array;
    /**
     * Generate the key pair from the seed.
     * @param seed The seed to generate the key pair for.
     * @returns The key pair.
     */
    static keyPairFromSeed(seed: Uint8Array): {
        publicKey: Uint8Array;
        privateKey: Uint8Array;
    };
    /**
     * NewKeyFromSeed calculates a private key from a seed. It will panic if
     * len(seed) is not SeedSize. This function is provided for interoperability
     * with RFC 8032. RFC 8032's private keys correspond to seeds in this
     * package.
     * @param seed The seed to generate the private key from.
     * @returns The private key.
     */
    static privateKeyFromSeed(seed: Uint8Array): Uint8Array;
    /**
     * Sign the message with privateKey and returns a signature.
     * @param privateKey The private key.
     * @param message The message to sign.
     * @returns The signature.
     */
    static sign(privateKey: Uint8Array, message: Uint8Array): Uint8Array;
    /**
     * Verify reports whether sig is a valid signature of message by publicKey
     * @param publicKey The public key to verify the signature.
     * @param message The message for the signature.
     * @param sig The signature.
     * @returns True if the signature matches.
     */
    static verify(publicKey: Uint8Array, message: Uint8Array, sig: Uint8Array): boolean;
}
