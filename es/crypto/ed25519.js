"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519 = void 0;
const nacl = require("tweetnacl");
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
    static signAddress(publicKey) {
        return blake2b_1.Blake2b.sum256(publicKey);
    }
    /**
     * Use the public key to validate the address.
     * @param publicKey The public key to verify with.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    static verifyAddress(publicKey, address) {
        const addressFromPublicKey = Ed25519.signAddress(publicKey);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vZWQyNTUxOS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrQ0FBa0M7QUFDbEMsdUNBQW9DO0FBRXBDOztHQUVHO0FBQ0gsTUFBYSxPQUFPO0lBcUJoQjs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBa0IsRUFBRSxJQUFZO1FBQ25ELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFpQixFQUFFLFNBQWlCLEVBQUUsSUFBWTtRQUN2RSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBaUI7UUFDdkMsT0FBTyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsT0FBZTtRQUMxRCxNQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUQsT0FBTyxvQkFBb0IsS0FBSyxPQUFPLENBQUM7SUFDNUMsQ0FBQzs7QUE1REwsMEJBNkRDO0FBNURHOztHQUVHO0FBQ1csZUFBTyxHQUFXLENBQUMsQ0FBQztBQUVsQzs7R0FFRztBQUNXLHVCQUFlLEdBQVcsRUFBRSxDQUFDO0FBRTNDOztHQUVHO0FBQ1csc0JBQWMsR0FBVyxFQUFFLENBQUM7QUFFMUM7O0dBRUc7QUFDVyxzQkFBYyxHQUFXLGlCQUFPLENBQUMsUUFBUSxDQUFDIn0=