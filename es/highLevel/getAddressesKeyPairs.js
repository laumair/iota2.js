"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddressesKeyPairs = void 0;
const common_1 = require("./common");
/**
 * Generate a list of address key pairs.
 * @param seed The seed.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex The start index to generate from, defaults to 0.
 * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
 * @returns A list of the signature key pairs for the addresses.
 */
function getAddressesKeyPairs(seed, basePath, startIndex = 0, count = common_1.DEFAULT_CHUNK_SIZE) {
    const keyPairs = [];
    for (let i = startIndex; i < startIndex + count; i++) {
        basePath.push(i);
        const newSeed = seed.generateSeedFromPath(basePath);
        keyPairs.push(newSeed.keyPair());
        basePath.pop();
    }
    return keyPairs;
}
exports.getAddressesKeyPairs = getAddressesKeyPairs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWRkcmVzc2VzS2V5UGFpcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL2dldEFkZHJlc3Nlc0tleVBhaXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHFDQUE4QztBQUU5Qzs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQ2hDLElBQVcsRUFDWCxRQUFtQixFQUNuQixhQUFxQixDQUFDLEVBQ3RCLFFBQWdCLDJCQUFrQjtJQUNsQyxNQUFNLFFBQVEsR0FBZSxFQUFFLENBQUM7SUFFaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxHQUFHLFVBQVUsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEQsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVqQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDbEI7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBakJELG9EQWlCQyJ9