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
        const output = yield client.output("00000000000000000000000000000000000000000000000000000000000000000000");
        console.log("Output");
        console.log("\tMessage Id:", output.messageId);
        console.log("\tTransaction Id:", output.transactionId);
        console.log("\tOutput Index:", output.outputIndex);
        console.log("\tIs Spent:", output.isSpent);
        iota2_js_1.logOutput("\t", output.output);
        console.log();
        const address = yield client.address(output.output.address.address);
        console.log("Address");
        console.log("\tAddress:", address.address);
        console.log("\tMax Results:", address.maxResults);
        console.log("\tCount:", address.count);
        console.log("\tBalance:", address.balance);
        console.log();
        const addressOutputs = yield client.addressOutputs(output.output.address.address);
        console.log("Address Outputs");
        console.log("\tAddress:", addressOutputs.address);
        console.log("\tMax Results:", addressOutputs.maxResults);
        console.log("\tCount:", addressOutputs.count);
        console.log("\tOutput Ids:", addressOutputs.outputIds);
        console.log();
        const seed = iota2_js_1.Ed25519Seed.fromString("256a818b2aac458941f7274985a410e57fb750f3a3a67969ece5bd9ae7eef5b2");
        console.log("Seed", seed.toString());
        const seedKeyPair = seed.generateKeyPair();
        console.log("KeyPair");
        console.log("\tPrivate Key:", seedKeyPair.privateKey);
        console.log("\tPublic Key:", seedKeyPair.publicKey);
        const seedAddress = iota2_js_1.Ed25519.signAddress(seedKeyPair.publicKey);
        console.log("Address:", seedAddress);
        const bip32Path = new iota2_js_1.Bip32Path();
        bip32Path.push(1);
        const subSeed = seed.generateSubseed(bip32Path);
        const subSeedKeyPair = subSeed.generateKeyPair();
        console.log("SubSeed KeyPair");
        console.log("\tPrivate Key:", subSeedKeyPair.privateKey);
        console.log("\tPublic Key:", subSeedKeyPair.publicKey);
        const subSeedAddress = iota2_js_1.Ed25519.signAddress(subSeedKeyPair.publicKey);
        console.log("SubSeed Address:", subSeedAddress);
        const tips = yield client.tips();
        const transactionEssence = {
            type: 0,
            inputs: [
                {
                    type: 0,
                    transactionId: "0000000000000000000000000000000000000000000000000000000000000000",
                    transactionOutputIndex: 0
                }
            ],
            outputs: [
                {
                    type: 0,
                    address: {
                        type: 1,
                        address: subSeedAddress
                    },
                    amount: 100
                }
            ]
        };
        const binaryEssenceBuffer = new iota2_js_1.WriteBuffer();
        iota2_js_1.serializeTransactionEssence(binaryEssenceBuffer, transactionEssence);
        const unlockBlocks = [
            {
                type: 0,
                signature: {
                    type: 1,
                    publicKey: seedKeyPair.publicKey,
                    signature: iota2_js_1.Ed25519.signData(seedKeyPair.privateKey, binaryEssenceBuffer.finalBuffer())
                }
            }
        ];
        const transactionPayload = {
            type: 0,
            essence: transactionEssence,
            unlockBlocks
        };
        const message = {
            version: 1,
            parent1MessageId: tips.tip1MessageId,
            parent2MessageId: tips.tip2MessageId,
            payload: transactionPayload,
            nonce: 0
        };
        console.log("Submitting Message");
        iota2_js_1.logMessage("", message);
        const createdMessageId = yield client.messageSubmit(message);
        console.log("Created Message Id", createdMessageId);
    });
}
run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK1A7QUFFL1AsTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7QUFFOUMsU0FBZSxHQUFHOztRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV4QyxNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0VBQXNFLENBQUMsQ0FBQztRQUMzRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0Msb0JBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVkLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxV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