"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ED25519 = void 0;
const nacl = require("tweetnacl");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vZWQyNTUxOS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrQ0FBa0M7QUFHbEM7O0dBRUc7QUFDSCxNQUFhLE9BQU87SUFnQmhCOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQVk7UUFDdEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELE9BQU87WUFDSCxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQzdDLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7U0FDaEQsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBMEIsRUFBRSxNQUFjO1FBQ2hFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7QUF0Q0wsMEJBdUNDO0FBdENHOztHQUVHO0FBQ1csZUFBTyxHQUFXLENBQUMsQ0FBQztBQUVsQzs7R0FFRztBQUNXLHVCQUFlLEdBQVcsRUFBRSxDQUFDO0FBRTNDOztHQUVHO0FBQ1csc0JBQWMsR0FBVyxFQUFFLENBQUMifQ==