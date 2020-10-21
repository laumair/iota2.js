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
var nacl = __importStar(require("tweetnacl"));
var arrayHelper_1 = require("../utils/arrayHelper");
var blake2b_1 = require("./blake2b");
/**
 * Class to help with Ed25519 Signature scheme.
 */
var Ed25519 = /** @class */ (function () {
    function Ed25519() {
    }
    /**
     * Privately sign the data.
     * @param privateKey The private key to sign with.
     * @param data The data to sign.
     * @returns The signature.
     */
    Ed25519.signData = function (privateKey, data) {
        return nacl.sign.detached(data, privateKey);
    };
    /**
     * Use the public key and signature to validate the data.
     * @param publicKey The public key to verify with.
     * @param signature The signature to verify.
     * @param data The data to verify.
     * @returns True if the data and address is verified.
     */
    Ed25519.verifyData = function (publicKey, signature, data) {
        return nacl.sign.detached.verify(data, signature, publicKey);
    };
    /**
     * Convert the public key to an address.
     * @param publicKey The public key to convert.
     * @returns The address.
     */
    Ed25519.publicKeyToAddress = function (publicKey) {
        return blake2b_1.Blake2b.sum256(publicKey);
    };
    /**
     * Use the public key to validate the address.
     * @param publicKey The public key to verify with.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    Ed25519.verifyAddress = function (publicKey, address) {
        return arrayHelper_1.ArrayHelper.equal(Ed25519.publicKeyToAddress(publicKey), address);
    };
    /**
     * Public Key size.
     * @internal
     */
    Ed25519.PUBLIC_KEY_SIZE = 32;
    /**
     * Signature size for signing scheme.
     * @internal
     */
    Ed25519.SIGNATURE_SIZE = 64;
    /**
     * Address size.
     * @internal
     */
    Ed25519.ADDRESS_LENGTH = blake2b_1.Blake2b.SIZE_256;
    return Ed25519;
}());
exports.Ed25519 = Ed25519;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vZWQyNTUxOS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQWtDO0FBQ2xDLG9EQUFtRDtBQUNuRCxxQ0FBb0M7QUFFcEM7O0dBRUc7QUFDSDtJQUFBO0lBMERBLENBQUM7SUF2Q0c7Ozs7O09BS0c7SUFDVyxnQkFBUSxHQUF0QixVQUF1QixVQUFzQixFQUFFLElBQWdCO1FBQzNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVyxrQkFBVSxHQUF4QixVQUF5QixTQUFxQixFQUFFLFNBQXFCLEVBQUUsSUFBZ0I7UUFDbkYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLDBCQUFrQixHQUFoQyxVQUFpQyxTQUFxQjtRQUNsRCxPQUFPLGlCQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLHFCQUFhLEdBQTNCLFVBQTRCLFNBQXFCLEVBQUUsT0FBbUI7UUFDbEUsT0FBTyx5QkFBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQXhERDs7O09BR0c7SUFDVyx1QkFBZSxHQUFXLEVBQUUsQ0FBQztJQUUzQzs7O09BR0c7SUFDVyxzQkFBYyxHQUFXLEVBQUUsQ0FBQztJQUUxQzs7O09BR0c7SUFDVyxzQkFBYyxHQUFXLGlCQUFPLENBQUMsUUFBUSxDQUFDO0lBeUM1RCxjQUFDO0NBQUEsQUExREQsSUEwREM7QUExRFksMEJBQU8ifQ==