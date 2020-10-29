/* eslint-disable max-len */
import { Bech32Helper } from "../../src/utils/bech32Helper";
import { Converter } from "../../src/utils/converter";

describe("Bech32Helper", () => {
    test("Can convert to bech32 format", () => {
        const address = Converter.hexToBytes("52fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c649");
        expect(Bech32Helper.toBech32(1, address)).toEqual("iot1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98");
    });

    test("Can convert from bech32 format", () => {
        const address = Converter.hexToBytes("52fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c649");
        const result = Bech32Helper.fromBech32("iot1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98");

        expect(result).toBeDefined();
        if (result) {
            expect(result.addressType).toEqual(1);
            expect(result.addressBytes).toEqual(address);
        }
    });
});
