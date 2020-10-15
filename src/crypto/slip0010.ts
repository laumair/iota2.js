import createHmac from "create-hmac";
import * as nacl from "tweetnacl";
import { Bip32Path } from "./bip32Path";

/**
 * Class to help with slip0010 key derivation.
 * https://github.com/satoshilabs/slips/blob/master/slip-0010.md
 */
export class Slip0010 {
    /**
     * Get the master key from the seed.
     * @param seed The seed to generate the master key from.
     * @returns The key and chain code.
     */
    public static getMasterKeyFromSeed(seed: Buffer): {
        privateKey: Buffer;
        chainCode: Buffer;
    } {
        const hmac = createHmac("sha512", "ed25519 seed");
        const fullKey = hmac.update(seed).digest();
        return {
            privateKey: fullKey.slice(0, 32),
            chainCode: fullKey.slice(32)
        };
    }

    /**
     * Derive a key from the path.
     * @param seed The seed.
     * @param path The path.
     * @returns The key and chain code.
     */
    public static derivePath(seed: Buffer, path: Bip32Path): {
        privateKey: Buffer;
        chainCode: Buffer;
    } {
        let { privateKey, chainCode } = Slip0010.getMasterKeyFromSeed(seed);
        const segments = path.numberSegments();

        for (let i = 0; i < segments.length; i++) {
            const indexBuffer = Buffer.allocUnsafe(4);
            indexBuffer.writeUInt32BE(0x80000000 + segments[i], 0);

            const data = Buffer.concat([Buffer.alloc(1, 0), privateKey, indexBuffer]);

            const fullKey = createHmac("sha512", chainCode)
                .update(data)
                .digest();

            privateKey = fullKey.slice(0, 32);
            chainCode = fullKey.slice(32);
        }
        return {
            privateKey,
            chainCode
        };
    }

    /**
     * Get the public key from the private key.
     * @param privateKey The private key.
     * @param withZeroByte Include a zero bute prefix.
     * @returns The public key.
     */
    public static getPublicKey(privateKey: Buffer, withZeroByte: boolean = true): Buffer {
        const keyPair = nacl.sign.keyPair.fromSeed(privateKey);
        const signPk = Buffer.from(keyPair.secretKey.slice(32));
        return withZeroByte
            ? Buffer.concat([Buffer.alloc(1, 0), signPk])
            : signPk;
    }
}
