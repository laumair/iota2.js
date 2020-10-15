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
exports.Ed25519 = void 0;
const nacl = __importStar(require("tweetnacl"));
const blake2b_1 = require("./blake2b");
/**
 * Class to help with Ed25519 Signature scheme.
 */
class Ed25519 {
    /**
     * Privately sign the data.
     * @param privateKey The private key to sign with.
     * @param data The data to sign.
     * @returns The signature.
     */
    static signData(privateKey, data) {
        return Buffer.from(nacl.sign.detached(data, Buffer.from(privateKey, "hex"))).toString("hex");
    }
    /**
     * Use the public key and signature to validate the data.
     * @param publicKey The public key to verify with.
     * @param signature The signature to verify.
     * @param data The data to verify.
     * @returns True if the data and address is verified.
     */
    static verifyData(publicKey, signature, data) {
        return nacl.sign.detached.verify(data, Buffer.from(signature, "hex"), Buffer.from(publicKey, "hex"));
    }
    /**
     * Convert the public key to an address.
     * @param publicKey The public key to convert.
     * @returns The address.
     */
    static publicKeyToAddress(publicKey) {
        return blake2b_1.Blake2b.sum256(publicKey);
    }
    /**
     * Use the public key to validate the address.
     * @param publicKey The public key to verify with.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    static verifyAddress(publicKey, address) {
        const addressFromPublicKey = Ed25519.publicKeyToAddress(publicKey);
        return addressFromPublicKey === address;
    }
}
exports.Ed25519 = Ed25519;
/**
 * Version for signature scheme.
 */
Ed25519.VERSION = 1;
/**
 * Public Key size.
 */
Ed25519.PUBLIC_KEY_SIZE = 32;
/**
 * Signature size for signing scheme.
 */
Ed25519.SIGNATURE_SIZE = 64;
/**
 * Address size.
 */
Ed25519.ADDRESS_LENGTH = blake2b_1.Blake2b.SIZE_256;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vZWQyNTUxOS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtDO0FBQ2xDLHVDQUFvQztBQUVwQzs7R0FFRztBQUNILE1BQWEsT0FBTztJQXFCaEI7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQWtCLEVBQUUsSUFBWTtRQUNuRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBaUIsRUFBRSxTQUFpQixFQUFFLElBQVk7UUFDdkUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsU0FBaUI7UUFDOUMsT0FBTyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsT0FBZTtRQUMxRCxNQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRSxPQUFPLG9CQUFvQixLQUFLLE9BQU8sQ0FBQztJQUM1QyxDQUFDOztBQTVETCwwQkE2REM7QUE1REc7O0dBRUc7QUFDVyxlQUFPLEdBQVcsQ0FBQyxDQUFDO0FBRWxDOztHQUVHO0FBQ1csdUJBQWUsR0FBVyxFQUFFLENBQUM7QUFFM0M7O0dBRUc7QUFDVyxzQkFBYyxHQUFXLEVBQUUsQ0FBQztBQUUxQzs7R0FFRztBQUNXLHNCQUFjLEdBQVcsaUJBQU8sQ0FBQyxRQUFRLENBQUMifQ==