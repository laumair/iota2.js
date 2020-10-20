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
        const genesisSeed = iota2_js_1.Ed25519Seed.fromBytes(iota2_js_1.Converter.hexToBytes("256a818b2aac458941f7274985a410e57fb750f3a3a67969ece5bd9ae7eef5b2"));
        console.log("Genesis");
        console.log("\tSeed:", iota2_js_1.Converter.bytesToHex(genesisSeed.toBytes()));
        const genesisSeedKeyPair = genesisSeed.keyPair();
        console.log("\tPrivate Key:", iota2_js_1.Converter.bytesToHex(genesisSeedKeyPair.privateKey));
        console.log("\tPublic Key:", iota2_js_1.Converter.bytesToHex(genesisSeedKeyPair.publicKey));
        const genesisAddressPath = new iota2_js_1.Bip32Path("m/0");
        const firstAddressSeed = genesisSeed.generateSeedFromPath(genesisAddressPath);
        console.log(`\tAddress for ${genesisAddressPath.toString()}:`, iota2_js_1.Converter.bytesToHex(iota2_js_1.Ed25519.publicKeyToAddress(firstAddressSeed.keyPair().publicKey)));
        console.log();
        const newSeed = iota2_js_1.Ed25519Seed.fromBytes(iota2_js_1.Converter.hexToBytes("e57fb750f3a3a67969ece5bd9ae7eef5b2256a818b2aac458941f7274985a410"));
        const newAddressPath = new iota2_js_1.Bip32Path("m/0");
        const newAddressSeed = newSeed.generateSeedFromPath(newAddressPath);
        const newAddress = iota2_js_1.Converter.bytesToHex(iota2_js_1.Ed25519.publicKeyToAddress(newAddressSeed.keyPair().publicKey));
        console.log("New");
        console.log("\tSeed:", iota2_js_1.Converter.bytesToHex(newSeed.toBytes()));
        console.log(`\tAddress ${newAddressPath.toString()}:`, newAddress);
        console.log();
        const { messageId } = yield iota2_js_1.sendAdvanced(client, genesisSeed, new iota2_js_1.Bip32Path(), [
            {
                address: newAddress,
                amount: 100
            }
        ], 0, "foo", iota2_js_1.Converter.asciiToBytes("bar"));
        console.log("Created Message Id", messageId);
        const newAddressBalance = yield iota2_js_1.getBalance(client, newSeed, new iota2_js_1.Bip32Path());
        console.log("New Address Balance", newAddressBalance);
        const unspentAddress = yield iota2_js_1.getUnspentAddress(client, newSeed, new iota2_js_1.Bip32Path());
        console.log("First Unspent Address", unspentAddress);
        const allUspentAddresses = yield iota2_js_1.getUnspentAddresses(client, newSeed, new iota2_js_1.Bip32Path());
        console.log("Unspent Addresses", allUspentAddresses);
    });
}
run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBaUw7QUFFakwsTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7QUFFOUMsU0FBZSxHQUFHOztRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEQsTUFBTSxXQUFXLEdBQVUsc0JBQVcsQ0FBQyxTQUFTLENBQUMsb0JBQVMsQ0FBQyxVQUFVLENBQUMsa0VBQWtFLENBQUMsQ0FBQyxDQUFDO1FBQzNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsb0JBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVwRSxNQUFNLGtCQUFrQixHQUFhLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLG9CQUFTLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDbkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsb0JBQVMsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUVqRixNQUFNLGtCQUFrQixHQUFHLElBQUksb0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsb0JBQVMsQ0FBQyxVQUFVLENBQUMsa0JBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkosT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWQsTUFBTSxPQUFPLEdBQWdCLHNCQUFXLENBQUMsU0FBUyxDQUFDLG9CQUFTLENBQUMsVUFBVSxDQUFDLGtFQUFrRSxDQUFDLENBQUMsQ0FBQztRQUU3SSxNQUFNLGNBQWMsR0FBRyxJQUFJLG9CQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsTUFBTSxjQUFjLEdBQVUsT0FBTyxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sVUFBVSxHQUFXLG9CQUFTLENBQUMsVUFBVSxDQUFDLGtCQUFPLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDaEgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxvQkFBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxjQUFjLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNuRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFZCxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsTUFBTSx1QkFBWSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxvQkFBUyxFQUFFLEVBQUU7WUFDM0U7Z0JBQ0ksT0FBTyxFQUFFLFVBQVU7Z0JBQ25CLE1BQU0sRUFBRSxHQUFHO2FBQ2Q7U0FDSixFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsb0JBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTdDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxvQkFBUyxFQUFFLENBQUMsQ0FBQztRQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFdEQsTUFBTSxjQUFjLEdBQUcsTUFBTSw0QkFBaUIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksb0JBQVMsRUFBRSxDQUFDLENBQUM7UUFDakYsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUVyRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sOEJBQW1CLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLG9CQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUN6RCxDQUFDO0NBQUE7QUFHRCxHQUFHLEVBQUU7S0FDQSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQixLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyJ9