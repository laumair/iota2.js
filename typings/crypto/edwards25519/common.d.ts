/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
export declare const BIG_1_SHIFTL_20: bigint;
export declare const BIG_1_SHIFTL_24: bigint;
export declare const BIG_1_SHIFTL_25: bigint;
export declare const BIG_ARR: bigint[];
export declare const BIG_38: bigint;
export declare const BIG_666643: bigint;
export declare const BIG_470296: bigint;
export declare const BIG_654183: bigint;
export declare const BIG_997805: bigint;
export declare const BIG_136657: bigint;
export declare const BIG_683901: bigint;
export declare const BIG_2097151: bigint;
export declare const BIG_8388607: bigint;
/**
 * Load 3 bytes from array as bigint.
 * @param input The input array.
 * @param startIndex The start index to read from.
 * @returns The bigint.
 */
export declare function load3BytesBigInt(input: Uint8Array, startIndex: number): bigint;
/**
 * Load 4 bytes from array as bigint.
 * @param input The input array.
 * @param startIndex The start index to read from.
 * @returns The bigint.
 */
export declare function load4BytesBigInt(input: Uint8Array, startIndex: number): bigint;
