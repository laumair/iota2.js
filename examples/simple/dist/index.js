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
        const health = yield client.health();
        console.log("Is the node healthy", health ? "Yes" : "No");
        const info = yield client.info();
        console.log("Node Info");
        console.log("\tName:", info.name);
        console.log("\tVersion:", info.version);
        console.log("\tIs Healthy:", info.isHealthy);
        console.log("\tCoordinator Public Key:", info.coordinatorPublicKey);
        console.log("\tLatest Milestone Message Id:", info.latestMilestoneMessageId);
        console.log("\tLatest Milestone Index:", info.latestMilestoneIndex);
        console.log("\tSolid Milestone Message Id:", info.solidMilestoneMessageId);
        console.log("\tSolid Milestone Index:", info.solidMilestoneIndex);
        console.log("\tPruning Index:", info.pruningIndex);
        console.log("\tFeatures:", info.features);
        console.log();
        const tips = yield client.tips();
        console.log("Tips");
        console.log("\tTip 1 Message Id:", tips.tip1MessageId);
        console.log("\tTip 2 Message Id:", tips.tip2MessageId);
        console.log();
        const submitMessage = {
            version: 1,
            parent1MessageId: tips.tip1MessageId,
            parent2MessageId: tips.tip2MessageId,
            payload: {
                type: 2,
                index: "Foo",
                data: Buffer.from("Bar").toString("hex")
            }
        };
        const messageId = yield client.messageSubmit(submitMessage);
        console.log("Submit Message:");
        console.log("\tMessage Id", messageId);
        console.log();
        const message = yield client.message(messageId);
        console.log("Get Message");
        iota2_js_1.logMessage("", message);
        console.log();
        const messageMetadata = yield client.messageMetadata(messageId);
        console.log("Message Metadata");
        console.log("\tMessage Id:", messageMetadata.messageId);
        console.log("\tParent 1 Message Id:", messageMetadata.parent1MessageId);
        console.log("\tParent 2 Message Id:", messageMetadata.parent2MessageId);
        console.log("\tIs Solid:", messageMetadata.isSolid);
        console.log("\tShould Promote:", messageMetadata.shouldPromote);
        console.log("\tShould Reattach:", messageMetadata.shouldReattach);
        console.log();
        const messageRaw = yield client.messageRaw(messageId);
        console.log("Message Raw");
        console.log("\tRaw:", messageRaw.toString("hex"));
        console.log();
        const messages = yield client.messagesFind("Foo");
        console.log("Messages");
        console.log("\tIndex:", messages.index);
        console.log("\tMax Results:", messages.maxResults);
        console.log("\tCount:", messages.count);
        console.log("\tMessage Ids:", messages.messageIds);
        console.log();
        const children = yield client.messageChildren(tips.tip1MessageId);
        console.log("Children");
        console.log("\tMessage Id:", children.messageId);
        console.log("\tMax Results:", children.maxResults);
        console.log("\tCount:", children.count);
        console.log("\tChildren Message Ids:", children.childrenMessageIds);
        console.log();
        const milestone = yield client.milestone(info.latestMilestoneIndex);
        console.log("Milestone");
        console.log("\tMessage Index:", milestone.milestoneIndex);
        console.log("\tMessage Id:", milestone.messageId);
        console.log("\tTimestamp:", milestone.timestamp);
        console.log();
        const milestoneMessage = yield client.message(milestone.messageId);
        console.log("Milestone Message");
        iota2_js_1.logMessage("", milestoneMessage);
        console.log();
        const output = yield client.output("00000000000000000000000000000000000000000000000000000000000000000000");
        console.log("Output");
        console.log("Message Id:", output.messageId);
        console.log("Transaction Id:", output.transactionId);
        console.log("Output Index:", output.outputIndex);
        console.log("Is Spent:", output.isSpent);
        iota2_js_1.logOutput("\t", output.output);
        console.log();
        const address = yield client.address(output.output.address.address);
        console.log("Address");
        console.log("Address:", address.address);
        console.log("Max Results:", address.maxResults);
        console.log("Count:", address.count);
        console.log("Balance:", address.balance);
        console.log();
        const addressOutputs = yield client.addressOutputs(output.output.address.address);
        console.log("Address Outputs");
        console.log("Address:", addressOutputs.address);
        console.log("Max Results:", addressOutputs.maxResults);
        console.log("Count:", addressOutputs.count);
        console.log("Output Ids:", addressOutputs.outputIds);
        console.log();
    });
}
run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBeUU7QUFFekUsTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7QUFFOUMsU0FBZSxHQUFHOztRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV4QyxNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxRCxNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDcEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENB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