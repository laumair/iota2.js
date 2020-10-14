"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadBuffer = void 0;
/**
 * Keep track of the read index within a buffer.
 */
class ReadBuffer {
    /**
     * Create a new instance of ReadBuffer.
     * @param buffer The buffer to access.
     * @param readStartIndex The index to start the reading from.
     */
    constructor(buffer, readStartIndex = 0) {
        this._buffer = buffer;
        this._readIndex = readStartIndex;
    }
    /**
     * Get the length of the buffer.
     * @returns The buffer length.
     */
    length() {
        return this._buffer.length;
    }
    /**
     * Does the buffer have enough data remaining.
     * @param remaining The amount of space needed.
     * @returns True if it has enough data.
     */
    hasRemaining(remaining) {
        return this._readIndex + remaining <= this._buffer.length;
    }
    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    unused() {
        return this._buffer.length - this._readIndex;
    }
    /**
     * Read fixed length buffer.
     * @param name The name of the data we are trying to read.
     * @param length The length of the data to read.
     * @param moveIndex Move the index pointer on.
     * @returns The buffer.
     */
    readFixedBufferHex(name, length, moveIndex = true) {
        if (!this.hasRemaining(length)) {
            throw new Error(`${name} length ${length} exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.slice(this._readIndex, this._readIndex + length);
        if (moveIndex) {
            this._readIndex += length;
        }
        return val.toString("hex");
    }
    /**
     * Read a byte from the buffer.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    readByte(name, moveIndex = true) {
        if (!this.hasRemaining(1)) {
            throw new Error(`${name} length ${1} exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.readUInt8(this._readIndex);
        if (moveIndex) {
            this._readIndex += 1;
        }
        return val;
    }
    /**
     * Read a UInt16 from the buffer.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    readUInt16(name, moveIndex = true) {
        if (!this.hasRemaining(2)) {
            throw new Error(`${name} length ${2} exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.readUInt16LE(this._readIndex);
        if (moveIndex) {
            this._readIndex += 2;
        }
        return val;
    }
    /**
     * Read a UInt32 from the buffer.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    readUInt32(name, moveIndex = true) {
        if (!this.hasRemaining(4)) {
            throw new Error(`${name} length ${4} exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.readUInt32LE(this._readIndex);
        if (moveIndex) {
            this._readIndex += 4;
        }
        return val;
    }
    /**
     * Read a UInt64 from the buffer.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    readUInt64(name, moveIndex = true) {
        if (!this.hasRemaining(8)) {
            throw new Error(`${name} length ${8} exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.readBigUInt64LE(this._readIndex);
        if (moveIndex) {
            this._readIndex += 8;
        }
        return val;
    }
    /**
     * Read a string from the buffer.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The string.
     */
    readString(name, moveIndex = true) {
        const stringLength = this.readUInt16(name);
        if (!this.hasRemaining(stringLength)) {
            throw new Error(`${name} length ${stringLength} exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.slice(this._readIndex, this._readIndex + stringLength);
        if (moveIndex) {
            this._readIndex += stringLength;
        }
        return val.toString();
    }
}
exports.ReadBuffer = ReadBuffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEJ1ZmZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZWFkQnVmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0gsTUFBYSxVQUFVO0lBV25COzs7O09BSUc7SUFDSCxZQUFZLE1BQWMsRUFBRSxpQkFBeUIsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxZQUFZLENBQUMsU0FBaUI7UUFDakMsT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUM5RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksa0JBQWtCLENBQUMsSUFBWSxFQUFFLE1BQWMsRUFBRSxZQUFxQixJQUFJO1FBQzdFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLFdBQVcsTUFDOUIsK0JBQStCLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdkQ7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDMUUsSUFBSSxTQUFTLEVBQUU7WUFDWCxJ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