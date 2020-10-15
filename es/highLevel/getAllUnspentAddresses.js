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
exports.getAllUnspentAddresses = void 0;
const ed25519_1 = require("../crypto/ed25519");
const common_1 = require("./common");
const getAddressesKeyPairs_1 = require("./getAddressesKeyPairs");
/**
 * Get all the unspent addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @returns All the unspent addresses.
 */
function getAllUnspentAddresses(client, seed, basePath, startIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
        let finished = false;
        const allUnspent = [];
        do {
            const addresses = getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, localStartIndex, common_1.DEFAULT_CHUNK_SIZE);
            for (let i = 0; i < addresses.length; i++) {
                const addr = ed25519_1.Ed25519.publicKeyToAddress(addresses[i].publicKey);
                const addressOutputIds = yield client.addressOutputs(addr);
                let amount = 0;
                for (const addressOutputId of addressOutputIds.outputIds) {
                    const addressOutput = yield client.output(addressOutputId);
                    if (!addressOutput.isSpent && addressOutput.output.amount !== 0) {
                        amount += addressOutput.output.amount;
                    }
                }
                if (amount === 0) {
                    finished = true;
                }
                else {
                    allUnspent.push({
                        address: addr,
                        index: localStartIndex + i,
                        amount
                    });
                }
            }
            localStartIndex += common_1.DEFAULT_CHUNK_SIZE;
        } while (!finished);
        return allUnspent;
    });
}
exports.getAllUnspentAddresses = getAllUnspentAddresses;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWxsVW5zcGVudEFkZHJlc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvZ2V0QWxsVW5zcGVudEFkZHJlc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSwrQ0FBNEM7QUFFNUMscUNBQThDO0FBQzlDLGlFQUE4RDtBQUU5RDs7Ozs7OztHQU9HO0FBQ0gsU0FBc0Isc0JBQXNCLENBQ3hDLE1BQWUsRUFDZixJQUFXLEVBQ1gsUUFBbUIsRUFDbkIsVUFBbUI7O1FBS25CLElBQUksZUFBZSxHQUFHLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsTUFBTSxVQUFVLEdBSVYsRUFBRSxDQUFDO1FBRVQsR0FBRztZQUNDLE1BQU0sU0FBUyxHQUFHLDJDQUFvQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLDJCQUFrQixDQUFDLENBQUM7WUFFNUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZDLE1BQU0sSUFBSSxHQUFHLGlCQUFPLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNLGdCQUFnQixHQUFHLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFM0QsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUVmLEtBQUssTUFBTSxlQUFlLElBQUksZ0JBQWdCLENBQUMsU0FBUyxFQUFFO29CQUN0RCxNQUFNLGFBQWEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBRTNELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDN0QsTUFBTSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO3FCQUN6QztpQkFDSjtnQkFFRCxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ2QsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDbkI7cUJBQU07b0JBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQzt3QkFDWixPQUFPLEVBQUUsSUFBSTt3QkFDYixLQUFLLEVBQUUsZUFBZSxHQUFHLENBQUM7d0JBQzFCLE1BQU07cUJBQ1QsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7WUFFRCxlQUFlLElBQUksMkJBQWtCLENBQUM7U0FDekMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUVwQixPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0NBQUE7QUFqREQsd0RBaURDIn0=