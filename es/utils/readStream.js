"use strict";
/* eslint-disable no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadStream = void 0;
var converter_1 = require("./converter");
/**
 * Keep track of the read index within a stream.
 */
var ReadStream = /** @class */ (function () {
    /**
     * Create a new instance of ReadStream.
     * @param storage The data to access.
     * @param readStartIndex The index to start the reading from.
     */
    function ReadStream(storage, readStartIndex) {
        if (readStartIndex === void 0) { readStartIndex = 0; }
        this._storage = new Uint8Array(storage);
        this._readIndex = readStartIndex;
    }
    /**
     * Get the length of the storage.
     * @returns The storage length.
     */
    ReadStream.prototype.length = function () {
        return this._storage.byteLength;
    };
    /**
     * Does the storage have enough data remaining.
     * @param remaining The amount of space needed.
     * @returns True if it has enough data.
     */
    ReadStream.prototype.hasRemaining = function (remaining) {
        return this._readIndex + remaining <= this._storage.byteLength;
    };
    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    ReadStream.prototype.unused = function () {
        return this._storage.byteLength - this._readIndex;
    };
    /**
     * Read fixed length as hex.
     * @param name The name of the data we are trying to read.
     * @param length The length of the data to read.
     * @param moveIndex Move the index pointer on.
     * @returns The hex formatted data.
     */
    ReadStream.prototype.readFixedHex = function (name, length, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(length)) {
            throw new Error(name + " length " + length + " exceeds the remaining data " + this.unused());
        }
        var hex = converter_1.Converter.bytesToHex(this._storage, this._readIndex, length);
        if (moveIndex) {
            this._readIndex += length;
        }
        return hex;
    };
    /**
     * Read a byte from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    ReadStream.prototype.readByte = function (name, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(1)) {
            throw new Error(name + " length " + 1 + " exceeds the remaining data " + this.unused());
        }
        var val = this._storage[this._readIndex];
        if (moveIndex) {
            this._readIndex += 1;
        }
        return val;
    };
    /**
     * Read a UInt16 from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    ReadStream.prototype.readUInt16 = function (name, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(2)) {
            throw new Error(name + " length " + 2 + " exceeds the remaining data " + this.unused());
        }
        var val = this._storage[this._readIndex] |
            (this._storage[this._readIndex + 1] << 8);
        if (moveIndex) {
            this._readIndex += 2;
        }
        return val;
    };
    /**
     * Read a UInt32 from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    ReadStream.prototype.readUInt32 = function (name, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(4)) {
            throw new Error(name + " length " + 4 + " exceeds the remaining data " + this.unused());
        }
        var val = (this._storage[this._readIndex]) |
            (this._storage[this._readIndex + 1] * 0x100) |
            (this._storage[this._readIndex + 2] * 0x10000) +
                (this._storage[this._readIndex + 3] * 0x1000000);
        if (moveIndex) {
            this._readIndex += 4;
        }
        return val;
    };
    /**
     * Read a UInt64 from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    ReadStream.prototype.readUInt64 = function (name, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(8)) {
            throw new Error(name + " length " + 8 + " exceeds the remaining data " + this.unused());
        }
        // We reverse the string conversion as this is LE
        var val = BigInt("0x" + converter_1.Converter.bytesToHex(this._storage, this._readIndex, 8, true));
        if (moveIndex) {
            this._readIndex += 8;
        }
        return val;
    };
    /**
     * Read a string from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The string.
     */
    ReadStream.prototype.readString = function (name, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        var stringLength = this.readUInt16(name);
        if (!this.hasRemaining(stringLength)) {
            throw new Error(name + " length " + stringLength + " exceeds the remaining data " + this.unused());
        }
        var val = converter_1.Converter.bytesToAscii(this._storage, this._readIndex, stringLength);
        if (moveIndex) {
            this._readIndex += stringLength;
        }
        return val;
    };
    return ReadStream;
}());
exports.ReadStream = ReadStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZFN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZWFkU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7OztBQUUvQix5Q0FBd0M7QUFFeEM7O0dBRUc7QUFDSDtJQVdJOzs7O09BSUc7SUFDSCxvQkFBWSxPQUFtQixFQUFFLGNBQTBCO1FBQTFCLCtCQUFBLEVBQUEsa0JBQTBCO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDJCQUFNLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksaUNBQVksR0FBbkIsVUFBb0IsU0FBaUI7UUFDakMsT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksMkJBQU0sR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksaUNBQVksR0FBbkIsVUFBb0IsSUFBWSxFQUFFLE1BQWMsRUFBRSxTQUF5QjtRQUF6QiwwQkFBQSxFQUFBLGdCQUF5QjtRQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksS0FBSyxDQUFJLElBQUksZ0JBQVcsTUFBTSxvQ0FDTCxJQUFJLENBQUMsTUFBTSxFQUFJLENBQUMsQ0FBQztTQUN2RDtRQUNELElBQU0sR0FBRyxHQUFHLHFCQUFTLENBQUMsVUFBVSxDQUFDLElB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