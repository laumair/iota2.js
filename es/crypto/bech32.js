"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bech32 = void 0;
/* eslint-disable no-bitwise */
/**
 * Class to help with Bech32 encoding/decoding.
 * Based on reference implementation https://github.com/sipa/bech32/blob/master/ref/javascript/bech32.js
 */
var Bech32 = /** @class */ (function () {
    function Bech32() {
    }
    /**
     * Encode the buffer.
     * @param humanReadablePart The header
     * @param data The data to encode.
     * @returns The encoded data.
     */
    Bech32.encode = function (humanReadablePart, data) {
        return Bech32.encode5BitArray(humanReadablePart, Bech32.to5Bit(data));
    };
    /**
     * Encode the 5 bit data buffer.
     * @param humanReadablePart The header
     * @param data5Bit The data to encode.
     * @returns The encoded data.
     */
    Bech32.encode5BitArray = function (humanReadablePart, data5Bit) {
        var checksum = Bech32.createChecksum(humanReadablePart, data5Bit);
        var ret = "" + humanReadablePart + Bech32.SEPARATOR;
        for (var i = 0; i < data5Bit.length; i++) {
            ret += Bech32.CHARSET.charAt(data5Bit[i]);
        }
        for (var i = 0; i < checksum.length; i++) {
            ret += Bech32.CHARSET.charAt(checksum[i]);
        }
        return ret;
    };
    /**
     * Decode a bech32 string.
     * @param bech The text to decode.
     * @returns The decoded data or undefined if it could not be decoded.
     */
    Bech32.decode = function (bech) {
        var result = Bech32.decodeTo5BitArray(bech);
        return result ? {
            humanReadablePart: result.humanReadablePart,
            data: Bech32.from5Bit(result.data)
        } : undefined;
    };
    /**
     * Decode a bech32 string to 5 bit array.
     * @param bech The text to decode.
     * @returns The decoded data or undefined if it could not be decoded.
     */
    Bech32.decodeTo5BitArray = function (bech) {
        bech = bech.toLowerCase();
        var separatorPos = bech.lastIndexOf(Bech32.SEPARATOR);
        if (separatorPos === -1) {
            throw new Error("There is no separator character " + Bech32.SEPARATOR + " in the data");
        }
        if (separatorPos < 1) {
            throw new Error("The separator position is " + separatorPos + ", which is too early in the string");
        }
        if (separatorPos + 7 > bech.length) {
            throw new Error("The separator position is " + separatorPos + ", which doesn't leave enough space for data");
        }
        var data = new Uint8Array(bech.length - separatorPos - 1);
        var idx = 0;
        for (var i = separatorPos + 1; i < bech.length; i++) {
            var d = Bech32.CHARSET.indexOf(bech.charAt(i));
            if (d === -1) {
                throw new Error("Data contains characters not in the charset " + bech.charAt(i));
            }
            data[idx++] = Bech32.CHARSET.indexOf(bech.charAt(i));
        }
        var humanReadablePart = bech.slice(0, separatorPos);
        if (!Bech32.verifyChecksum(humanReadablePart, data)) {
            return;
        }
        return { humanReadablePart: humanReadablePart, data: data.slice(0, -6) };
    };
    /**
     * Convert the input bytes into 5 bit data.
     * @param bytes The bytes to convert.
     * @returns The data in 5 bit form.
     */
    Bech32.to5Bit = function (bytes) {
        return Bech32.convertBits(bytes, 8, 5, true);
    };
    /**
     * Convert the 5 bit data to 8 bit.
     * @param fiveBit The 5 bit data to convert.
     * @returns The 5 bit data converted to 8 bit.
     */
    Bech32.from5Bit = function (fiveBit) {
        return Bech32.convertBits(fiveBit, 5, 8, false);
    };
    /**
     * Does the given string match the bech32 pattern.
     * @param humanReadablePart The human readable part.
     * @param bech32Text The text to test.
     * @returns True if this is potentially a match.
     */
    Bech32.matches = function (humanReadablePart, bech32Text) {
        if (!bech32Text) {
            return false;
        }
        var regEx = new RegExp("^" + humanReadablePart + "1[" + Bech32.CHARSET + "]{6,}$");
        return regEx.test(bech32Text);
    };
    /**
     * Create the checksum from the human redable part and the data.
     * @param humanReadablePart The human readable part.
     * @param data The data.
     * @returns The checksum.
     */
    Bech32.createChecksum = function (humanReadablePart, data) {
        var expanded = Bech32.humanReadablePartExpand(humanReadablePart);
        var values = new Uint8Array(expanded.length + data.length + 6);
        values.set(expanded, 0);
        values.set(data, expanded.length);
        values.set([0, 0, 0, 0, 0, 0], expanded.length + data.length);
        var mod = Bech32.polymod(values) ^ 1;
        var ret = new Uint8Array(6);
        for (var i = 0; i < 6; i++) {
            ret[i] = (mod >> 5 * (5 - i)) & 31;
        }
        return ret;
    };
    /**
     * Verify the checksum given the humarn readable part and data.
     * @param humanReadablePart The human redable part to validate the checksum.
     * @param data The data to validate the checksum.
     * @returns True if the checksum was verified.
     */
    Bech32.verifyChecksum = function (humanReadablePart, data) {
        var expanded = Bech32.humanReadablePartExpand(humanReadablePart);
        var values = new Uint8Array(expanded.length + data.length);
        values.set(expanded, 0);
        values.set(data, expanded.length);
        return Bech32.polymod(values) === 1;
    };
    /**
     * Calculate the polymod of the values.
     * @param values The values to calculate the polymod for.
     * @returns The polymod of the values.
     */
    Bech32.polymod = function (values) {
        var chk = 1;
        for (var p = 0; p < values.length; p++) {
            var top_1 = chk >> 25;
            chk = ((chk & 0x1FFFFFF) << 5) ^ values[p];
            for (var i = 0; i < 5; ++i) {
                if ((top_1 >> i) & 1) {
                    chk ^= Bech32.GENERATOR[i];
                }
            }
        }
        return chk;
    };
    /**
     * Expand the human readable part.
     * @param humanReadablePart The human readable part to expand.
     * @returns The expanded human readable part.
     */
    Bech32.humanReadablePartExpand = function (humanReadablePart) {
        var ret = new Uint8Array((humanReadablePart.length * 2) + 1);
        var idx = 0;
        for (var i = 0; i < humanReadablePart.length; i++) {
            ret[idx++] = humanReadablePart.charCodeAt(i) >> 5;
        }
        ret[idx++] = 0;
        for (var i = 0; i < humanReadablePart.length; i++) {
            ret[idx++] = humanReadablePart.charCodeAt(i) & 31;
        }
        return ret;
    };
    /**
     * Convert input data from one bit resolution to another.
     * @param data The data to convert.
     * @param fromBits The resolution of the input data.
     * @param toBits The required resolution of the output data.
     * @param padding Include padding in the output.
     * @returns The converted data,
     */
    Bech32.convertBits = function (data, fromBits, toBits, padding) {
        var value = 0;
        var bits = 0;
        var maxV = (1 << toBits) - 1;
        var res = [];
        for (var i = 0; i < data.length; i++) {
            value = (value << fromBits) | data[i];
            bits += fromBits;
            while (bits >= toBits) {
                bits -= toBits;
                res.push((value >> bits) & maxV);
            }
        }
        if (padding) {
            if (bits > 0) {
                res.push((value << (toBits - bits)) & maxV);
            }
        }
        else {
            if (bits >= fromBits) {
                throw new Error("Excess padding");
            }
            if ((value << (toBits - bits)) & maxV) {
                throw new Error("Non-zero padding");
            }
        }
        return new Uint8Array(res);
    };
    /**
     * The alphabet to use.
     */
    Bech32.CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
    /**
     * The separator between human readable part and data.
     */
    Bech32.SEPARATOR = "1";
    /**
     * The generator constants;
     */
    Bech32.GENERATOR = Uint32Array.from([
        0x3B6A57B2,
        0x26508E6D,
        0x1EA119FA,
        0x3D4233DD,
        0x2A1462B3
    ]);
    return Bech32;
}());
exports.Bech32 = Bech32;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVjaDMyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by9iZWNoMzIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9COzs7R0FHRztBQUNIO0lBQUE7SUF5UUEsQ0FBQztJQW5QRzs7Ozs7T0FLRztJQUNXLGFBQU0sR0FBcEIsVUFBcUIsaUJBQXlCLEVBQUUsSUFBZ0I7UUFDNUQsT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyxzQkFBZSxHQUE3QixVQUE4QixpQkFBeUIsRUFBRSxRQUFvQjtRQUN6RSxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXBFLElBQUksR0FBRyxHQUFHLEtBQUcsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLFNBQVcsQ0FBQztRQUVwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ1csYUFBTSxHQUFwQixVQUFxQixJQUFZO1FBSTdCLElBQU0sTUFB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