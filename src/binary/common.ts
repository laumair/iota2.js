import { Blake2b } from "../crypto/blake2b";

export const BYTE_SIZE: number = 1;
export const UINT16_SIZE: number = 2;
export const UINT32_SIZE: number = 4;
export const UINT64_SIZE: number = 8;

export const MESSAGE_ID_LENGTH: number = Blake2b.SIZE_256;
export const TRANSACTION_ID_LENGTH: number = Blake2b.SIZE_256;
export const TYPE_LENGTH: number = UINT32_SIZE;
export const STRING_LENGTH: number = UINT16_SIZE;
export const ARRAY_LENGTH: number = UINT16_SIZE;

/**
 * Is the data hex format.
 * @param value The value to test.
 * @returns true if the string is hex.
 */
export function isHex(value: string): boolean {
    if (value.length % 2 === 1) {
        return false;
    }
    return /[\da-f]/gi.test(value);
}
