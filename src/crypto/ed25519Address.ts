import { ArrayHelper } from "../utils/arrayHelper";
import { Blake2b } from "./blake2b";

/**
 * Class to help with Ed25519 Signature scheme.
 */
export class Ed25519Address {
    /**
     * Address size.
     * @internal
     */
    public static ADDRESS_LENGTH: number = Blake2b.SIZE_256;

    /**
     * Convert the public key to an address.
     * @param publicKey The public key to convert.
     * @returns The address.
     */
    public static publicKeyToAddress(publicKey: Uint8Array): Uint8Array {
        return Blake2b.sum256(publicKey);
    }

    /**
     * Use the public key to validate the address.
     * @param publicKey The public key to verify with.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    public static verifyAddress(publicKey: Uint8Array, address: Uint8Array): boolean {
        return ArrayHelper.equal(Ed25519Address.publicKeyToAddress(publicKey), address);
    }
}
