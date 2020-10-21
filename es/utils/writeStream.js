"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteStream = void 0;
/* eslint-disable no-bitwise */
var common_1 = require("../binary/common");
var converter_1 = require("./converter");
/**
 * Keep track of the write index within a stream.
 */
var WriteStream = /** @class */ (function () {
    /**
     * Create a new instance of ReadStream.
     */
    function WriteStream() {
        this._storage = new Uint8Array(WriteStream.CHUNK_SIZE);
        this._writeIndex = 0;
    }
    /**
     * Get the length of the stream.
     * @returns The stream length.
     */
    WriteStream.prototype.length = function () {
        return this._storage.length;
    };
    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    WriteStream.prototype.unused = function () {
        return this._storage.length - this._writeIndex;
    };
    /**
     * Get the final stream as bytes.
     * @returns The final stream.
     */
    WriteStream.prototype.finalBytes = function () {
        return this._storage.subarray(0, this._writeIndex);
    };
    /**
     * Get the final stream as hex.
     * @returns The final stream as hex.
     */
    WriteStream.prototype.finalHex = function () {
        return converter_1.Converter.bytesToHex(this._storage.subarray(0, this._writeIndex));
    };
    /**
     * Get the current write index.
     * @returns The current write index.
     */
    WriteStream.prototype.getWriteIndex = function () {
        return this._writeIndex;
    };
    /**
     * Set the current write index.
     * @param writeIndex The current write index.
     */
    WriteStream.prototype.setWriteIndex = function (writeIndex) {
        this._writeIndex = writeIndex;
    };
    /**
     * Write fixed length stream.
     * @param name The name of the data we are trying to write.
     * @param length The length of the data to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeFixedHex = function (name, length, val) {
        if (!common_1.isHex(val)) {
            throw new Error("The " + val + " should be in hex format");
        }
        // Hex should be twice the length as each byte is 2 ascii characters
        if (length * 2 !== val.length) {
            throw new Error(name + " length " + val.length + " does not match expected length " + length * 2);
        }
        this.expand(length);
        this._storage.set(converter_1.Converter.hexToBytes(val), this._writeIndex);
        this._writeIndex += length;
    };
    /**
     * Write a byte to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeByte = function (name, val) {
        this.expand(1);
        this._storage[this._writeIndex++] = val & 0xFF;
    };
    /**
     * Write a UInt16 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeUInt16 = function (name, val) {
        this.expand(2);
        this._storage[this._writeIndex++] = val & 0xFF;
        this._storage[this._writeIndex++] = val >>> 8;
    };
    /**
     * Write a UInt32 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeUInt32 = function (name, val) {
        this.expand(4);
        this._storage[this._writeIndex++] = val & 0xFF;
        this._storage[this._writeIndex++] = val >>> 8;
        this._storage[this._writeIndex++] = val >>> 16;
        this._storage[this._writeIndex++] = val >>> 24;
    };
    /**
     * Write a UInt64 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeUInt64 = function (name, val) {
        this.expand(8);
        var hex = val.toString(16).padStart(16, "0");
        var arr = converter_1.Converter.hexToBytes(hex, true);
        this._storage.set(arr, this._writeIndex);
        this._writeIndex += 8;
    };
    /**
     * Write a string to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     * @returns The string.
     */
    WriteStream.prototype.writeString = function (name, val) {
        this.writeUInt16(name, val.length);
        this.expand(val.length);
        this._storage.set(converter_1.Converter.asciiToBytes(val), this._writeIndex);
        this._writeIndex += val.length;
        return val;
    };
    /**
     * Expand the storage if there is not enough spave.
     * @param additional The amount of space needed.
     */
    WriteStream.prototype.expand = function (additional) {
        if (this._writeIndex + additional > this._storage.byteLength) {
            var newArr = new Uint8Array(this._storage.length + WriteStream.CHUNK_SIZE);
            newArr.set(this._storage, 0);
            this._storage = newArr;
        }
    };
    /**
     * Chunk size to expand the storage.
     * @internal
     */
    WriteStream.CHUNK_SIZE = 4096;
    return WriteStream;
}());
exports.WriteStream = WriteStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVTdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvd3JpdGVTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLDJDQUF5QztBQUN6Qyx5Q0FBd0M7QUFFeEM7O0dBRUc7QUFDSDtJQW1CSTs7T0FFRztJQUNIO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDRCQUFNLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7O09BR0c7SUFDSSw0QkFBTSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7O09BR0c7SUFDSSxnQ0FBVSxHQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksOEJBQVEsR0FBZjtRQUNJLE9BQU8scUJBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxtQ0FBYSxHQUFwQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksbUNBQWEsR0FBcEIsVUFBcUIsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJ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