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
const iota2_js_1 = require("@iota/iota2.js");
const API_ENDPOINT = "http://localhost:14265";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new iota2_js_1.Client(API_ENDPOINT);
        const genesisSeed = iota2_js_1.Ed25519Seed.fromString("256a818b2aac458941f7274985a410e57fb750f3a3a67969ece5bd9ae7eef5b2");
        console.log("Genesis");
        console.log("\tSeed:", genesisSeed.toString());
        const genesisSeedKeyPair = genesisSeed.generateKeyPair();
        console.log("\tPrivate Key:", genesisSeedKeyPair.privateKey);
        console.log("\tPublic Key:", genesisSeedKeyPair.publicKey);
        console.log("\tFirst Address:", iota2_js_1.Ed25519.signAddress(genesisSeedKeyPair.publicKey));
        console.log();
        const newSeed = iota2_js_1.Ed25519Seed.fromString("e57fb750f3a3a67969ece5bd9ae7eef5b2256a818b2aac458941f7274985a410");
        const newAddress = iota2_js_1.Ed25519.signAddress(newSeed.generateKeyPair().publicKey);
        console.log("New");
        console.log("\tSeed:", newSeed.toString());
        console.log("\tAddress:", newAddress);
        console.log();
        const { messageId, remainderAddress } = yield iota2_js_1.sendTransfer(client, genesisSeed, [
            {
                address: newAddress,
                amount: 100
            }
        ], "foo", Buffer.from("bar").toString("hex"));
        console.log("Created Message Id", messageId);
        console.log("Remainder Address", remainderAddress);
    });
}
run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0Y7QUFFL0YsTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7QUFFOUMsU0FBZSxHQUFHOztRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV4QyxNQUFNLFdBQVcsR0FBZ0Isc0JBQVcsQ0FBQyxVQUFVLENBQUMsa0VBQWtFLENBQUMsQ0FBQztRQUM1SCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sa0JBQWtCLEdBQXNCLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsa0JBQU8sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNuRixPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFZCxNQUFNLE9BQU8sR0FBZ0Isc0JBQVcsQ0FBQyxVQUFVLENBQUMsa0VBQWtFLENBQUMsQ0FBQztRQUN4SCxNQUFNLFVBQVUsR0FBVyxrQkFBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFZCxNQUFNLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLEdBQUcsTUFBTSx1QkFBWSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUU7WUFDNUU7Z0JBQ0ksT0FBTyxFQUFFLFVBQVU7Z0JBQ25CLE1BQU0sRUFBRSxHQUFHO2FBQ2Q7U0FDSixFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Q0FBQTtBQUdELEdBQUcsRUFBRTtLQUNBLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9CLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDIn0=