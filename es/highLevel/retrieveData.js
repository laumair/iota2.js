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
exports.retrieveData = void 0;
/**
 * Retrieve a data message.
 * @param client The client to send the transfer with.
 * @param messageId The message id of the data to get.
 * @returns The message index and data.
 */
function retrieveData(client, messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = yield client.message(messageId);
        if (message === null || message === void 0 ? void 0 : message.payload) {
            let indexationPayload;
            if (message.payload.type === 0) {
                indexationPayload = message.payload.essence.payload;
            }
            else if (message.payload.type === 2) {
                indexationPayload = message.payload;
            }
            if (indexationPayload) {
                return {
                    index: indexationPayload.index,
                    data: Buffer.from(indexationPayload.data, "hex")
                };
            }
        }
    });
}
exports.retrieveData = retrieveData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cmlldmVEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9yZXRyaWV2ZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7O0dBS0c7QUFDSCxTQUFzQixZQUFZLENBQUMsTUFBZSxFQUFFLFNBQWlCOztRQUlqRSxNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFaEQsSUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsT0FBTyxFQUFFO1lBQ2xCLElBQUksaUJBQWlELENBQUM7WUFFdEQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN2RDtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDbkMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN2QztZQUVELElBQUksaUJBQWlCLEVBQUU7Z0JBQ25CLE9BQU87b0JBQ0gsS0FBSyxFQUFFLGlCQUFpQixDQUFDLEtBQUs7b0JBQzlCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7aUJBQ25ELENBQUM7YUFDTDtTQUNKO0lBQ0wsQ0FBQztDQUFBO0FBdEJELG9DQXNCQyJ9