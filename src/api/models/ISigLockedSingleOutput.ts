import { IEd25519Address } from "./IEd25519Address";
import { ITypeBase } from "./ITypeBase";

/**
 * Signature locked single output.
 */
export interface ISigLockedSingleOutput extends ITypeBase<0> {
    /**
     * The address.
     */
    address: IEd25519Address;

    /**
     * The amount of the output.
     */
    amount: number;
}
