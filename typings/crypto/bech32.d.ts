/**
 * Class to help with Bech32 encoding/decoding.
 * Based on reference implementation https://github.com/sipa/bech32/blob/master/ref/javascript/bech32.js
 */
export declare class Bech32 {
    /**
     * The alphabet to use.
     */
    private static readonly CHARSET;
    /**
     * The separator between human readable part and data.
     */
    private static readonly SEPARATOR;
    /**
     * The generator constants;
     */
    private static readonly GENERATOR;
    /**
     * The minimum length for humanReadablePart + data;
     */
    private static readonly MIN_LENGTH;
    /**
     * The maximum length for humanReadablePart + data;
     */
    private static readonly MAX_LENGTH;
    /**
     * Encode the buffer.
     * @param humanReadablePart The header
     * @param data The data to encode.
     * @returns The encoded data.
     */
    static encode(humanReadablePart: string, data: Uint8Array): string;
    /**
     * Decode a bech32 string.
     * @param bech The text to decode.
     * @returns The decoded data or undefined if it could not be decoded.
     */
    static decode(bech: string): {
        humanReadablePart: string;
        data: Uint8Array;
    } | undefined;
    /**
     * Create the checksum from the human redable part and the data.
     * @param humanReadablePart The human readable part.
     * @param data The data.
     * @returns The checksum.
     */
    private static createChecksum;
    /**
     * Verify the checksum given the humarn readable part and data.
     * @param humanReadablePart The human redable part to validate the checksum.
     * @param data The data to validate the checksum.
     * @returns True if the checksum was verified.
     */
    private static verifyChecksum;
    /**
     * Calculate the polymod of the values.
     * @param values The values to calculate the polymode for.
     * @returns The polymod of the values.
     */
    private static polymod;
    /**
     * Expand the human readable part.
     * @param humanReadablePart The human readable part to expand.
     * @returns The expanded human readable part.
     */
    private static humanReadablePartExpand;
}
