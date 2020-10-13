import { blake2b } from "blakejs";

/**
 * Class to help with Blake2B Signature scheme.
 */
export class Blake2b {
    /**
     * Blake2b 256.
     */
    public static SIZE_256: number = 32;

    /**
     * Perform Sum 256 on the data.
     * @param data The data to operate on.
     * @returns The sum 256 of the data.
     */
    public static sum256(data: string): string {
        return Buffer.from(blake2b(Buffer.from(data, "hex"), undefined, Blake2b.SIZE_256)).toString("hex");
    }
}
