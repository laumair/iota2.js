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
exports.getUnspentAddress = void 0;
const ed25519_1 = require("../crypto/ed25519");
const common_1 = require("./common");
const getAddressesKeyPairs_1 = require("./getAddressesKeyPairs");
/**
 * Get the first unspent address.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @returns The first unspent address.
 */
function getUnspentAddress(client, seed, basePath, startIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
        let finished = false;
        let unspentAddress;
        let unspentAddressIndex;
        let unspentAmount = 0;
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
                            unspentAddress = addr;
                            unspentAddressIndex = localStartIndex + i;
                            unspentAmount += addressOutput.output.amount;
                        }
                    }
                }
                if (unspentAddress) {
                    finished = true;
                }
            }
            localStartIndex += common_1.DEFAULT_CHUNK_SIZE;
        } while (!finished);
        return unspentAddress && unspentAddressIndex !== undefined ? {
            address: unspentAddress,
            index: unspentAddressIndex,
            amount: unspentAmount
        } : undefined;
    });
}
exports.getUnspentAddress = getUnspentAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5zcGVudEFkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL2dldFVuc3BlbnRBZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLCtDQUE0QztBQUU1QyxxQ0FBOEM7QUFDOUMsaUVBQThEO0FBRTlEOzs7Ozs7O0dBT0c7QUFDSCxTQUFzQixpQkFBaUIsQ0FDbkMsTUFBZSxFQUNmLElBQVcsRUFDWCxRQUFtQixFQUNuQixVQUFtQjs7UUFLbkIsSUFBSSxlQUFlLEdBQUcsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLGNBQWtDLENBQUM7UUFDdkMsSUFBSSxtQkFBdUMsQ0FBQztRQUM1QyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFFdEIsR0FBRztZQUNDLE1BQU0sU0FBUyxHQUFHLDJDQUFvQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLDJCQUFrQixDQUFDLENBQUM7WUFFNUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZDLE1BQU0sSUFBSSxHQUFHLGlCQUFPLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNLGdCQUFnQixHQUFHLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFM0QsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDekMsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDbkI7cUJBQU07b0JBQ0gsS0FBSyxNQUFNLGVBQWUsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUU7d0JBQ3RELE1BQU0sYUFBYSxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFFM0QsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQ25DLFFBQVEsR0FBRyxJQUFJLENBQUM7eUJBQ25COzZCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFOzRCQUMvQixjQUFjLEdBQUcsSUFBSSxDQUFDOzRCQUN0QixtQkFBbUIsR0FBRyxlQUFlLEdBQUcsQ0FBQyxDQUFDOzRCQUMxQyxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7eUJBQ2hEO3FCQUNKO2lCQUNKO2dCQUVELElBQUksY0FBYyxFQUFFO29CQUNoQixRQUFRLEdBQUcsSUFBSSxDQUFDO2lCQUNuQjthQUNKO1lBRUQsZUFBZSxJQUFJLDJCQUFrQixDQUFDO1NBQ3pDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFFcEIsT0FBTyxjQUFjLElBQUksbUJBQW1CLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN6RCxPQUFPLEVBQUUsY0FBYztZQUN2QixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLE1BQU0sRUFBRSxhQUFhO1NBQ3hCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNsQixDQUFDO0NBQUE7QUFuREQsOENBbURDIn0=