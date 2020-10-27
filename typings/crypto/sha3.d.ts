/**
 * Keccak implementation based on the following.
 * https://keccak.team/keccak_specs_summary.html
 * https://github.com/emn178/js-sha3
 */
export declare class Sha3 {
    /**
     * Create a new instance of SHA3.
     * @param bits The number of input bits.
     * @param padding The padding to use.
     * @param outputBits The number of output bits.
     */
    constructor(bits: number, padding: Uint32Array, outputBits: number);
    /**
     * Create instance of the sha3 algorithms.
     * @param bits The number of bits to use.
     * @returns An initialized instance of the Keccak algorithm,
     */
    static sha3(bits: 224 | 256 | 384 | 512): Sha3;
    /**
     * Create instance of the keccak algorithms.
     * @param bits The number of bits to use.
     * @returns An initialized instance of the Keccak algorithm,
     */
    static keccak(bits: 224 | 256 | 384 | 512): Sha3;
    /**
     * Reset the state.
     */
    reset(): void;
    /**
     * Update the state.
     * @param input Array of data to use in the update.
     * @returns The this instance for chaining.
     */
    update(input: Uint8Array): Sha3;
    /**
     * Finalize and return the hash for the digest, will also reset the state.
     * @returns Array buffer containing the digest.
     */
    digest(): Uint8Array;
}
