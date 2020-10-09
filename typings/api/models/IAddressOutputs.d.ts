/**
 * List of outputs for an address.
 */
export interface IAddressOutputs {
    /**
     * The address that the outputs are for.
     */
    address: string;
    /**
     * The max number of results returned.
     */
    maxResults: number;
    /**
     * The number of items returned.
     */
    count: number;
    /**
     * The ids of the outputs.
     */
    outputIds: string[];
}
