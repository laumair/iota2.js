/* eslint-disable max-len */
import { Ed25519 } from "../../src/crypto/ed25519";
import { Ed25519Seed } from "../../src/crypto/ed25519Seed";

describe("Ed25519", () => {
    test("Can sign an address", () => {
        const seed = Ed25519Seed.fromString("a".repeat(64));
        const keyPair = seed.generateKeyPair();
        const signature = Ed25519.signAddress(keyPair.publicKey);
        expect(signature).toEqual("fb2d6244c46d9b483dadef0a0fde4caab6f3a871aad91743ac66f41a6dfd4f48");
    });

    test("Can verify an address", () => {
        const seed = Ed25519Seed.fromString("a".repeat(64));
        const keyPair = seed.generateKeyPair();
        const signature = Ed25519.signAddress(keyPair.publicKey);
        const verified = Ed25519.verifyAddress(keyPair.publicKey, signature);
        expect(verified).toEqual(true);
    });

    test("Can sign data", () => {
        const seed = Ed25519Seed.fromString("a".repeat(64));
        const keyPair = seed.generateKeyPair();
        const data = Buffer.from("foobar");
        const signature = Ed25519.signData(keyPair.privateKey, data);
        expect(signature).toEqual("d03a555a5410547fde362c77f4b3e3e12c12eff398c5956bd35a56cab119f2fb57c329b6158f573b8bba83dc762da210f1af34175ed65d59e3c4d099a34ee201");
    });

    test("Can verify data", () => {
        const seed = Ed25519Seed.fromString("a".repeat(64));
        const keyPair = seed.generateKeyPair();
        const data = Buffer.from("foobar");
        const signature = Ed25519.signData(keyPair.privateKey, data);
        const verified = Ed25519.verifyData(keyPair.publicKey, signature, data);
        expect(verified).toEqual(true);
    });
});

