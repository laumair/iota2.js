import { deserializeAddress, deserializeEd25519Address, serializeAddress, serializeEd25519Address } from "../../src/binary/address";
import { IEd25519Address } from "../../src/models/IEd25519Address";
import { ReadBuffer } from "../../src/utils/readBuffer";
import { WriteBuffer } from "../../src/utils/writeBuffer";

describe("Binary Address", () => {
    test("Can serialize and deserialize address", () => {
        const object: IEd25519Address = {
            type: 1,
            address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteBuffer();
        serializeAddress(serialized, object);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("016920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeAddress(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.address).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });

    test("Can serialize and deserialize ed25519 address", () => {
        const object: IEd25519Address = {
            type: 1,
            address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteBuffer();
        serializeEd25519Address(serialized, object);
        const hex = serialized.finalBuffer().toString("hex");
        expect(hex).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeEd25519Address(new ReadBuffer(Buffer.from(hex, "hex")));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.address).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
