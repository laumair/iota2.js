/* eslint-disable max-len */
import { Bip32Path } from "../../src/crypto/bip32Path";
import { Ed25519Seed } from "../../src/crypto/ed25519Seed";

describe("Ed25519Seed", () => {
    test("Can generate a random seed", () => {
        const seed = Ed25519Seed.random();
        expect(seed.toBytes().length).toEqual(32);
        expect(seed.toString().length).toEqual(64);
    });

    test("Can fail to generate a private key from an empty path", () => {
        const seed = Ed25519Seed.fromString("a".repeat(64));
        expect(() => seed.generateSubseed(new Bip32Path())).toThrow("Invalid derivation path");
    });

    test("Can generate a key pair from a seed", () => {
        const seed = Ed25519Seed.fromString("a".repeat(64));
        const keyPair = seed.generateKeyPair();
        expect(keyPair.privateKey).toEqual("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaae734ea6c2b6257de72355e472aa05a4c487e6b463c029ed306df2f01b5636b58");
        expect(keyPair.publicKey).toEqual("e734ea6c2b6257de72355e472aa05a4c487e6b463c029ed306df2f01b5636b58");
    });


    test("Can generate a subseed from a filled path", () => {
        const seed = Ed25519Seed.fromString("a".repeat(64));
        const path = new Bip32Path("m/1'");
        const subseed = seed.generateSubseed(path);

        expect(subseed.toString()).toEqual("b2d4b67198c077bdd14ab356594a082a70f8b17ba5d644d044b52c7f1a0b075a");
    });
});

