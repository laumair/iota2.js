/**
 * Class to help with HmacSha512 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha512
 */
export declare class HmacSha512 {
    /**
     * The instance for hashing.
     */
    private readonly _sha512;
    /**
     * The number of bits.
     */
    private readonly _bits;
    /**
     * The o key pad.
     */
    private readonly _oKeyPad;
    /**
     * Create a new instance of HmacSha512.
     * @param key The key for the hmac.
     * @param bits The number of bits.
     */
    constructor(key: Uint8Array, bits?: number);
    /**
     * Get the digest.
     * @returns The digest.
     */
    digest(): Uint8Array;
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    update(message: Uint8Array): HmacSha512;
}
