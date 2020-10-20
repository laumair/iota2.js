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
var nacl = __importStar(require("tweetnacl"));
var slip0010_1 = require("./slip0010");
/**
 * Class to help with seeds.
 */
var Ed25519Seed = /** @class */ (function () {
    function Ed25519Seed() {
        /**
         * The secret key for the seed.
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
        return Ed25519Seed.fromBytes(nacl.randomBytes(Ed25519Seed.SEED_SIZE_BYTES));
    };
    /**
     * Get the key pair from the seed.
     * @returns The key pair.
     */
    Ed25519Seed.prototype.keyPair = function () {
        var signKeyPair = nacl.sign.keyPair.fromSeed(this._secretKey);
        return {
            publicKey: signKeyPair.publicKey,
            privateKey: signKeyPair.secretKey
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
     */
    Ed25519Seed.SEED_SIZE_BYTES = 32;
    return Ed25519Seed;
}());
exports.Ed25519Seed = Ed25519Seed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOVNlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL2VkMjU1MTlTZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBa0M7QUFJbEMsdUNBQXNDO0FBRXRDOztHQUVHO0FBQ0g7SUFBQTtRQU1JOztXQUVHO1FBQ0ssZUFBVSxHQUFlLElBQUksVUFBVSxFQUFFLENBQUM7SUFtRHRELENBQUM7SUFqREc7Ozs7T0FJRztJQUNXLHFCQUFTLEdBQXZCLFVBQXdCLEtBQWlCO1FBQ3JDLElBQU0sSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNXLGtCQUFNLEdBQXBCO1FBQ0ksT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDZCQUFPLEdBQWQ7UUFDSSxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhFLE9BQU87WUFDSCxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVM7WUFDaEMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxTQUFTO1NBQ3BDLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDBDQUFvQixHQUEzQixVQUE0QixJQUFlO1FBQ3ZDLElBQU0sSUFBSSxHQUFHLG1CQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNkJBQU8sR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBMUREOztPQUVHO0lBQ1csMkJBQWUsR0FBVyxFQUFFLENBQUM7SUF3RC9DLGtCQUFDO0NBQUEsQUE1REQsSUE0REM7QUE1RFksa0NBQVcifQ==