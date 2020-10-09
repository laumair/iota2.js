import { IIndexationPayload } from "./IIndexationPayload";
import { ISigLockedSingleOutput } from "./ISigLockedSingleOutput";
import { ITypeBase } from "./ITypeBase";
import { IUTXOInput } from "./IUTXOInput";
/**
 * Transaction payload.
 */
export interface ITransactionEssence extends ITypeBase<0> {
    /**
     * The inputs of the transaction.
     */
    inputs: IUTXOInput[];
    /**
     * The outputs of the transaction.
     */
    outputs: ISigLockedSingleOutput[];
    /**
     * Indexation payload.
     */
    payload?: IIndexationPayload;
}
