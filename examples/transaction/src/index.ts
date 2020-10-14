import { Client, Ed25519, Ed25519Seed, ISignatureKeyPair, sendTransfer } from "@iota/iota2.js";

const API_ENDPOINT = "http://localhost:14265";

async function run() {
    const client = new Client(API_ENDPOINT);

    const genesisSeed: Ed25519Seed = Ed25519Seed.fromString("256a818b2aac458941f7274985a410e57fb750f3a3a67969ece5bd9ae7eef5b2");
    console.log("Genesis");
    console.log("\tSeed:", genesisSeed.toString());

    const genesisSeedKeyPair: ISignatureKeyPair = genesisSeed.generateKeyPair();
    console.log("\tPrivate Key:", genesisSeedKeyPair.privateKey);
    console.log("\tPublic Key:", genesisSeedKeyPair.publicKey);
    console.log("\tFirst Address:", Ed25519.signAddress(genesisSeedKeyPair.publicKey));
    console.log();

    const newSeed: Ed25519Seed = Ed25519Seed.fromString("e57fb750f3a3a67969ece5bd9ae7eef5b2256a818b2aac458941f7274985a410");
    const newAddress: string = Ed25519.signAddress(newSeed.generateKeyPair().publicKey);
    console.log("New");
    console.log("\tSeed:", newSeed.toString());
    console.log("\tAddress:", newAddress);
    console.log();

    const { messageId, remainderAddress } = await sendTransfer(client, genesisSeed, [
        {
            address: newAddress,
            amount: 100
        }
    ], "foo", Buffer.from("bar").toString("hex"));

    console.log("Created Message Id", messageId);
    console.log("Remainder Address", remainderAddress);
}


run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));