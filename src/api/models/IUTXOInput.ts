import { ITypeBase } from "./ITypeBase";

/**
 * UTXO Transaction Input.
 */
export interface IUTXOInput extends ITypeBase<0> {
    /**
     * The transaction Id.
     */
    transactionId: string;

    /**
     * The output index.
     */
    transactionOutputIndex: number;
}
