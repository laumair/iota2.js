/* eslint-disable no-bitwise */
import { Sha512 } from "./sha512";

/**
 * Class to help with HmacSha512 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha512
 */
export class HmacSha512 {
    /**
     * The instance for hashing.
     * @internal
     */
    private readonly _sha512: Sha512;

    /**
     * The number of bits.
     * @internal
     */
    private readonly _bits: number;

    /**
     * The o key pad.
     * @internal
     */
    private readonly _oKeyPad: Uint8Array;

    /**
     * Create a new instance of HmacSha512.
     * @param key The key for the hmac.
     * @param bits The number of bits.
     */
    constructor(key: Uint8Array, bits: number = 512) {
        this._bits = bits;
        this._sha512 = new Sha512(bits);

        if (key.length > 128) {
            key = new Sha512(bits).digest();
        }

        this._oKeyPad = new Uint8Array(128);
        const iKeyPad = new Uint8Array(128);

        for (let i = 0; i < 128; ++i) {
            const b = key[i] || 0;
            this._oKeyPad[i] = 0x5C ^ b;
            iKeyPad[i] = 0x36 ^ b;
        }

        this._sha512.update(iKeyPad);
    }

    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    public update(message: Uint8Array): HmacSha512 {
        this._sha512.update(message);
        return this;
    }

    /**
     * Get the digest.
     * @returns The digest.
     */
    public digest(): Uint8Array {
        const innerHash = this._sha512.digest();

        const finalSha512 = new Sha512(this._bits);

        finalSha512.update(this._oKeyPad);
        finalSha512.update(innerHash);

        return finalSha512.digest();
    }
}
