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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slip0010 = void 0;
const create_hmac_1 = __importDefault(require("create-hmac"));
const nacl = __importStar(require("tweetnacl"));
/**
 * Class to help with slip0010 key derivation.
 * https://github.com/satoshilabs/slips/blob/master/slip-0010.md
 */
class Slip0010 {
    /**
     * Get the master key from the seed.
     * @param seed The seed to generate the master key from.
     * @returns The key and chain code.
     */
    static getMasterKeyFromSeed(seed) {
        const hmac = create_hmac_1.default("sha512", "ed25519 seed");
        const fullKey = hmac.update(seed).digest();
        return {
            privateKey: fullKey.slice(0, 32),
            chainCode: fullKey.slice(32)
        };
    }
    /**
     * Derive a key from the path.
     * @param seed The seed.
     * @param path The path.
     * @returns The key and chain code.
     */
    static derivePath(seed, path) {
        let { privateKey, chainCode } = Slip0010.getMasterKeyFromSeed(seed);
        const segments = path.numberSegments();
        for (let i = 0; i < segments.length; i++) {
            const indexBuffer = Buffer.allocUnsafe(4);
            indexBuffer.writeUInt32BE(0x80000000 + segments[i], 0);
            const data = Buffer.concat([Buffer.alloc(1, 0), privateKey, indexBuffer]);
            const fullKey = create_hmac_1.default("sha512", chainCode)
                .update(data)
                .digest();
            privateKey = fullKey.slice(0, 32);
            chainCode = fullKey.slice(32);
        }
        return {
            privateKey,
            chainCode
        };
    }
    /**
     * Get the public key from the private key.
     * @param privateKey The private key.
     * @param withZeroByte Include a zero bute prefix.
     * @returns The public key.
     */
    static getPublicKey(privateKey, withZeroByte = true) {
        const keyPair = nacl.sign.keyPair.fromSeed(privateKey);
        const signPk = Buffer.from(keyPair.secretKey.slice(32));
        return withZeroByte
            ? Buffer.concat([Buffer.alloc(1, 0), signPk])
            : signPk;
    }
}
exports.Slip0010 = Slip0010;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpcDAwMTAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL3NsaXAwMDEwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBcUM7QUFDckMsZ0RBQWtDO0FBR2xDOzs7R0FHRztBQUNILE1BQWEsUUFBUTtJQUNqQjs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQVk7UUFJM0MsTUFBTSxJQUFJLEdBQUcscUJBQVUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDbEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQyxPQUFPO1lBQ0gsVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDL0IsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBWSxFQUFFLElBQWU7UUFJbEQsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXZELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUUxRSxNQUFNLE9BQU8sR0FBRyxxQkFBVSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7aUJBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7aUJBQ1osTUFBTSxFQUFFLENBQUM7WUFFZCxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakM7UUFDRCxPQUFPO1lBQ0gsVUFBVTtZQUNWLFNBQVM7U0FDWixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFrQixFQUFFLGVBQXdCLElBQUk7UUFDdkUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RCxPQUFPLFlBQVk7WUFDZixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDakIsQ0FBQztDQUNKO0FBL0RELDRCQStEQyJ9