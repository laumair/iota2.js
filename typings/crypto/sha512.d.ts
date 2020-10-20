/**
 * Class to help with Sha512 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha512
 */
export declare class Sha512 {
    /**
     * Extra constants.
     */
    private static readonly EXTRA;
    /**
     * Shift constants.
     */
    private static readonly SHIFT;
    /**
     * K.
     */
    private static readonly K;
    /**
     * Blocks.
     */
    private readonly _blocks;
    /**
     * Bits.
     */
    private readonly _bits;
    /**
     * H0 High.
     */
    private _h0h;
    /**
     * H0 Low.
     */
    private _h0l;
    /**
     * H1 High.
     */
    private _h1h;
    /**
     * H1 Low.
     */
    private _h1l;
    /**
     * H2 High.
     */
    private _h2h;
    /**
     * H2 Low.
     */
    private _h2l;
    /**
     * H2 High.
     */
    private _h3h;
    /**
     * H3 Low.
     */
    private _h3l;
    /**
     * H4 High.
     */
    private _h4h;
    /**
     * H4 Low.
     */
    private _h4l;
    /**
     * H5 High.
     */
    private _h5h;
    /**
     * H5 Low.
     */
    private _h5l;
    /**
     * H6 High.
     */
    private _h6h;
    /**
     * H6 Low.
     */
    private _h6l;
    /**
     * H7 High.
     */
    private _h7h;
    /**
     * H7 Low.
     */
    private _h7l;
    /**
     * Block.
     */
    private _block;
    /**
     * Start.
     */
    private _start;
    /**
     * Bytes.
     */
    private _bytes;
    /**
     * h Bytes.
     */
    private _hBytes;
    /**
     * Last byte index.
     */
    private _lastByteIndex;
    /**
     * Is it finalized.
     */
    private _finalized;
    /**
     * Is it hashed.
     */
    private _hashed;
    /**
     * Create a new instance of Sha512.
     * @param bits The number of bits.
     */
    constructor(bits?: number);
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    update(message: Uint8Array): Sha512;
    /**
     * Get the digest.
     * @returns The digest.
     */
    digest(): Uint8Array;
    /**
     * Finalize the hash.
     */
    private finalize;
    /**
     * Perform the hash.
     */
    private hash;
}
