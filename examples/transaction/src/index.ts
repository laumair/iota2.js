import { Client, logOutput } from "@iota/iota2.js";

const API_ENDPOINT = "http://localhost:14265";

async function run() {
    const client = new Client(API_ENDPOINT);

    const output = await client.output("00000000000000000000000000000000000000000000000000000000000000000000");
    console.log("Output");
    console.log("Message Id:", output.messageId);
    console.log("Transaction Id:", output.transactionId);
    console.log("Output Index:", output.outputIndex);
    console.log("Is Spent:", output.isSpent);
    logOutput("\t", output.output);
    console.log();

    const address = await client.address(output.output.address.address);
    console.log("Address");
    console.log("Address:", address.address);
    console.log("Max Results:", address.maxResults);
    console.log("Count:", address.count);
    console.log("Balance:", address.balance);
    console.log();

    const addressOutputs = await client.addressOutputs(output.output.address.address);
    console.log("Address Outputs");
    console.log("Address:", addressOutputs.address);
    console.log("Max Results:", addressOutputs.maxResults);
    console.log("Count:", addressOutputs.count);
    console.log("Output Ids:", addressOutputs.outputIds);
    console.log();
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));