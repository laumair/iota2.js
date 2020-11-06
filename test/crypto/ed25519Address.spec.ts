/* eslint-disable max-len */
import { Ed25519Address } from "../../src/crypto/ed25519Address";
import { Ed25519Seed } from "../../src/crypto/ed25519Seed";
import { Converter } from "../../src/utils/converter";

describe("Ed25519Address", () => {
    test("Can sign an address", () => {
        const seed = Ed25519Seed.fromBytes(new Uint8Array(32).fill(170));
        const keyPair = seed.keyPair();
        const signature = Ed25519Address.publicKeyToAddress(keyPair.publicKey);
        expect(Converter.bytesToHex(signature)).toEqual("fb2d6244c46d9b483dadef0a0fde4caab6f3a871aad91743ac66f41a6dfd4f48");
    });

    test("Can verify an address", () => {
        const seed = Ed25519Seed.fromBytes(new Uint8Array(32).fill(170));
        const keyPair = seed.keyPair();
        const signature = Ed25519Address.publicKeyToAddress(keyPair.publicKey);
        const verified = Ed25519Address.verifyAddress(keyPair.publicKey, signature);
        expect(verified).toEqual(true);
    });
});

