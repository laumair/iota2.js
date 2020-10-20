/* eslint-disable max-len */
import { deserializeInput, deserializeInputs, deserializeUTXOInput, serializeInput, serializeInputs, serializeUTXOInput } from "../../src/binary/input";
import { IUTXOInput } from "../../src/models/IUTXOInput";
import { Converter } from "../../src/utils/converter";
import { ReadStream } from "../../src/utils/readStream";
import { WriteStream } from "../../src/utils/writeStream";

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

        const serialized = new WriteStream();
        serializeInputs(serialized, inputs);
        const hex = serialized.finalHex();
        expect(hex).toEqual("0200006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f923930004566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1a05b");
        const deserialized = deserializeInputs(new ReadStream(Converter.hexToBytes(hex)));
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

        const serialized = new WriteStream();
        serializeInput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f923930");
        const deserialized = deserializeInput(new ReadStream(Converter.hexToBytes(hex)));
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

        const serialized = new WriteStream();
        serializeUTXOInput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f923930");
        const deserialized = deserializeUTXOInput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.transactionId).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.transactionOutputIndex).toEqual(12345);
    });
});
