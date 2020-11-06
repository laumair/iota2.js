"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Address = void 0;
var arrayHelper_1 = require("../utils/arrayHelper");
var blake2b_1 = require("./blake2b");
/**
 * Class to help with Ed25519 Signature scheme.
 */
var Ed25519Address = /** @class */ (function () {
    function Ed25519Address() {
    }
    /**
     * Convert the public key to an address.
     * @param publicKey The public key to convert.
     * @returns The address.
     */
    Ed25519Address.publicKeyToAddress = function (publicKey) {
        return blake2b_1.Blake2b.sum256(publicKey);
    };
    /**
     * Use the public key to validate the address.
     * @param publicKey The public key to verify with.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    Ed25519Address.verifyAddress = function (publicKey, address) {
        return arrayHelper_1.ArrayHelper.equal(Ed25519Address.publicKeyToAddress(publicKey), address);
    };
    /**
     * Address size.
     * @internal
     */
    Ed25519Address.ADDRESS_LENGTH = blake2b_1.Blake2b.SIZE_256;
    return Ed25519Address;
}());
exports.Ed25519Address = Ed25519Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOUFkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL2VkMjU1MTlBZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9EQUFtRDtBQUNuRCxxQ0FBb0M7QUFFcEM7O0dBRUc7QUFDSDtJQUFBO0lBeUJBLENBQUM7SUFsQkc7Ozs7T0FJRztJQUNXLGlDQUFrQixHQUFoQyxVQUFpQyxTQUFxQjtRQUNsRCxPQUFPLGlCQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLDRCQUFhLEdBQTNCLFVBQTRCLFNBQXFCLEVBQUUsT0FBbUI7UUFDbEUsT0FBTyx5QkFBVyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQXZCRDs7O09BR0c7SUFDVyw2QkFBYyxHQUFXLGlCQUFPLENBQUMsUUFBUSxDQUFDO0lBb0I1RCxxQkFBQztDQUFBLEFBekJELElBeUJDO0FBekJZLHdDQUFjIn0=