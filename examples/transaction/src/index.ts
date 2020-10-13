import { Bip32Path, Client, Ed25519, Ed25519Seed, IMessage, IReferenceUnlockBlock, ISignatureKeyPair, ISignatureUnlockBlock, ITransactionEssence, ITransactionPayload, logMessage, logOutput, serializeTransactionEssence, WriteBuffer } from "@iota/iota2.js";

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

    const seed: Ed25519Seed = Ed25519Seed.fromString("256a818b2aac458941f7274985a410e57fb750f3a3a67969ece5bd9ae7eef5b2");
    console.log("Seed", seed.toString());

    const seedKeyPair: ISignatureKeyPair = seed.generateKeyPair();
    console.log("KeyPair");
    console.log("\tPrivate Key:", seedKeyPair.privateKey);
    console.log("\tPublic Key:", seedKeyPair.publicKey);

    const seedAddress = Ed25519.signAddress(seedKeyPair.publicKey);
    console.log("Address:", seedAddress);

    const bip32Path = new Bip32Path();
    bip32Path.push(1);
    const subSeed = seed.generateSubseed(bip32Path)

    const subSeedKeyPair: ISignatureKeyPair = subSeed.generateKeyPair();
    console.log("SubSeed KeyPair");
    console.log("\tPrivate Key:", subSeedKeyPair.privateKey);
    console.log("\tPublic Key:", subSeedKeyPair.publicKey);

    const subSeedAddress = Ed25519.signAddress(subSeedKeyPair.publicKey);
    console.log("SubSeed Address:", subSeedAddress);

    const tips = await client.tips();

    const transactionEssence: ITransactionEssence = {
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

    const binaryEssenceBuffer = new WriteBuffer();
    serializeTransactionEssence(binaryEssenceBuffer, transactionEssence);

    const unlockBlocks: (ISignatureUnlockBlock | IReferenceUnlockBlock)[] = [
        {
            type: 0,
            signature: {
                type: 1,
                publicKey: seedKeyPair.publicKey,
                signature: Ed25519.signData(seedKeyPair.privateKey, binaryEssenceBuffer.finalBuffer())
            }
        }
    ];

    const transactionPayload: ITransactionPayload = {
        type: 0,
        essence: transactionEssence,
        unlockBlocks
    }

    const message: IMessage = {
        version: 1,
        parent1MessageId: tips.tip1MessageId,
        parent2MessageId: tips.tip2MessageId,
        payload: transactionPayload,
        nonce: 0
    };

    console.log("Submitting Message");
    logMessage("", message);
    const createdMessageId = await client.messageSubmit(message);
    console.log("Created Message Id", createdMessageId);
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));