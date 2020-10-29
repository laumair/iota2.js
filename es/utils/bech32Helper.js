"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bech32Helper = void 0;
/* eslint-disable no-bitwise */
var bech32_1 = require("../crypto/bech32");
/**
 * Convert address to bech32.
 */
var Bech32Helper = /** @class */ (function () {
    function Bech32Helper() {
    }
    /**
     * Encode an address to bech32.
     * @param addressType The address type to encode.
     * @param addressBytes The address bytes to encode.
     * @returns The array formated as hex.
     */
    Bech32Helper.toBech32 = function (addressType, addressBytes) {
        var addressData = new Uint8Array(1 + addressBytes.length);
        addressData[0] = addressType;
        addressData.set(addressBytes, 1);
        return bech32_1.Bech32.encode(Bech32Helper.BECH32_HRP, addressData);
    };
    /**
     * Decode an address from bech32.
     * @param bech32Text The bech32 test to decode.
     * @returns The address type and address bytes or undefined if it cannot be decoded.
     */
    Bech32Helper.fromBech32 = function (bech32Text) {
        var decoded = bech32_1.Bech32.decode(bech32Text);
        if (decoded) {
            if (decoded.humanReadablePart !== Bech32Helper.BECH32_HRP) {
                throw new Error("The hrp part of the address should be " + Bech32Helper.BECH32_HRP + ", it is " + decoded.humanReadablePart);
            }
            if (decoded.data.length === 0) {
                throw new Error("The data part of the address should be at least length 1, it is 0");
            }
            var addressType = decoded.data[0];
            var addressBytes = decoded.data.slice(1);
            return {
                addressType: addressType,
                addressBytes: addressBytes
            };
        }
    };
    /**
     * The human readable part of the bech32 addresses.
     */
    Bech32Helper.BECH32_HRP = "iot";
    return Bech32Helper;
}());
exports.Bech32Helper = Bech32Helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVjaDMySGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2JlY2gzMkhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0IsMkNBQTBDO0FBRTFDOztHQUVHO0FBQ0g7SUFBQTtJQWdEQSxDQUFDO0lBMUNHOzs7OztPQUtHO0lBQ1cscUJBQVEsR0FBdEIsVUFBdUIsV0FBbUIsRUFBRSxZQUF3QjtRQUNoRSxJQUFNLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7UUFDN0IsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsT0FBTyxlQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyx1QkFBVSxHQUF4QixVQUF5QixVQUFrQjtRQUl2QyxJQUFNLE9BQU8sR0FBRyxlQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxPQUFPLENBQUMsaUJBQWlCLEtBQUssWUFBWSxDQUFDLFVBQVUsRUFBRTtnQkFDdkQsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBeUMsWUFBWSxDQUFDLFVBQVUsZ0JBQ2pFLE9BQU8sQ0FBQyxpQkFBbUIsQ0FBQyxDQUFDO2FBQy9DO1lBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQzthQUN4RjtZQUVELElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0MsT0FBTztnQkFDSCxXQUFXLGFBQUE7Z0JBQ1gsWUFBWSxjQUFBO2FBQ2YsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQTlDRDs7T0FFRztJQUNXLHVCQUFVLEdBQVcsS0FBSyxDQUFDO0lBNEM3QyxtQkFBQztDQUFBLEFBaERELElBZ0RDO0FBaERZLG9DQUFZIn0=