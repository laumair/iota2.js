import { Bip32Path, Ed25519, Ed25519Seed, getAllUnspentAddresses, getBalance, getUnspentAddress, IKeyPair, ISeed, sendAdvanced, SingleNodeClient } from "@iota/iota2.js";

const API_ENDPOINT = "http://localhost:14265";

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT);

    const genesisSeed: ISeed = Ed25519Seed.fromString("256a818b2aac458941f7274985a410e57fb750f3a3a67969ece5bd9ae7eef5b2");
    console.log("Genesis");
    console.log("\tSeed:", genesisSeed.toString());

    const genesisSeedKeyPair: IKeyPair = genesisSeed.keyPair();
    console.log("\tPrivate Key:", genesisSeedKeyPair.privateKey);
    console.log("\tPublic Key:", genesisSeedKeyPair.publicKey);

    const genesisAddressPath = new Bip32Path("m/0");
    const firstAddressSeed = genesisSeed.generateSeedFromPath(genesisAddressPath);
    console.log(`\tAddress for ${genesisAddressPath.toString()}:`, Ed25519.publicKeyToAddress(firstAddressSeed.keyPair().publicKey));
    console.log();

    const newSeed: Ed25519Seed = Ed25519Seed.fromString("e57fb750f3a3a67969ece5bd9ae7eef5b2256a818b2aac458941f7274985a410");

    const newAddressPath = new Bip32Path("m/0");
    const newAddressSeed: ISeed = newSeed.generateSeedFromPath(newAddressPath);
    const newAddress: string = Ed25519.publicKeyToAddress(newAddressSeed.keyPair().publicKey);
    console.log("New");
    console.log("\tSeed:", newSeed.toString());
    console.log(`\tAddress ${newAddressPath.toString()}:`, newAddress);
    console.log();

    const { messageId, remainderAddress } = await sendAdvanced(client, genesisSeed, new Bip32Path(), [
        {
            address: newAddress,
            amount: 100
        }
    ], 0, "foo", Buffer.from("bar"));

    console.log("Created Message Id", messageId);
    console.log("Remainder Address", remainderAddress);

    const newAddressBalance = await getBalance(client, newSeed, new Bip32Path());
    console.log("New Address Balance", newAddressBalance);

    const unspentAddress = await getUnspentAddress(client, newSeed, new Bip32Path());
    console.log("First Unspent Address", unspentAddress);

    const allUspentAddresses = await getAllUnspentAddresses(client, newSeed, new Bip32Path());
    console.log("Unspent Addresses", allUspentAddresses);
}


run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));