/* eslint-disable max-len */
import { Ed25519 } from "../../src/crypto/ed25519";
import { Converter } from "../../src/utils/converter";

describe("Ed25519", () => {
    test("Can generate a key pair from a seed", () => {
        const seed = new Uint8Array(32).fill(170);
        const keyPair = Ed25519.keyPairFromSeed(seed);

        expect(Converter.bytesToHex(keyPair.privateKey)).toEqual("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaae734ea6c2b6257de72355e472aa05a4c487e6b463c029ed306df2f01b5636b58");
        expect(Converter.bytesToHex(keyPair.publicKey)).toEqual("e734ea6c2b6257de72355e472aa05a4c487e6b463c029ed306df2f01b5636b58");
    });

    test("Can generate a signature with a private key", () => {
        const seed = new Uint8Array(32).fill(170);
        const keyPair = Ed25519.keyPairFromSeed(seed);

        const data = new Uint8Array(100).fill(100);

        const sig = Ed25519.sign(keyPair.privateKey, data);

        expect(Converter.bytesToHex(sig)).toEqual("359aa3bd52531f40f5fa85a9c8d16f7f55708fea795328ad6ec1a5a503ee3f1e2c8506d44e10329b1051eaeea8371e8f0cb36d45abc6b00717127816bee30b0b");
    });

    test("Can validate a signature with the public key", () => {
        const seed = new Uint8Array(32).fill(170);
        const keyPair = Ed25519.keyPairFromSeed(seed);

        const data = new Uint8Array(100).fill(100);

        const sig = Ed25519.sign(keyPair.privateKey, data);

        const verified = Ed25519.verify(keyPair.publicKey, data, sig);

        expect(verified).toEqual(true);
    });

    test("Can validate a signature with the public key", () => {
        const seed = new Uint8Array(32).fill(170);
        const keyPair = Ed25519.keyPairFromSeed(seed);

        const data = new Uint8Array(100).fill(100);

        const sig = Ed25519.sign(keyPair.privateKey, data);

        const verified = Ed25519.verify(keyPair.publicKey, data, sig);

        expect(verified).toEqual(true);
    });
});

