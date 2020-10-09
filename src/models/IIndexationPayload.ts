import { ITypeBase } from "./ITypeBase";

/**
 * Indexation payload.
 */
export interface IIndexationPayload extends ITypeBase<2> {
    /**
     * The index name.
     */
    index: string;

    /**
     * The index data.
     */
    data: string;
}
