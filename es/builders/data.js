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
exports.sendData = void 0;
/**
 * Send a data transfer.
 * @param client The client to send the transfer with.
 * @param index The index name.
 * @param data The index data.
 * @returns The id of the message created.
 */
function sendData(client, index, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const indexationPayload = {
            type: 2,
            index,
            data
        };
        const tips = yield client.tips();
        const message = {
            version: 1,
            parent1MessageId: tips.tip1MessageId,
            parent2MessageId: tips.tip2MessageId,
            payload: indexationPayload,
            nonce: 0
        };
        return client.messageSubmit(message);
    });
}
exports.sendData = sendData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9idWlsZGVycy9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUlBOzs7Ozs7R0FNRztBQUNILFNBQXNCLFFBQVEsQ0FBQyxNQUFjLEVBQUUsS0FBYSxFQUFFLElBQVk7O1FBQ3RFLE1BQU0saUJBQWlCLEdBQXVCO1lBQzFDLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSztZQUNMLElBQUk7U0FDUCxDQUFDO1FBRUYsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFakMsTUFBTSxPQUFPLEdBQWE7WUFDdEIsT0FBTyxFQUFFLENBQUM7WUFDVixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNwQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNwQyxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQztRQUVGLE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQUE7QUFsQkQsNEJBa0JDIn0=