"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Seed = void 0;
var randomHelper_1 = require("../utils/randomHelper");
var ed25519_1 = require("./ed25519");
var slip0010_1 = require("./slip0010");
/**
 * Class to help with seeds.
 */
var Ed25519Seed = /** @class */ (function () {
    function Ed25519Seed() {
        /**
         * The secret key for the seed.
         * @internal
         */
        this._secretKey = new Uint8Array();
    }
    /**
     * Create a seed from the bytes.
     * @param bytes The binary representation of the seed.
     * @returns The seed.
     */
    Ed25519Seed.fromBytes = function (bytes) {
        var seed = new Ed25519Seed();
        seed._secretKey = bytes;
        return seed;
    };
    /**
     * Generate a new random seed.
     * @returns The random seed.
     */
    Ed25519Seed.random = function () {
        return Ed25519Seed.fromBytes(randomHelper_1.RandomHelper.generate(Ed25519Seed.SEED_SIZE_BYTES));
    };
    /**
     * Get the key pair from the seed.
     * @returns The key pair.
     */
    Ed25519Seed.prototype.keyPair = function () {
        var signKeyPair = ed25519_1.Ed25519.keyPairFromSeed(this._secretKey);
        return {
            publicKey: signKeyPair.publicKey,
            privateKey: signKeyPair.privateKey
        };
    };
    /**
     * Generate a new seed from the path.
     * @param path The path to generate the seed for.
     * @returns The generated seed.
     */
    Ed25519Seed.prototype.generateSeedFromPath = function (path) {
        var keys = slip0010_1.Slip0010.derivePath(this._secretKey, path);
        return Ed25519Seed.fromBytes(keys.privateKey);
    };
    /**
     * Return the key as bytes.
     * @returns The key as bytes.
     */
    Ed25519Seed.prototype.toBytes = function () {
        return this._secretKey;
    };
    /**
     * SeedSize is the size, in bytes, of private key seeds.
     * @internal
     */
    Ed25519Seed.SEED_SIZE_BYTES = 32;
    return Ed25519Seed;
}());
exports.Ed25519Seed = Ed25519Seed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOVNlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL2VkMjU1MTlTZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHNEQUFxRDtBQUVyRCxxQ0FBb0M7QUFDcEMsdUNBQXNDO0FBRXRDOztHQUVHO0FBQ0g7SUFBQTtRQU9JOzs7V0FHRztRQUNLLGVBQVUsR0FBZSxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBbUR0RCxDQUFDO0lBakRHOzs7O09BSUc7SUFDVyxxQkFBUyxHQUF2QixVQUF3QixLQUFpQjtRQUNyQyxJQUFNLElBQUksR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDVyxrQkFBTSxHQUFwQjtRQUNJLE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNkJBQU8sR0FBZDtRQUNJLElBQU0sV0FBVyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3RCxPQUFPO1lBQ0gsU0FBUyxFQUFFLFdBQVcsQ0FBQyxTQUFTO1lBQ2hDLFVBQVUsRUFBRSxXQUFXLENBQUMsVUFBVTtTQUNyQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwwQ0FBb0IsR0FBM0IsVUFBNEIsSUFBZTtRQUN2QyxJQUFNLElBQUksR0FBRyxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hELE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDZCQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQTVERDs7O09BR0c7SUFDVywyQkFBZSxHQUFXLEVBQUUsQ0FBQztJQXlEL0Msa0JBQUM7Q0FBQSxBQTlERCxJQThEQztBQTlEWSxrQ0FBVyJ9