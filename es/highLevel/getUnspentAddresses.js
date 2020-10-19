"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnspentAddresses = void 0;
const ed25519_1 = require("../crypto/ed25519");
/**
 * Get all the unspent addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param countLimit Limit the number of items to find.
 * @returns All the unspent addresses.
 */
function getUnspentAddresses(client, seed, basePath, startIndex, countLimit) {
    return __awaiter(this, void 0, void 0, function* () {
        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
        const localCountLimit = countLimit !== null && countLimit !== void 0 ? countLimit : Number.MAX_SAFE_INTEGER;
        let finished = false;
        const allUnspent = [];
        do {
            basePath.push(localStartIndex);
            const addressKeyPair = seed.generateSeedFromPath(basePath).keyPair();
            basePath.pop();
            const addr = ed25519_1.Ed25519.publicKeyToAddress(addressKeyPair.publicKey);
            const addressResponse = yield client.address(addr);
            // If there are no outputs for the address we have reached the
            // end of the used addresses
            if (addressResponse.count === 0) {
                finished = true;
            }
            else {
                allUnspent.push({
                    address: addr,
                    index: localStartIndex,
                    balance: addressResponse.balance
                });
                if (allUnspent.length === localCountLimit) {
                    finished = true;
                }
            }
            localStartIndex++;
        } while (!finished);
        return allUnspent;
    });
}
exports.getUnspentAddresses = getUnspentAddresses;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5zcGVudEFkZHJlc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvZ2V0VW5zcGVudEFkZHJlc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSwrQ0FBNEM7QUFHNUM7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFzQixtQkFBbUIsQ0FDckMsTUFBZSxFQUNmLElBQVcsRUFDWCxRQUFtQixFQUNuQixVQUFtQixFQUNuQixVQUFtQjs7UUFLbkIsSUFBSSxlQUFlLEdBQUcsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sZUFBZSxHQUFHLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5RCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsTUFBTSxVQUFVLEdBSVYsRUFBRSxDQUFDO1FBRVQsR0FBRztZQUNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDL0IsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVmLE1BQU0sSUFBSSxHQUFHLGlCQUFPLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sZUFBZSxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVuRCw4REFBOEQ7WUFDOUQsNEJBQTRCO1lBQzVCLElBQUksZUFBZSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQztvQkFDWixPQUFPLEVBQUUsSUFBSTtvQkFDYixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsT0FBTyxFQUFFLGVBQWUsQ0FBQyxPQUFPO2lCQUNuQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLGVBQWUsRUFBRTtvQkFDdkMsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDbkI7YUFDSjtZQUVELGVBQWUsRUFBRSxDQUFDO1NBQ3JCLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFFcEIsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztDQUFBO0FBL0NELGtEQStDQyJ9