/* eslint-disable no-bitwise */
/**
 * Class to help with Bech32 encoding/decoding.
 * Based on reference implementation https://github.com/sipa/bech32/blob/master/ref/javascript/bech32.js
 */
export class Bech32 {
    /**
     * The alphabet to use.
     */
    private static readonly CHARSET: string = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";

    /**
     * The separator between human readable part and data.
     */
    private static readonly SEPARATOR: string = "1";

    /**
     * The generator constants;
     */
    private static readonly GENERATOR: Uint32Array = Uint32Array.from([
        0x3B6A57B2,
        0x26508E6D,
        0x1EA119FA,
        0x3D4233DD,
        0x2A1462B3
    ]);

    /**
     * The minimum length for humanReadablePart + data;
     */
    private static readonly MIN_LENGTH: number = 8;

    /**
     * The maximum length for humanReadablePart + data;
     */
    private static readonly MAX_LENGTH: number = 90;

    /**
     * Encode the buffer.
     * @param humanReadablePart The header
     * @param data The data to encode.
     * @returns The encoded data.
     */
    public static encode(humanReadablePart: string, data: Uint8Array): string {
        const len = humanReadablePart.length + data.length;
        if (len < Bech32.MIN_LENGTH) {
            throw new Error(`Human readable part + data length is too short, it is ${len
                } and the minimum length is ${Bech32.MIN_LENGTH}`);
        }

        if (humanReadablePart.length + data.length > Bech32.MAX_LENGTH) {
            throw new Error(`Human readable part + data length is too long, it is ${len
                } and the maximum length is ${Bech32.MAX_LENGTH}`);
        }

        const checksum = Bech32.createChecksum(humanReadablePart, data);

        let ret = `${humanReadablePart}${Bech32.SEPARATOR}`;

        for (let i = 0; i < data.length; i++) {
            ret += Bech32.CHARSET.charAt(data[i]);
        }

        for (let i = 0; i < checksum.length; i++) {
            ret += Bech32.CHARSET.charAt(checksum[i]);
        }

        return ret;
    }

    /**
     * Decode a bech32 string.
     * @param bech The text to decode.
     * @returns The decoded data or undefined if it could not be decoded.
     */
    public static decode(bech: string): {
        humanReadablePart: string;
        data: Uint8Array;
    } | undefined {
        bech = bech.toLowerCase();

        if (bech.length > Bech32.MAX_LENGTH) {
            throw new Error(`The bech string is too long, it is ${bech.length
                } and the maximum length is ${Bech32.MAX_LENGTH}`);
        }

        const separatorPos = bech.lastIndexOf(Bech32.SEPARATOR);
        if (separatorPos < 1) {
            throw new Error(`The separator position is ${separatorPos}, which is too early in the string`);
        }

        if (separatorPos + 7 > bech.length) {
            throw new Error(`The separator position is ${separatorPos}, which doesn't leave enough space for data`);
        }

        const data = new Uint8Array(bech.length - separatorPos - 1);
        let idx = 0;

        for (let p = separatorPos + 1; p < bech.length; p++) {
            const d = Bech32.CHARSET.indexOf(bech.charAt(p));
            if (d === -1) {
                throw new Error(`Data contains characters not in the charset ${bech.charAt(p)}`);
            }
            data[idx++] = Bech32.CHARSET.indexOf(bech.charAt(p));
        }

        const humanReadablePart = bech.slice(0, separatorPos);

        if (!Bech32.verifyChecksum(humanReadablePart, data)) {
            return;
        }

        return { humanReadablePart, data: data.slice(0, -6) };
    }

    /**
     * Create the checksum from the human redable part and the data.
     * @param humanReadablePart The human readable part.
     * @param data The data.
     * @returns The checksum.
     */
    private static createChecksum(humanReadablePart: string, data: Uint8Array): Uint8Array {
        const expanded = Bech32.humanReadablePartExpand(humanReadablePart);

        const values = new Uint8Array(expanded.length + data.length + 6);
        values.set(expanded, 0);
        values.set(data, expanded.length);
        values.set([0, 0, 0, 0, 0, 0], expanded.length + data.length);

        const mod = Bech32.polymod(values) ^ 1;

        const ret = new Uint8Array(6);
        for (let i = 0; i < 6; i++) {
            ret[i] = (mod >> 5 * (5 - i)) & 31;
        }
        return ret;
    }

    /**
     * Verify the checksum given the humarn readable part and data.
     * @param humanReadablePart The human redable part to validate the checksum.
     * @param data The data to validate the checksum.
     * @returns True if the checksum was verified.
     */
    private static verifyChecksum(humanReadablePart: string, data: Uint8Array): boolean {
        const expanded = Bech32.humanReadablePartExpand(humanReadablePart);

        const values = new Uint8Array(expanded.length + data.length);
        values.set(expanded, 0);
        values.set(data, expanded.length);

        return Bech32.polymod(values) === 1;
    }

    /**
     * Calculate the polymod of the values.
     * @param values The values to calculate the polymode for.
     * @returns The polymod of the values.
     */
    private static polymod(values: Uint8Array): number {
        let chk = 1;
        for (let p = 0; p < values.length; p++) {
            const top = chk >> 25;
            chk = ((chk & 0x1FFFFFF) << 5) ^ values[p];
            for (let i = 0; i < 5; ++i) {
                if ((top >> i) & 1) {
                    chk ^= Bech32.GENERATOR[i];
                }
            }
        }
        return chk;
    }

    /**
     * Expand the human readable part.
     * @param humanReadablePart The human readable part to expand.
     * @returns The expanded human readable part.
     */
    private static humanReadablePartExpand(humanReadablePart: string): Uint8Array {
        const ret = new Uint8Array((humanReadablePart.length * 2) + 1);
        let idx = 0;
        for (let i = 0; i < humanReadablePart.length; i++) {
            ret[idx++] = humanReadablePart.charCodeAt(i) >> 5;
        }
        ret[idx++] = 0;
        for (let i = 0; i < humanReadablePart.length; i++) {
            ret[idx++] = humanReadablePart.charCodeAt(i) & 31;
        }
        return ret;
    }
}
