/* eslint-disable max-len */
import { deserializeIndexationPayload, deserializePayload, serializeIndexationPayload, serializeMilestonePayload, deserializeMilestonePayload } from "../../src/binary/payload";
import { IIndexationPayload } from "../../src/models/IIndexationPayload";
import { IMilestonePayload } from "../../src/models/IMilestonePayload";
import { Converter } from "../../src/utils/converter";
import { ReadStream } from "../../src/utils/readStream";
import { WriteStream } from "../../src/utils/writeStream";

describe("Binary Payload", () => {
    test("Can fail with underflow min", () => {
        const bytes = new Uint8Array();
        expect(() => deserializePayload(new ReadStream(bytes))).toThrow("is less");
    });

    test("Can fail with underflow max", () => {
        const bytes = new Uint8Array(3);
        expect(() => deserializePayload(new ReadStream(bytes))).toThrow("is less");
    });

    test("Can fail with undersize payload length", () => {
        const bytes = Buffer.alloc(12);
        bytes.writeUInt32LE(1000, 0); // Payload length
        expect(() => deserializePayload(new ReadStream(bytes))).toThrow("exceeds the remaining");
    });

    test("Can fail with unrecognised payload", () => {
        const buffer = Buffer.alloc(12);
        buffer.writeUInt32LE(8, 0); // Payload length
        buffer.writeUInt32LE(99, 4); // Payload type
        expect(() => deserializePayload(new ReadStream(buffer))).toThrow("Unrecognized payload");
    });

    test("Can fail with indexation payload too small", () => {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt32LE(4, 0); // Payload length
        buffer.writeUInt32LE(2, 4); // Payload type
        expect(() => deserializePayload(new ReadStream(buffer))).toThrow("minimimum size");
    });

    test("Can fail with milestone payload too small", () => {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt32LE(4, 0); // Payload length
        buffer.writeUInt32LE(1, 4); // Payload type
        expect(() => deserializePayload(new ReadStream(buffer))).toThrow("minimimum size");
    });

    test("Can succeed with valid indexation data", () => {
        const buffer = Buffer.alloc(14);
        buffer.writeUInt32LE(8, 0); // Payload length
        buffer.writeUInt32LE(2, 4); // Payload type
        buffer.writeUInt16LE(0, 8); // Indexation index length
        buffer.writeUInt16LE(0, 10); // Indexation data length
        const payload = deserializePayload(new ReadStream(buffer)) as IIndexationPayload;
        expect(payload.type).toEqual(2);
        expect(payload.index).toEqual("");
        expect(payload.data).toEqual("");
    });

    test("Can succeed with valid milestone data", () => {
        const buffer = Buffer.alloc(153);
        buffer.writeUInt32LE(8, 0); // Payload length
        buffer.writeUInt32LE(1, 4); // Payload type
        buffer.writeBigUInt64LE(BigInt(123), 8); // Milestone index
        buffer.writeBigUInt64LE(BigInt(456), 16); // Milestone timestamp
        buffer.write("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce", 24, "hex"); // Inclusion Merkle proof
        buffer.writeUInt8(1, 88); // Signature count
        buffer.write("2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d", 89, "hex"); // Signature
        const payload = deserializePayload(new ReadStream(buffer)) as IMilestonePayload;
        expect(payload.type).toEqual(1);
        expect(payload.index).toEqual(123);
        expect(payload.timestamp).toEqual(456);
        expect(payload.inclusionMerkleProof).toEqual("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce");
        expect(payload.signatures.length).toEqual(1);
        expect(payload.signatures[0]).toEqual("2c59d43952bda7ca60d3c2288ebc00703b4b60c928d277382cad5f57b02a90825f2d3a8509d6594498e0488f086d8fa3f13d9636d20e759eb5806ffe663bac0d");
    });

    test("Can serialize and deserialize indexation payload", () => {
        const payload: IIndexationPayload = {
            type: 2,
            index: "foo",
            data: Converter.asciiToHex("bar")
        };

        const serialized = new WriteStream();
        serializeIndexationPayload(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual("020000000300666f6f03000000626172");
        const deserialized = deserializeIndexationPayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(2);
        expect(deserialized.index).toEqual("foo");
        expect(Converter.hexToAscii(deserialized.data)).toEqual("bar");
    });

    test("Can serialize and deserialize milestone payload", () => {
        const payload: IMilestonePayload = {
            type: 1,
            index: 123,
            timestamp: 456,
            inclusionMerkleProof: "786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce",
            signatures: ["8cba2c84d06b378736681305d3fcf11698c5d3cb45dd6146ea47e0d26bddca03887501858ab4c803d7db8c09f5c6f5bec87aade06b6f4de6c050c07fede4cb04"]
        };

        const serialized = new WriteStream();
        serializeMilestonePayload(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual("010000007b00000000000000c801000000000000786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce018cba2c84d06b378736681305d3fcf11698c5d3cb45dd6146ea47e0d26bddca03887501858ab4c803d7db8c09f5c6f5bec87aade06b6f4de6c050c07fede4cb04");
        const deserialized = deserializeMilestonePayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.index).toEqual(123);
        expect(deserialized.timestamp).toEqual(456);
        expect(deserialized.inclusionMerkleProof).toEqual("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce");
        expect(deserialized.signatures.length).toEqual(1);
        expect(deserialized.signatures[0]).toEqual("8cba2c84d06b378736681305d3fcf11698c5d3cb45dd6146ea47e0d26bddca03887501858ab4c803d7db8c09f5c6f5bec87aade06b6f4de6c050c07fede4cb04");
    });
});
