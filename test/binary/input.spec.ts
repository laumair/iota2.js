/* eslint-disable max-len */
import { deserializeInput, deserializeInputs, deserializeUTXOInput, serializeInput, serializeInputs, serializeUTXOInput } from "../../src/binary/input";
import { IUTXOInput } from "../../src/models/IUTXOInput";
import { ReadBuffer } from "../../src/utils/readBuffer";
import { WriteBuffer } from "../../src/utils/writeBuffer";

describe("Binary Input", () => {
    test("Can serialize and deserialize inputs", () => {
        const inputs: IUTXOInput[] = [
            {
                type: 0,
                transactionId: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
                transactionOutputIndex: 12345
            },
            {
                type: 0,
                transactionId: "4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1",
                transactionOutputIndex: 23456
            }
        ];

        const serialized = new WriteBuffer();
        serializeInputs(serialized, inputs);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("0200006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f923930004566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1a05b");
        const deserialized = deserializeInputs(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.length).toEqual(2);
        expect(deserialized[0].type).toEqual(0);
        expect(deserialized[0].transactionId).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized[0].transactionOutputIndex).toEqual(12345);
        expect(deserialized[1].type).toEqual(0);
        expect(deserialized[1].transactionId).toEqual("4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1");
        expect(deserialized[1].transactionOutputIndex).toEqual(23456);
    });

    test("Can serialize and deserialize input", () => {
        const object: IUTXOInput = {
            type: 0,
            transactionId: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
            transactionOutputIndex: 12345
        };

        const serialized = new WriteBuffer();
        serializeInput(serialized, object);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f923930");
        const deserialized = deserializeInput(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.transactionId).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.transactionOutputIndex).toEqual(12345);
    });

    test("Can serialize and deserialize utxo input", () => {
        const object: IUTXOInput = {
            type: 0,
            transactionId: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
            transactionOutputIndex: 12345
        };

        const serialized = new WriteBuffer();
        serializeUTXOInput(serialized, object);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f923930");
        const deserialized = deserializeUTXOInput(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.transactionId).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.transactionOutputIndex).toEqual(12345);
    });
});
