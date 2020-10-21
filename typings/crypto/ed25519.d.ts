/**
 * Class to help with Ed25519 Signature scheme.
 */
export declare class Ed25519 {
    /**
     * Privately sign the data.
     * @param privateKey The private key to sign with.
     * @param data The data to sign.
     * @returns The signature.
     */
    static signData(privateKey: Uint8Array, data: Uint8Array): Uint8Array;
    /**
     * Use the public key and signature to validate the data.
     * @param publicKey The public key to verify with.
     * @param signature The signature to verify.
     * @param data The data to verify.
     * @returns True if the data and address is verified.
     */
    static verifyData(publicKey: Uint8Array, signature: Uint8Array, data: Uint8Array): boolean;
    /**
     * Convert the public key to an address.
     * @param publicKey The public key to convert.
     * @returns The address.
     */
    static publicKeyToAddress(publicKey: Uint8Array): Uint8Array;
    /**
     * Use the public key to validate the address.
     * @param publicKey The public key to verify with.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    static verifyAddress(publicKey: Uint8Array, address: Uint8Array): boolean;
}
