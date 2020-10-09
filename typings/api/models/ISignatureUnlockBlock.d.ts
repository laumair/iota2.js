import { IEd25519Signature } from "./IEd25519Signature";
import { ITypeBase } from "./ITypeBase";
/**
 * Signature unlock block.
 */
export interface ISignatureUnlockBlock extends ITypeBase<0> {
    /**
     * The signature.
     */
    signature: IEd25519Signature;
}
