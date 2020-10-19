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
const getUnspentAddresses_1 = require("./getUnspentAddresses");
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
        const allUnspent = yield getUnspentAddresses_1.getUnspentAddresses(client, seed, basePath, startIndex, 1);
        return allUnspent.length > 0 ? allUnspent[0] : undefined;
    });
}
exports.getUnspentAddress = getUnspentAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5zcGVudEFkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL2dldFVuc3BlbnRBZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLCtEQUE0RDtBQUU1RDs7Ozs7OztHQU9HO0FBQ0gsU0FBc0IsaUJBQWlCLENBQ25DLE1BQWUsRUFDZixJQUFXLEVBQ1gsUUFBbUIsRUFDbkIsVUFBbUI7O1FBS25CLE1BQU0sVUFBVSxHQUFHLE1BQU0seUNBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBGLE9BQU8sVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzdELENBQUM7Q0FBQTtBQVpELDhDQVlDIn0=