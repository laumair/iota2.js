/* eslint-disable max-len */
import { deserializeReferenceUnlockBlock, deserializeUnlockBlock, deserializeUnlockBlocks, serializeSignatureUnlockBlock, deserializeSignatureUnlockBlock, serializeReferenceUnlockBlock, serializeUnlockBlock, serializeUnlockBlocks } from "../../src/binary/unlockBlock";
import { IReferenceUnlockBlock } from "../../src/models/IReferenceUnlockBlock";
import { ISignatureUnlockBlock } from "../../src/models/ISignatureUnlockBlock";
import { ReadBuffer } from "../../src/utils/readBuffer";
import { WriteBuffer } from "../../src/utils/writeBuffer";

describe("Binary Unlock Block", () => {
    test("Can serialize and deserialize unlock blocks", () => {
        const unlockBlocks: (IReferenceUnlockBlock | ISignatureUnlockBlock)[] = [
            {
                type: 0,
                signature: {
                    type: 1,
                    publicKey: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
                    signature: "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
                }
            },
            {
                type: 1,
                reference: 23456
            }
        ];

        const serialized = new WriteBuffer();
        serializeUnlockBlocks(serialized, unlockBlocks);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("020000016920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f922c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d01a05b");
        const deserialized = deserializeUnlockBlocks(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.length).toEqual(2);
        const obj1 = deserialized[0] as ISignatureUnlockBlock;
        expect(obj1.type).toEqual(0);
        expect(obj1.signature.publicKey).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(obj1.signature.signature).toEqual("2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d");
        const obj2 = deserialized[1] as IReferenceUnlockBlock;
        expect(obj2.type).toEqual(1);
        expect(obj2.reference).toEqual(23456);
    });

    test("Can serialize and deserialize unlock block", () => {
        const object: IReferenceUnlockBlock = {
            type: 1,
            reference: 23456
        };

        const serialized = new WriteBuffer();
        serializeUnlockBlock(serialized, object);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("01a05b");
        const deserialized = deserializeUnlockBlock(new ReadBuffer(Buffer.from(hex, "hex")));
        const obj1 = deserialized as IReferenceUnlockBlock;
        expect(obj1.type).toEqual(1);
        expect(obj1.reference).toEqual(23456);
    });

    test("Can serialize and deserialize signature unlock block", () => {
        const object: ISignatureUnlockBlock = {
            type: 0,
            signature: {
                type: 1,
                publicKey: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
                signature: "2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d"
            }
        };

        const serialized = new WriteBuffer();
        serializeSignatureUnlockBlock(serialized, object);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("00016920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f922c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d");
        const deserialized = deserializeSignatureUnlockBlock(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.signature.type).toEqual(1);
        expect(deserialized.signature.publicKey).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.signature.signature).toEqual("2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d");
    });

    test("Can serialize and deserialize reference unlock block", () => {
        const object: IReferenceUnlockBlock = {
            type: 1,
            reference: 23456
        };

        const serialized = new WriteBuffer();
        serializeReferenceUnlockBlock(serialized, object);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("01a05b");
        const deserialized = deserializeReferenceUnlockBlock(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.reference).toEqual(23456);
    });
});
