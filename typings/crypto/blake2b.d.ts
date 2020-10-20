/**
 * Class to help with Blake2B Signature scheme.
 * TypeScript conversion from https://github.com/dcposch/blakejs
 */
export declare class Blake2b {
    /**
     * Blake2b 256.
     */
    static SIZE_256: number;
    /**
     * Blake2b 512.
     */
    static SIZE_512: number;
    /**
     * Initialization Vector.
     */
    private static readonly BLAKE2B_IV32;
    /**
     * Initialization Vector.
     */
    private static readonly SIGMA8;
    /**
     * These are offsets into a uint64 buffer.
     * Multiply them all by 2 to make them offsets into a uint32 buffer,
     * because this is Javascript and we don't have uint64s
     */
    private static readonly SIGMA82;
    /**
     * The V vector.
     */
    private _v;
    /**
     * The M vector.
     */
    private _m;
    /**
     * Create a new instance of Blake2b.
     */
    constructor();
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
    /**
     * Compression.
     * Note we're representing 16 uint64s as 32 uint32s
     * @param ctx The context.
     * @param ctx.b Array.
     * @param ctx.h Array.
     * @param ctx.t Number.
     * @param ctx.c Number.
     * @param ctx.outlen The output length.
     * @param last Is this the last block.
     */
    private compress;
    /**
     * Creates a BLAKE2b hashing context.
     * @param outlen Output length between 1 and 64 bytes.
     * @param key Optional key.
     * @returns The initialized context.
     */
    private init;
    /**
     * Updates a BLAKE2b streaming hash.
     * @param ctx The context.
     * @param ctx.b Array.
     * @param ctx.h Array.
     * @param ctx.t Number.
     * @param ctx.c Number.
     * @param ctx.outlen The output length.
     * @param input The data to hash.
     */
    private update;
    /**
     * Completes a BLAKE2b streaming hash.
     * @param ctx The context.
     * @param ctx.b Array.
     * @param ctx.h Array.
     * @param ctx.t Number.
     * @param ctx.c Number.
     * @param ctx.outlen The output length.
     * @returns The final data.
     */
    private final;
    /**
     * 64-bit unsigned addition
     * Sets v[a,a+1] += v[b,b+1]
     * @param v The array.
     * @param a The a index.
     * @param b The b index.
     */
    private add64AA;
    /**
     * 64-bit unsigned addition.
     * Sets v[a,a+1] += b.
     * @param v The array of data to work on.
     * @param a The index to use.
     * @param b0 Is the low 32 bits.
     * @param b1 Represents the high 32 bits.
     */
    private add64AC;
    /**
     * Little endian read byte 32;
     * @param arr The array to read from .
     * @param i The index to start reading from.
     * @returns The value.
     */
    private b2bGet32;
    /**
     * G Mixing function.
     * The ROTRs are inlined for speed.
     * @param a The a value.
     * @param b The b value.
     * @param c The c value.
     * @param d The d value.
     * @param ix The ix value.
     * @param iy The iy value.
     */
    private b2bG;
}
