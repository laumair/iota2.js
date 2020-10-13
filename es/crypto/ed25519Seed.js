"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Seed = void 0;
const ed25519_hd_key_1 = require("ed25519-hd-key");
const nacl = require("tweetnacl");
/**
 * Class to help with seeds.
 */
class Ed25519Seed {
    constructor() {
        /**
         * The secret key for the seed.
         */
        this._secretKey = Buffer.alloc(0);
    }
    /**
     * Create a seed from the bytes.
     * @param buffer The binary representation of the seed.
     * @returns The seed.
     */
    static fromBytes(buffer) {
        const seed = new Ed25519Seed();
        seed._secretKey = buffer;
        return seed;
    }
    /**
     * Create a seed from the hex string.
     * @param hex The hex representation of the seed.
     * @returns The seed.
     */
    static fromString(hex) {
        const seed = new Ed25519Seed();
        seed._secretKey = Buffer.from(hex, "hex");
        return seed;
    }
    /**
     * Generate a new random seed.
     * @returns The random seed.
     */
    static random() {
        return Ed25519Seed.fromBytes(Buffer.from(nacl.randomBytes(Ed25519Seed.SEED_SIZE_BYTES)));
    }
    /**
     * Generate a key pair from the seed.
     * @returns The key pair.
     */
    generateKeyPair() {
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
    generateSubseed(path) {
        const { key } = ed25519_hd_key_1.derivePath(path.toString(), this._secretKey.toString("hex"));
        return Ed25519Seed.fromBytes(key);
    }
    /**
     * Return the key as bytes.
     * @returns The key as bytes.
     */
    toBytes() {
        return this._secretKey;
    }
    /**
     * Return the key as string.
     * @returns The key as string.
     */
    toString() {
        return this._secretKey.toString("hex");
    }
}
exports.Ed25519Seed = Ed25519Seed;
/**
 * SeedSize is the size, in bytes, of private key seeds.
 */
Ed25519Seed.SEED_SIZE_BYTES = 32;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOVNlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL2VkMjU1MTlTZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUE0QztBQUM1QyxrQ0FBa0M7QUFLbEM7O0dBRUc7QUFDSCxNQUFhLFdBQVc7SUFBeEI7UUFNSTs7V0FFRztRQUNLLGVBQVUsR0FBVyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBc0VqRCxDQUFDO0lBcEVHOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQWM7UUFDbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVztRQUNoQyxNQUFNLElBQUksR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxNQUFNO1FBQ2hCLE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZUFBZTtRQUNsQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhFLE9BQU87WUFDSCxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUM3RCxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztTQUNqRSxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxlQUFlLENBQUMsSUFBZTtRQUNsQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsMkJBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3RSxPQUFPLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7O0FBOUVMLGtDQStFQztBQTlFRzs7R0FFRztBQUNXLDJCQUFlLEdBQVcsRUFBRSxDQUFDIn0=