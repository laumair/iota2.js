import { deserializeAddress, deserializeEd25519Address, serializeAddress, serializeEd25519Address } from "../../src/binary/address";
import { IEd25519Address } from "../../src/models/IEd25519Address";
import { Converter } from "../../src/utils/converter";
import { ReadStream } from "../../src/utils/readStream";
import { WriteStream } from "../../src/utils/writeStream";

describe("Binary Address", () => {
    test("Can serialize and deserialize address", () => {
        const object: IEd25519Address = {
            type: 1,
            address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteStream();
        serializeAddress(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("016920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeAddress(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.address).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });

    test("Can serialize and deserialize ed25519 address", () => {
        const object: IEd25519Address = {
            type: 1,
            address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteStream();
        serializeEd25519Address(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("016920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeEd25519Address(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.address).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
