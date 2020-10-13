import { derivePath } from "ed25519-hd-key";
import * as nacl from "tweetnacl";
import { ISeed } from "../models/ISeed";
import { ISignatureKeyPair } from "../models/ISignatureKeyPair";
import { Bip32Path } from "./bip32Path";

/**
 * Class to help with seeds.
 */
export class Ed25519Seed implements ISeed {
    /**
     * SeedSize is the size, in bytes, of private key seeds.
     */
    public static SEED_SIZE_BYTES: number = 32;

    /**
     * The secret key for the seed.
     */
    private _secretKey: Buffer = Buffer.alloc(0);

    /**
     * Create a seed from the bytes.
     * @param buffer The binary representation of the seed.
     * @returns The seed.
     */
    public static fromBytes(buffer: Buffer): Ed25519Seed {
        const seed = new Ed25519Seed();
        seed._secretKey = buffer;
        return seed;
    }

    /**
     * Create a seed from the hex string.
     * @param hex The hex representation of the seed.
     * @returns The seed.
     */
    public static fromString(hex: string): Ed25519Seed {
        const seed = new Ed25519Seed();
        seed._secretKey = Buffer.from(hex, "hex");
        return seed;
    }

    /**
     * Generate a new random seed.
     * @returns The random seed.
     */
    public static random(): Ed25519Seed {
        return Ed25519Seed.fromBytes(Buffer.from(nacl.randomBytes(Ed25519Seed.SEED_SIZE_BYTES)));
    }

    /**
     * Generate a key pair from the seed.
     * @returns The key pair.
     */
    public generateKeyPair(): ISignatureKeyPair {
        const signKeyPair = nacl.sign.keyPair.fromSeed(this._secretKey);

        return {
            publicKey: Buffer.from(signKeyPair.publicKey).toString("hex"),
            privateKey: Buffer.from(signKeyPair.secretKey).toString("hex")
        };
    }

    /**
     * Generate the subseeed from bip32 path.
     * @param path The path of the subseed to generate.
     * @returns The private key.
     */
    public generateSubseed(path: Bip32Path): ISeed {
        const { key } = derivePath(path.toString(), this._secretKey.toString("hex"));
        return Ed25519Seed.fromBytes(key);
    }

    /**
     * Return the key as bytes.
     * @returns The key as bytes.
     */
    public toBytes(): Buffer {
        return this._secretKey;
    }

    /**
     * Return the key as string.
     * @returns The key as string.
     */
    public toString(): string {
        return this._secretKey.toString("hex");
    }
}
