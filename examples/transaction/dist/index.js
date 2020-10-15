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
        const client = new iota2_js_1.SingleNodeClient(API_ENDPOINT);
        const genesisSeed = iota2_js_1.Ed25519Seed.fromString("256a818b2aac458941f7274985a410e57fb750f3a3a67969ece5bd9ae7eef5b2");
        console.log("Genesis");
        console.log("\tSeed:", genesisSeed.toString());
        const genesisSeedKeyPair = genesisSeed.keyPair();
        console.log("\tPrivate Key:", genesisSeedKeyPair.privateKey);
        console.log("\tPublic Key:", genesisSeedKeyPair.publicKey);
        const genesisAddressPath = new iota2_js_1.Bip32Path("m/0");
        const firstAddressSeed = genesisSeed.generateSeedFromPath(genesisAddressPath);
        console.log(`\tAddress for ${genesisAddressPath.toString()}:`, iota2_js_1.Ed25519.publicKeyToAddress(firstAddressSeed.keyPair().publicKey));
        console.log();
        const newSeed = iota2_js_1.Ed25519Seed.fromString("e57fb750f3a3a67969ece5bd9ae7eef5b2256a818b2aac458941f7274985a410");
        const newAddressPath = new iota2_js_1.Bip32Path("m/0");
        const newAddressSeed = newSeed.generateSeedFromPath(newAddressPath);
        const newAddress = iota2_js_1.Ed25519.publicKeyToAddress(newAddressSeed.keyPair().publicKey);
        console.log("New");
        console.log("\tSeed:", newSeed.toString());
        console.log(`\tAddress ${newAddressPath.toString()}:`, newAddress);
        console.log();
        const { messageId, remainderAddress } = yield iota2_js_1.sendAdvanced(client, genesisSeed, new iota2_js_1.Bip32Path(), [
            {
                address: newAddress,
                amount: 100
            }
        ], 0, "foo", Buffer.from("bar"));
        console.log("Created Message Id", messageId);
        console.log("Remainder Address", remainderAddress);
        const newAddressBalance = yield iota2_js_1.getBalance(client, newSeed, new iota2_js_1.Bip32Path());
        console.log("New Address Balance", newAddressBalance);
        const unspentAddress = yield iota2_js_1.getUnspentAddress(client, newSeed, new iota2_js_1.Bip32Path());
        console.log("First Unspent Address", unspentAddress);
        const allUspentAddresses = yield iota2_js_1.getAllUnspentAddresses(client, newSeed, new iota2_js_1.Bip32Path());
        console.log("Unspent Addresses", allUspentAddresses);
    });
}
run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBeUs7QUFFekssTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7QUFFOUMsU0FBZSxHQUFHOztRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEQsTUFBTSxXQUFXLEdBQVUsc0JBQVcsQ0FBQyxVQUFVLENBQUMsa0VBQWtFLENBQUMsQ0FBQztRQUN0SCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sa0JBQWtCLEdBQWEsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0QsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLG9CQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5RSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGtCQUFPLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNqSSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFZCxNQUFNLE9BQU8sR0FBZ0Isc0JBQVcsQ0FBQyxVQUFVLENBQUMsa0VBQWtFLENBQUMsQ0FBQztRQUV4SCxNQUFNLGNBQWMsR0FBRyxJQUFJLG9CQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsTUFBTSxjQUFjLEdBQVUsT0FBTyxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sVUFBVSxHQUFXLGtCQUFPLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLGNBQWMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ25FLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVkLE1BQU0sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxNQUFNLHVCQUFZLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLG9CQUFTLEVBQUUsRUFBRTtZQUM3RjtnQkFDSSxPQUFPLEVBQUUsVUFBVTtnQkFDbkIsTUFBTSxFQUFFLEdBQUc7YUFDZDtTQUNKLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFbkQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHFCQUFVLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLG9CQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUV0RCxNQUFNLGNBQWMsR0FBRyxNQUFNLDRCQUFpQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxvQkFBUyxFQUFFLENBQUMsQ0FBQztRQUNqRixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRXJELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxpQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksb0JBQVMsRUFBRSxDQUFDLENBQUM7UUFDMUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FBQTtBQUdELEdBQUcsRUFBRTtLQUNBLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9CLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDIn0=