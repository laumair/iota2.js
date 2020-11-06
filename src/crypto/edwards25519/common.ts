/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */

export const BIG_1_SHIFTL_20: bigint = BigInt(1) << BigInt(20);
export const BIG_1_SHIFTL_24: bigint = BigInt(1) << BigInt(24);
export const BIG_1_SHIFTL_25: bigint = BigInt(1) << BigInt(25);

export const BIG_ARR: bigint[] = [
    BigInt(0), BigInt(1), BigInt(2), BigInt(3), BigInt(4), BigInt(5),
    BigInt(6), BigInt(7), BigInt(8), BigInt(9), BigInt(10), BigInt(11),
    BigInt(12), BigInt(13), BigInt(14), BigInt(15), BigInt(16), BigInt(17),
    BigInt(18), BigInt(19), BigInt(20), BigInt(21), BigInt(22), BigInt(23),
    BigInt(24), BigInt(25), BigInt(26)
];

export const BIG_38: bigint = BigInt(38);

export const BIG_666643: bigint = BigInt(666643);
export const BIG_470296: bigint = BigInt(470296);
export const BIG_654183: bigint = BigInt(654183);
export const BIG_997805: bigint = BigInt(997805);
export const BIG_136657: bigint = BigInt(136657);
export const BIG_683901: bigint = BigInt(683901);

export const BIG_2097151: bigint = BigInt(2097151);
export const BIG_8388607: bigint = BigInt(8388607);

/**
 * Load 3 bytes from array as bigint.
 * @param input The input array.
 * @param startIndex The start index to read from.
 * @returns The bigint.
 */
export function load3BytesBigInt(input: Uint8Array, startIndex: number): bigint {
    let r: bigint;
    r = BigInt(input[startIndex]);
    r |= BigInt(input[startIndex + 1]) << BIG_ARR[8];
    r |= BigInt(input[startIndex + 2]) << BIG_ARR[16];
    return r;
}

/**
 * Load 4 bytes from array as bigint.
 * @param input The input array.
 * @param startIndex The start index to read from.
 * @returns The bigint.
 */
export function load4BytesBigInt(input: Uint8Array, startIndex: number): bigint {
    let r: bigint;
    r = BigInt(input[startIndex]);
    r |= BigInt(input[startIndex + 1]) << BIG_ARR[8];
    r |= BigInt(input[startIndex + 2]) << BIG_ARR[16];
    r |= BigInt(input[startIndex + 3]) << BIG_ARR[24];
    return r;
}
