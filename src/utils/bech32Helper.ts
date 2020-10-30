/* eslint-disable no-bitwise */
import { Bech32 } from "../crypto/bech32";

/**
 * Convert address to bech32.
 */
export class Bech32Helper {
    /**
     * The human readable part of the bech32 addresses.
     */
    public static BECH32_HRP: string = "iot";

    /**
     * Encode an address to bech32.
     * @param addressType The address type to encode.
     * @param addressBytes The address bytes to encode.
     * @returns The array formated as hex.
     */
    public static toBech32(addressType: number, addressBytes: Uint8Array): string {
        const addressData = new Uint8Array(1 + addressBytes.length);
        addressData[0] = addressType;
        addressData.set(addressBytes, 1);
        return Bech32.encode(Bech32Helper.BECH32_HRP, addressData);
    }

    /**
     * Decode an address from bech32.
     * @param bech32Text The bech32 text to decode.
     * @returns The address type and address bytes or undefined if it cannot be decoded.
     */
    public static fromBech32(bech32Text: string): {
        addressType: number;
        addressBytes: Uint8Array;
    } | undefined {
        const decoded = Bech32.decode(bech32Text);
        if (decoded) {
            if (decoded.humanReadablePart !== Bech32Helper.BECH32_HRP) {
                throw new Error(`The hrp part of the address should be ${Bech32Helper.BECH32_HRP
                    }, it is ${decoded.humanReadablePart}`);
            }

            if (decoded.data.length === 0) {
                throw new Error("The data part of the address should be at least length 1, it is 0");
            }

            const addressType = decoded.data[0];
            const addressBytes = decoded.data.slice(1);

            return {
                addressType,
                addressBytes
            };
        }
    }

    /**
     * Does the provided string look like it might be an bech32 address with matching hrp.
     * @param bech32Text The bech32 text to text.
     * @returns True.
     */
    public static matches(bech32Text?: string): boolean {
        return Bech32.matches(Bech32Helper.BECH32_HRP, bech32Text);
    }
}
