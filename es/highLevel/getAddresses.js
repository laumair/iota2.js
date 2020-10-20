"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddresses = void 0;
var ed25519_1 = require("../crypto/ed25519");
var converter_1 = require("../utils/converter");
var common_1 = require("./common");
var getAddressesKeyPairs_1 = require("./getAddressesKeyPairs");
/**
 * Generate a list of address key pairs.
 * @param seed The seed.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex The start index to generate from, defaults to 0.
 * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
 * @returns A list of the signature key pairs for the addresses.
 */
function getAddresses(seed, basePath, startIndex, count) {
    if (startIndex === void 0) { startIndex = 0; }
    if (count === void 0) { count = common_1.DEFAULT_CHUNK_SIZE; }
    return getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, startIndex, count)
        .map(function (kp) { return converter_1.Converter.bytesToHex(ed25519_1.Ed25519.publicKeyToAddress(kp.publicKey)); });
}
exports.getAddresses = getAddresses;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWRkcmVzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9nZXRBZGRyZXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkNBQTRDO0FBRTVDLGdEQUErQztBQUMvQyxtQ0FBOEM7QUFDOUMsK0RBQThEO0FBRTlEOzs7Ozs7O0dBT0c7QUFDSCxTQUFnQixZQUFZLENBQ3hCLElBQVcsRUFDWCxRQUFtQixFQUNuQixVQUFzQixFQUN0QixLQUFrQztJQURsQywyQkFBQSxFQUFBLGNBQXNCO0lBQ3RCLHNCQUFBLEVBQUEsUUFBZ0IsMkJBQWtCO0lBQ2xDLE9BQU8sMkNBQW9CLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDO1NBQ3pELEdBQUcsQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLHFCQUFTLENBQUMsVUFBVSxDQUFDLGlCQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQTlELENBQThELENBQUMsQ0FBQztBQUNuRixDQUFDO0FBUEQsb0NBT0MifQ==