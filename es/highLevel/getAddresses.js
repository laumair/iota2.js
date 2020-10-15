"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddresses = void 0;
const ed25519_1 = require("../crypto/ed25519");
const common_1 = require("./common");
const getAddressesKeyPairs_1 = require("./getAddressesKeyPairs");
/**
 * Generate a list of address key pairs.
 * @param seed The seed.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex The start index to generate from, defaults to 0.
 * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
 * @returns A list of the signature key pairs for the addresses.
 */
function getAddresses(seed, basePath, startIndex = 0, count = common_1.DEFAULT_CHUNK_SIZE) {
    return getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, startIndex, count).map(kp => ed25519_1.Ed25519.publicKeyToAddress(kp.publicKey));
}
exports.getAddresses = getAddresses;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWRkcmVzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9nZXRBZGRyZXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0NBQTRDO0FBRTVDLHFDQUE4QztBQUM5QyxpRUFBOEQ7QUFFOUQ7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLFlBQVksQ0FDeEIsSUFBVyxFQUNYLFFBQW1CLEVBQ25CLGFBQXFCLENBQUMsRUFDdEIsUUFBZ0IsMkJBQWtCO0lBQ2xDLE9BQU8sMkNBQW9CLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUN2SCxDQUFDO0FBTkQsb0NBTUMifQ==