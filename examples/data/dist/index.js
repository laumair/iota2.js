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
        const myIndex = "MY-DATA-INDEX";
        for (let i = 0; i < 10; i++) {
            console.log("Sending Data");
            const sendResult = yield iota2_js_1.sendData(client, myIndex, Buffer.from(`This is data ${i}`));
            console.log("Received Message Id", sendResult.messageId);
        }
        console.log();
        console.log("Finding messages with index");
        const found = yield client.messagesFind(myIndex);
        if (found && found.messageIds.length > 0) {
            console.log(`Found: ${found.count} of ${found.maxResults}`);
            const firstResult = yield iota2_js_1.retrieveData(client, found.messageIds[0]);
            if (firstResult) {
                console.log("First Result");
                console.log("\tIndex: ", firstResult.index);
                console.log("\tData: ", firstResult.data.toString());
            }
        }
        else {
            console.log("Found no results");
        }
    });
}
run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBMEU7QUFFMUUsTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7QUFFOUMsU0FBZSxHQUFHOztRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEQsTUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxNQUFNLG1CQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFFM0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLEtBQUssT0FBTyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUU1RCxNQUFNLFdBQVcsR0FBRyxNQUFNLHVCQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRSxJQUFJLFdBQVcsRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUN4RDtTQUVKO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0NBQUE7QUFFRCxHQUFHLEVBQUU7S0FDQSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQixLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyJ9