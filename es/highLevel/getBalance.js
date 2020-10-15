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
exports.getBalance = void 0;
const ed25519_1 = require("../crypto/ed25519");
const common_1 = require("./common");
const getAddressesKeyPairs_1 = require("./getAddressesKeyPairs");
/**
 * Get the balance for the address.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @returns The balance.
 */
function getBalance(client, seed, basePath, startIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
        let finished = false;
        let balance = 0;
        do {
            const addresses = getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, localStartIndex, common_1.DEFAULT_CHUNK_SIZE);
            for (let i = 0; i < addresses.length; i++) {
                const addr = ed25519_1.Ed25519.publicKeyToAddress(addresses[i].publicKey);
                const addressOutputIds = yield client.addressOutputs(addr);
                if (addressOutputIds.outputIds.length === 0) {
                    finished = true;
                }
                else {
                    for (const addressOutputId of addressOutputIds.outputIds) {
                        const addressOutput = yield client.output(addressOutputId);
                        if (addressOutput.output.amount === 0) {
                            finished = true;
                        }
                        else if (!addressOutput.isSpent) {
                            balance += addressOutput.output.amount;
                        }
                    }
                }
            }
            localStartIndex += common_1.DEFAULT_CHUNK_SIZE;
        } while (!finished);
        return balance;
    });
}
exports.getBalance = getBalance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvZ2V0QmFsYW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSwrQ0FBNEM7QUFFNUMscUNBQThDO0FBQzlDLGlFQUE4RDtBQUU5RDs7Ozs7OztHQU9HO0FBQ0gsU0FBc0IsVUFBVSxDQUM1QixNQUFlLEVBQ2YsSUFBVyxFQUNYLFFBQW1CLEVBQ25CLFVBQW1COztRQUNuQixJQUFJLGVBQWUsR0FBRyxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUVoQixHQUFHO1lBQ0MsTUFBTSxTQUFTLEdBQUcsMkNBQW9CLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsMkJBQWtCLENBQUMsQ0FBQztZQUU1RixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2hFLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUUzRCxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUN6QyxRQUFRLEdBQUcsSUFBSSxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDSCxLQUFLLE1BQU0sZUFBZSxJQUFJLGdCQUFnQixDQUFDLFNBQVMsRUFBRTt3QkFDdEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUUzRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs0QkFDbkMsUUFBUSxHQUFHLElBQUksQ0FBQzt5QkFDbkI7NkJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7NEJBQy9CLE9BQU8sSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzt5QkFDMUM7cUJBQ0o7aUJBQ0o7YUFDSjtZQUVELGVBQWUsSUFBSSwyQkFBa0IsQ0FBQztTQUN6QyxRQUFRLENBQUMsUUFBUSxFQUFFO1FBRXBCLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7Q0FBQTtBQW5DRCxnQ0FtQ0MifQ==