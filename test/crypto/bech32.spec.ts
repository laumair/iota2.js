/* eslint-disable max-len */
import { Bech32 } from "../../src/crypto/bech32";

describe("Bech32", () => {
    test("Can fail to encode if the data is too short", () => {
        const humanReadablePart = "abcdef";
        const data = new Uint8Array([0]);
        expect(() => Bech32.encode(humanReadablePart, data)).toThrow("too short");
    });

    test("Can fail to encode if the data is too long", () => {
        const humanReadablePart = "abcdef";
        const data = new Uint8Array(85);
        expect(() => Bech32.encode(humanReadablePart, data)).toThrow("too long");
    });

    test("Can perform an encode", () => {
        const humanReadablePart = "abcdef";
        const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
        expect(Bech32.encode(humanReadablePart, data)).toEqual("abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxw");
    });

    test("Can fail to decode if the data is too long", () => {
        expect(() => Bech32.decode("a".repeat(91))).toThrow("too long");
    });

    test("Can fail to decode if the separator is too early", () => {
        expect(() => Bech32.decode(`1${"a".repeat(89)}`)).toThrow("too early");
    });

    test("Can fail to decode if the separator is too late", () => {
        expect(() => Bech32.decode(`${"a".repeat(84)}1${"a".repeat(5)}`)).toThrow("space for data");
    });

    test("Can fail to decode with invalid characters", () => {
        const result = Bech32.decode("abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxz");

        expect(result).toBeUndefined();
    });

    test("Can fail to decode with invalid checksum", () => {
        const result = Bech32.decode("abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxz");

        expect(result).toBeUndefined();
    });

    test("Can perform a decode", () => {
        const result = Bech32.decode("abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxw");

        expect(result).toBeDefined();
        if (result) {
            expect(result.humanReadablePart).toEqual("abcdef");
            expect(result.data).toEqual(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]));
        }
    });
});
