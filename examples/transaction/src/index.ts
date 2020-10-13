import { Client, logOutput } from "@iota/iota2.js";

const API_ENDPOINT = "http://localhost:14265";

async function run() {
    const client = new Client(API_ENDPOINT);

    const output = await client.output("00000000000000000000000000000000000000000000000000000000000000000000");
    console.log("Output");
    console.log("\tMessage Id:", output.messageId);
    console.log("\tTransaction Id:", output.transactionId);
    console.log("\tOutput Index:", output.outputIndex);
    console.log("\tIs Spent:", output.isSpent);
    logOutput("\t", output.output);
    console.log();

    const address = await client.address(output.output.address.address);
    console.log("Address");
    console.log("\tAddress:", address.address);
    console.log("\tMax Results:", address.maxResults);
    console.log("\tCount:", address.count);
    console.log("\tBalance:", address.balance);
    console.log();

    const addressOutputs = await client.addressOutputs(output.output.address.address);
    console.log("Address Outputs");
    console.log("\tAddress:", addressOutputs.address);
    console.log("\tMax Results:", addressOutputs.maxResults);
    console.log("\tCount:", addressOutputs.count);
    console.log("\tOutput Ids:", addressOutputs.outputIds);
    console.log();
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));