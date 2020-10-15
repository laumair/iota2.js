"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Seed = void 0;
const nacl = __importStar(require("tweetnacl"));
const slip0010_1 = require("./slip0010");
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
     * Get the key pair from the seed.
     * @returns The key pair.
     */
    keyPair() {
        const signKeyPair = nacl.sign.keyPair.fromSeed(this._secretKey);
        return {
            publicKey: Buffer.from(signKeyPair.publicKey).toString("hex"),
            privateKey: Buffer.from(signKeyPair.secretKey).toString("hex")
        };
    }
    /**
     * Generate a new seed from the path.
     * @param path The path to generate the seed for.
     * @returns The generated seed.
     */
    generateSeedFromPath(path) {
        const keys = slip0010_1.Slip0010.derivePath(this._secretKey, path);
        return Ed25519Seed.fromBytes(keys.privateKey);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOVNlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL2VkMjU1MTlTZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBa0M7QUFJbEMseUNBQXNDO0FBRXRDOztHQUVHO0FBQ0gsTUFBYSxXQUFXO0lBQXhCO1FBTUk7O1dBRUc7UUFDSyxlQUFVLEdBQVcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQXNFakQsQ0FBQztJQXBFRzs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFjO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVc7UUFDaEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsTUFBTTtRQUNoQixPQUFPLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE9BQU87UUFDVixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhFLE9BQU87WUFDSCxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUM3RCxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztTQUNqRSxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxvQkFBb0IsQ0FBQyxJQUFlO1FBQ3ZDLE1BQU0sSUFBSSxHQUFHLG1CQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7QUE5RUwsa0NBK0VDO0FBOUVHOztHQUVHO0FBQ1csMkJBQWUsR0FBVyxFQUFFLENBQUMifQ==