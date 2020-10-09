import { ITypeBase } from "./ITypeBase";

/**
 * Ed25519Signature signature.
 */
export interface IEd25519Signature extends ITypeBase<1> {
    /**
     * The public key.
     */
    publicKey: string;

    /**
     * The address.
     */
    address: string;
}
