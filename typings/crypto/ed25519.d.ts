/// <reference types="node" />
/**
 * Class to help with Ed25519 Signature scheme.
 */
export declare class Ed25519 {
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
     * Privately sign the data.
     * @param privateKey The private key to sign with.
     * @param data The data to sign.
     * @returns The signature.
     */
    static signData(privateKey: string, data: Buffer): string;
    /**
     * Use the public key and signature to validate the data.
     * @param publicKey The public key to verify with.
     * @param signature The signature to verify.
     * @param data The data to verify.
     * @returns True if the data and address is verified.
     */
    static verifyData(publicKey: string, signature: string, data: Buffer): boolean;
    /**
     * Convert the public key to an address.
     * @param publicKey The public key to convert.
     * @returns The address.
     */
    static publicKeyToAddress(publicKey: string): string;
    /**
     * Use the public key to validate the address.
     * @param publicKey The public key to verify with.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    static verifyAddress(publicKey: string, address: string): boolean;
}
