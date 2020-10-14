/* eslint-disable max-len */
import { deserializeSignature, deserializeEd25519Signature, serializeSignature, serializeEd25519Signature } from "../../src/binary/signature";
import { IEd25519Signature } from "../../src/models/IEd25519Signature";
import { ReadBuffer } from "../../src/utils/readBuffer";
import { WriteBuffer } from "../../src/utils/writeBuffer";

describe("Binary Signature", () => {
    test("Can serialize and deserialize signature", () => {
        const object: IEd25519Signature = {
            type: 1,
            publicKey: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
            signature: "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
        };

        const serialized = new WriteBuffer();
        serializeSignature(serialized, object);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("016920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f922c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d");
        const deserialized = deserializeSignature(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.publicKey).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.signature).toEqual("2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d");
    });

    test("Can serialize and deserialize ed25519 signature", () => {
        const object: IEd25519Signature = {
            type: 1,
            publicKey: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
            signature: "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
        };

        const serialized = new WriteBuffer();
        serializeEd25519Signature(serialized, object);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("016920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f922c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d");
        const deserialized = deserializeEd25519Signature(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.publicKey).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.signature).toEqual("2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d");
    });
});
