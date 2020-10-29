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
        var len = humanReadablePart.length + data.length;
        if (len < Bech32.MIN_LENGTH) {
            throw new Error("Human readable part + data length is too short, it is " + len + " and the minimum length is " + Bech32.MIN_LENGTH);
        }
        if (humanReadablePart.length + data.length > Bech32.MAX_LENGTH) {
            throw new Error("Human readable part + data length is too long, it is " + len + " and the maximum length is " + Bech32.MAX_LENGTH);
        }
        var checksum = Bech32.createChecksum(humanReadablePart, data);
        var ret = "" + humanReadablePart + Bech32.SEPARATOR;
        for (var i = 0; i < data.length; i++) {
            ret += Bech32.CHARSET.charAt(data[i]);
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
        bech = bech.toLowerCase();
        if (bech.length > Bech32.MAX_LENGTH) {
            throw new Error("The bech string is too long, it is " + bech.length + " and the maximum length is " + Bech32.MAX_LENGTH);
        }
        var separatorPos = bech.lastIndexOf(Bech32.SEPARATOR);
        if (separatorPos < 1) {
            throw new Error("The separator position is " + separatorPos + ", which is too early in the string");
        }
        if (separatorPos + 7 > bech.length) {
            throw new Error("The separator position is " + separatorPos + ", which doesn't leave enough space for data");
        }
        var data = new Uint8Array(bech.length - separatorPos - 1);
        var idx = 0;
        for (var p = separatorPos + 1; p < bech.length; p++) {
            var d = Bech32.CHARSET.indexOf(bech.charAt(p));
            if (d === -1) {
                throw new Error("Data contains characters not in the charset " + bech.charAt(p));
            }
            data[idx++] = Bech32.CHARSET.indexOf(bech.charAt(p));
        }
        var humanReadablePart = bech.slice(0, separatorPos);
        if (!Bech32.verifyChecksum(humanReadablePart, data)) {
            return;
        }
        return { humanReadablePart: humanReadablePart, data: data.slice(0, -6) };
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
     * @param values The values to calculate the polymode for.
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
    /**
     * The minimum length for humanReadablePart + data;
     */
    Bech32.MIN_LENGTH = 8;
    /**
     * The maximum length for humanReadablePart + data;
     */
    Bech32.MAX_LENGTH = 90;
    return Bech32;
}());
exports.Bech32 = Bech32;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVjaDMyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by9iZWNoMzIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9COzs7R0FHRztBQUNIO0lBQUE7SUF5TEEsQ0FBQztJQXpKRzs7Ozs7T0FLRztJQUNXLGFBQU0sR0FBcEIsVUFBcUIsaUJBQXlCLEVBQUUsSUFBZ0I7UUFDNUQsSUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbkQsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLDJEQUF5RCxHQUFHLG1DQUMxQyxNQUFNLENBQUMsVUFBWSxDQUFDLENBQUM7U0FDMUQ7UUFFRCxJQUFJLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDNUQsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBd0QsR0FBRyxtQ0FDekMsTUFBTSxDQUFDLFVBQVksQ0FBQyxDQUFDO1NBQzFEO1FBRUQsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVoRSxJQUFJLEdBQUcsR0FBRyxLQUFHLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFXLENBQUM7UUFFcEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FB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