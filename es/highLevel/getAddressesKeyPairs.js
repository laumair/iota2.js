"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddressesKeyPairs = void 0;
var common_1 = require("./common");
/**
 * Generate a list of address key pairs.
 * @param seed The seed.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex The start index to generate from, defaults to 0.
 * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
 * @returns A list of the signature key pairs for the addresses.
 */
function getAddressesKeyPairs(seed, basePath, startIndex, count) {
    if (startIndex === void 0) { startIndex = 0; }
    if (count === void 0) { count = common_1.DEFAULT_CHUNK_SIZE; }
    var keyPairs = [];
    for (var i = startIndex; i < startIndex + count; i++) {
        basePath.push(i);
        var newSeed = seed.generateSeedFromPath(basePath);
        keyPairs.push(newSeed.keyPair());
        basePath.pop();
    }
    return keyPairs;
}
exports.getAddressesKeyPairs = getAddressesKeyPairs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWRkcmVzc2VzS2V5UGFpcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL2dldEFkZHJlc3Nlc0tleVBhaXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLG1DQUE4QztBQUU5Qzs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQ2hDLElBQVcsRUFDWCxRQUFtQixFQUNuQixVQUFzQixFQUN0QixLQUFrQztJQURsQywyQkFBQSxFQUFBLGNBQXNCO0lBQ3RCLHNCQUFBLEVBQUEsUUFBZ0IsMkJBQWtCO0lBQ2xDLElBQU0sUUFBUSxHQUFlLEVBQUUsQ0FBQztJQUVoQyxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEdBQUcsVUFBVSxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsRCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWpDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNsQjtJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFqQkQsb0RBaUJDIn0=