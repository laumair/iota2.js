/**
 * Class to help with Ed25519 Signature scheme.
 */
export declare class Ed25519Address {
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
