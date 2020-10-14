import { deserializeTransactionEssence, serializeTransactionEssence } from "../../src/binary/transaction";
import { ITransactionEssence } from "../../src/models/ITransactionEssence";
import { ReadBuffer } from "../../src/utils/readBuffer";
import { WriteBuffer } from "../../src/utils/writeBuffer";

describe("Binary Transaction", () => {
    test("Can serialize and deserialize transaction essence with no payload", () => {
        const object: ITransactionEssence = {
            type: 0,
            inputs: [],
            outputs: []
        };

        const serialized = new WriteBuffer();
        serializeTransactionEssence(serialized, object);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("000000000000000000000000");
        const deserialized = deserializeTransactionEssence(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.inputs.length).toEqual(0);
        expect(deserialized.outputs.length).toEqual(0);
        expect(deserialized.payload).toBeUndefined();
    });

    test("Can serialize and deserialize transaction essence with indexation payload", () => {
        const object: ITransactionEssence = {
            type: 0,
            inputs: [],
            outputs: [],
            payload: {
                type: 2,
                index: "foo",
                data: Buffer.from("bar").toString("hex")
            }
        };

        const serialized = new WriteBuffer();
        serializeTransactionEssence(serialized, object);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("000000000000000010000000020000000300666f6f03000000626172");
        const deserialized = deserializeTransactionEssence(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.inputs.length).toEqual(0);
        expect(deserialized.outputs.length).toEqual(0);
        expect(deserialized.payload).toBeDefined();
        if (deserialized.payload) {
            expect(deserialized.payload.type).toEqual(2);
            expect(deserialized.payload.index).toEqual("foo");
            expect(Buffer.from(deserialized.payload.data, "hex").toString()).toEqual("bar");
        }
    });
});
