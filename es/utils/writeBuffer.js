"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteBuffer = void 0;
const common_1 = require("../binary/common");
/**
 * Keep track of the write index within a buffer.
 */
class WriteBuffer {
    /**
     * Create a new instance of ReadBuffer.
     */
    constructor() {
        this._buffer = Buffer.alloc(WriteBuffer.CHUNK_SIZE);
        this._writeIndex = 0;
    }
    /**
     * Get the length of the buffer.
     * @returns The buffer length.
     */
    length() {
        return this._buffer.length;
    }
    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    unused() {
        return this._buffer.length - this._writeIndex;
    }
    /**
     * Get the final buffer.
     * @returns The final buffer.
     */
    finalBuffer() {
        return this._buffer.slice(0, this._writeIndex);
    }
    /**
     * Get the current write index.
     * @returns The current write index.
     */
    getWriteIndex() {
        return this._writeIndex;
    }
    /**
     * Set the current write index.
     * @param writeIndex The current write index.
     */
    setWriteIndex(writeIndex) {
        this._writeIndex = writeIndex;
    }
    /**
     * Write fixed length buffer.
     * @param name The name of the data we are trying to write.
     * @param length The length of the data to write.
     * @param val The data to write.
     */
    writeFixedBufferHex(name, length, val) {
        if (!common_1.isHex(val)) {
            throw new Error(`The ${val} should be in hex format`);
        }
        // Hex should be twice the length as each byte is 2 ascii characters
        if (length * 2 !== val.length) {
            throw new Error(`${name} length ${val.length} does not match expected length ${length * 2}`);
        }
        this.expand(length);
        this._buffer.write(val, this._writeIndex, "hex");
        this._writeIndex += length;
    }
    /**
     * Write a byte to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeByte(name, val) {
        this.expand(1);
        this._buffer.writeUInt8(val, this._writeIndex);
        this._writeIndex += 1;
    }
    /**
     * Write a UInt16 to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt16(name, val) {
        this.expand(2);
        this._buffer.writeUInt16LE(val, this._writeIndex);
        this._writeIndex += 2;
    }
    /**
     * Write a UInt32 to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt32(name, val) {
        this.expand(4);
        this._buffer.writeUInt32LE(val, this._writeIndex);
        this._writeIndex += 4;
    }
    /**
     * Write a UInt64 to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt64(name, val) {
        this.expand(8);
        if (this._buffer.writeBigUInt64LE) {
            this._buffer.writeBigUInt64LE(val, this._writeIndex);
        }
        else {
            // Polyfill if buffer has no bigint support
            const width = 8;
            const hex = val.toString(16);
            const buffer = Buffer.from(hex.padStart(width * 2, "0"), "hex");
            buffer.reverse();
            this._buffer.write(buffer.toString("hex"), this._writeIndex, "hex");
        }
        this._writeIndex += 8;
    }
    /**
     * Write a string to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     * @returns The string.
     */
    writeString(name, val) {
        this.writeUInt16(name, val.length);
        this.expand(val.length);
        this._buffer.write(val, this._writeIndex);
        this._writeIndex += val.length;
        return val;
    }
    /**
     * Expand the buffer if there is not enough spave.
     * @param additional The amount of space needed.
     */
    expand(additional) {
        if (this._writeIndex + additional > this._buffer.byteLength) {
            this._buffer = Buffer.concat([this._buffer, Buffer.alloc(WriteBuffer.CHUNK_SIZE)]);
        }
    }
}
exports.WriteBuffer = WriteBuffer;
/**
 * Chunk size to expand the buffer.
 */
WriteBuffer.CHUNK_SIZE = 4096;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVCdWZmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvd3JpdGVCdWZmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXlDO0FBRXpDOztHQUVHO0FBQ0gsTUFBYSxXQUFXO0lBZ0JwQjs7T0FFRztJQUNIO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDVCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFdBQVc7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGFBQWE7UUFDaEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxhQUFhLENBQUMsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksbUJBQW1CLENBQUMsSUFBWSxFQUFFLE1BQWMsRUFBRSxHQUFXO1FBQ2hFLElBQUksQ0FBQyxjQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsb0VBQW9FO1FBQ3BFLElBQUksTUFBTSxH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