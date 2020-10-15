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
exports.send = void 0;
const sendAdvanced_1 = require("./sendAdvanced");
/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param address The address to send the funds to.
 * @param amount The amount to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
function send(client, seed, basePath, address, amount, startIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield sendAdvanced_1.sendAdvanced(client, seed, basePath, [{ address, amount }], startIndex);
        return {
            messageId: response.messageId,
            message: response.message
        };
    });
}
exports.send = send;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFJQSxpREFBOEM7QUFFOUM7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBc0IsSUFBSSxDQUN0QixNQUFlLEVBQ2YsSUFBVyxFQUNYLFFBQW1CLEVBQ25CLE9BQWUsRUFDZixNQUFjLEVBQ2QsVUFBbUI7O1FBSW5CLE1BQU0sUUFBUSxHQUFHLE1BQU0sMkJBQVksQ0FDL0IsTUFBTSxFQUNOLElBQUksRUFDSixRQUFRLEVBQ1IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRXZDLE9BQU87WUFDSCxTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7WUFDN0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO1NBQzVCLENBQUM7SUFDTixDQUFDO0NBQUE7QUFwQkQsb0JBb0JDIn0=