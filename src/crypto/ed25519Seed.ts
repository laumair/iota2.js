import { IKeyPair } from "../models/IKeyPair";
import { ISeed } from "../models/ISeed";
import { RandomHelper } from "../utils/randomHelper";
import { Bip32Path } from "./bip32Path";
import { Ed25519 } from "./ed25519";
import { Slip0010 } from "./slip0010";

/**
 * Class to help with seeds.
 */
export class Ed25519Seed implements ISeed {
    /**
     * SeedSize is the size, in bytes, of private key seeds.
     * @internal
     */
    public static SEED_SIZE_BYTES: number = 32;

    /**
     * The secret key for the seed.
     * @internal
     */
    private _secretKey: Uint8Array = new Uint8Array();

    /**
     * Create a seed from the bytes.
     * @param bytes The binary representation of the seed.
     * @returns The seed.
     */
    public static fromBytes(bytes: Uint8Array): Ed25519Seed {
        const seed = new Ed25519Seed();
        seed._secretKey = bytes;
        return seed;
    }

    /**
     * Generate a new random seed.
     * @returns The random seed.
     */
    public static random(): Ed25519Seed {
        return Ed25519Seed.fromBytes(RandomHelper.generate(Ed25519Seed.SEED_SIZE_BYTES));
    }

    /**
     * Get the key pair from the seed.
     * @returns The key pair.
     */
    public keyPair(): IKeyPair {
        const signKeyPair = Ed25519.keyPairFromSeed(this._secretKey);

        return {
            publicKey: signKeyPair.publicKey,
            privateKey: signKeyPair.privateKey
        };
    }

    /**
     * Generate a new seed from the path.
     * @param path The path to generate the seed for.
     * @returns The generated seed.
     */
    public generateSeedFromPath(path: Bip32Path): ISeed {
        const keys = Slip0010.derivePath(this._secretKey, path);
        return Ed25519Seed.fromBytes(keys.privateKey);
    }

    /**
     * Return the key as bytes.
     * @returns The key as bytes.
     */
    public toBytes(): Uint8Array {
        return this._secretKey;
    }
}
