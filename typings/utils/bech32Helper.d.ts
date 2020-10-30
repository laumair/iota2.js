/**
 * Convert address to bech32.
 */
export declare class Bech32Helper {
    /**
     * The human readable part of the bech32 addresses.
     */
    static BECH32_HRP: string;
    /**
     * Encode an address to bech32.
     * @param addressType The address type to encode.
     * @param addressBytes The address bytes to encode.
     * @returns The array formated as hex.
     */
    static toBech32(addressType: number, addressBytes: Uint8Array): string;
    /**
     * Decode an address from bech32.
     * @param bech32Text The bech32 text to decode.
     * @returns The address type and address bytes or undefined if it cannot be decoded.
     */
    static fromBech32(bech32Text: string): {
        addressType: number;
        addressBytes: Uint8Array;
    } | undefined;
    /**
     * Does the provided string look like it might be an bech32 address with matching hrp.
     * @param bech32Text The bech32 text to text.
     * @returns True.
     */
    static matches(bech32Text?: string): boolean;
}
