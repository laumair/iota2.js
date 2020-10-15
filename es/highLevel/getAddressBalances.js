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
exports.getAddressBalances = void 0;
/**
 * Get the balance for a list of addresses.
 * @param client The client to send the transfer with.
 * @param addresses The list of addresses to get the balance for.
 * @returns The balances.
 */
function getAddressBalances(client, addresses) {
    return __awaiter(this, void 0, void 0, function* () {
        const balances = [];
        for (const address of addresses) {
            const addressOutputIds = yield client.addressOutputs(address);
            let balance = 0;
            for (const addressOutputId of addressOutputIds.outputIds) {
                const addressOutput = yield client.output(addressOutputId);
                if (!addressOutput.isSpent) {
                    balance += addressOutput.output.amount;
                }
            }
            balances.push(balance);
        }
        return balances;
    });
}
exports.getAddressBalances = getAddressBalances;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWRkcmVzc0JhbGFuY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9nZXRBZGRyZXNzQmFsYW5jZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7O0dBS0c7QUFDSCxTQUFzQixrQkFBa0IsQ0FDcEMsTUFBZSxFQUNmLFNBQW1COztRQUNuQixNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7UUFFOUIsS0FBSyxNQUFNLE9BQU8sSUFBSSxTQUFTLEVBQUU7WUFDN0IsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBRWhCLEtBQUssTUFBTSxlQUFlLElBQUksZ0JBQWdCLENBQUMsU0FBUyxFQUFFO2dCQUN0RCxNQUFNLGFBQWEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBRTNELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO29CQUN4QixPQUFPLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7aUJBQzFDO2FBQ0o7WUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzFCO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztDQUFBO0FBckJELGdEQXFCQyJ9