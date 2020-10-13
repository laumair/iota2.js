"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ED25519 = void 0;
const nacl = require("tweetnacl");
const blake2b_1 = require("./blake2b");
/**
 * Class to help with ED25519 Signature scheme.
 */
class ED25519 {
    /**
     * Generate a key pair from the seed.
     * @param seed The seed to generate the key pair from.
     * @returns The key pair.
     */
    static keyPairFromSeed(seed) {
        const signKeyPair = nacl.sign.keyPair.fromSeed(seed);
        return {
            publicKey: Buffer.from(signKeyPair.publicKey),
            secretKey: Buffer.from(signKeyPair.secretKey)
        };
    }
    /**
     * Privately sign the data.
     * @param keyPair The key pair to sign with.
     * @param buffer The data to sign.
     * @returns The signature.
     */
    static privateSign(keyPair, buffer) {
        return Buffer.from(nacl.sign.detached(buffer, keyPair.secretKey));
    }
}
exports.ED25519 = ED25519;
/**
 * Version for signature scheme.
 */
ED25519.VERSION = 1;
/**
 * Public Key size.
 */
ED25519.PUBLIC_KEY_SIZE = 32;
/**
 * Signature size for signing scheme.
 */
ED25519.SIGNATURE_SIZE = 64;
/**
 * Address size.
 */
ED25519.ADDRESS_LENGTH = blake2b_1.Blake2b.SIZE_256;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vZWQyNTUxOS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrQ0FBa0M7QUFFbEMsdUNBQW9DO0FBRXBDOztHQUVHO0FBQ0gsTUFBYSxPQUFPO0lBcUJoQjs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFZO1FBQ3RDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxPQUFPO1lBQ0gsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUM3QyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1NBQ2hELENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQTBCLEVBQUUsTUFBYztRQUNoRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7O0FBM0NMLDBCQTRDQztBQTNDRzs7R0FFRztBQUNXLGVBQU8sR0FBVyxDQUFDLENBQUM7QUFFbEM7O0dBRUc7QUFDVyx1QkFBZSxHQUFXLEVBQUUsQ0FBQztBQUUzQzs7R0FFRztBQUNXLHNCQUFjLEdBQVcsRUFBRSxDQUFDO0FBRTFDOztHQUVHO0FBQ1csc0JBQWMsR0FBVyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyJ9