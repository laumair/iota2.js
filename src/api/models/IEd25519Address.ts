import { ITypeBase } from "./ITypeBase";

/**
 * Ed25519Address address.
 */
export interface IEd25519Address extends ITypeBase<1> {
    /**
     * The address.
     */
    address: string;
}
