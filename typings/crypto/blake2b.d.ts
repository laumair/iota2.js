/**
 * Class to help with Blake2B Signature scheme.
 * TypeScript conversion from https://github.com/dcposch/blakejs
 */
export declare class Blake2b {
    /**
     * Perform Sum 256 on the data.
     * @param data The data to operate on.
     * @returns The sum 256 of the data.
     */
    static sum256(data: Uint8Array): Uint8Array;
    /**
     * Perform Sum 512 on the data.
     * @param data The data to operate on.
     * @returns The sum 512 of the data.
     */
    static sum512(data: Uint8Array): Uint8Array;
}
