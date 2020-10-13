import * as nacl from "tweetnacl";
import { Blake2b } from "./blake2b";

/**
 * Class to help with Ed25519 Signature scheme.
 */
export class Ed25519 {
    /**
     * Version for signature scheme.
     */
    public static VERSION: number = 1;

    /**
     * Public Key size.
     */
    public static PUBLIC_KEY_SIZE: number = 32;

    /**
     * Signature size for signing scheme.
     */
    public static SIGNATURE_SIZE: number = 64;

    /**
     * Address size.
     */
    public static ADDRESS_LENGTH: number = Blake2b.SIZE_256;

    /**
     * Privately sign the data.
     * @param privateKey The private key to sign with.
     * @param data The data to sign.
     * @returns The signature.
     */
    public static signData(privateKey: string, data: Buffer): string {
        return Buffer.from(nacl.sign.detached(data, Buffer.from(privateKey, "hex"))).toString("hex");
    }

    /**
     * Use the public key and signature to validate the data.
     * @param publicKey The public key to verify with.
     * @param signature The signature to verify.
     * @param data The data to verify.
     * @returns True if the data and address is verified.
     */
    public static verifyData(publicKey: string, signature: string, data: Buffer): boolean {
        return nacl.sign.detached.verify(data, Buffer.from(signature, "hex"), Buffer.from(publicKey, "hex"));
    }

    /**
     * Convert the public key to an address.
     * @param publicKey The public key to convert.
     * @returns The address.
     */
    public static signAddress(publicKey: string): string {
        return Blake2b.sum256(publicKey);
    }

    /**
     * Use the public key to validate the address.
     * @param publicKey The public key to verify with.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    public static verifyAddress(publicKey: string, address: string): boolean {
        const addressFromPublicKey = Ed25519.signAddress(publicKey);
        return addressFromPublicKey === address;
    }
}
