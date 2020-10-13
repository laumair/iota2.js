/**
 * Keep track of the read index within a buffer.
 */
export class ReadBuffer {
    /**
     * The buffer.
     */
    private readonly _buffer: Buffer;

    /**
     * The current read index.
     */
    private _readIndex: number;

    /**
     * Create a new instance of ReadBuffer.
     * @param buffer The buffer to access.
     * @param readStartIndex The index to start the reading from.
     */
    constructor(buffer: Buffer, readStartIndex: number = 0) {
        this._buffer = buffer;
        this._readIndex = readStartIndex;
    }

    /**
     * Get the length of the buffer.
     * @returns The buffer length.
     */
    public length(): number {
        return this._buffer.length;
    }

    /**
     * Does the buffer have enough data remaining.
     * @param remaining The amount of space needed.
     * @returns True if it has enough data.
     */
    public hasRemaining(remaining: number): boolean {
        return this._readIndex + remaining <= this._buffer.length;
    }

    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    public unused(): number {
        return this._buffer.length - this._readIndex;
    }

    /**
     * Read fixed length buffer.
     * @param name The name of the data we are trying to read.
     * @param length The length of the data to read.
     * @returns The buffer.
     */
    public readFixedBufferHex(name: string, length: number): string {
        if (!this.hasRemaining(length)) {
            throw new Error(`${name} length ${length
                } exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.slice(this._readIndex, this._readIndex + length);
        this._readIndex += length;
        // console.log(name, val.toString("hex"));
        return val.toString("hex");
    }

    /**
     * Read a byte from the buffer.
     * @param name The name of the data we are trying to read.
     * @returns The value.
     */
    public readByte(name: string): number {
        if (!this.hasRemaining(1)) {
            throw new Error(`${name} length ${1
                } exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.readUInt8(this._readIndex);
        this._readIndex += 1;
        // console.log(name, val);
        return val;
    }

    /**
     * Read a UInt16 from the buffer.
     * @param name The name of the data we are trying to read.
     * @returns The value.
     */
    public readUInt16(name: string): number {
        if (!this.hasRemaining(2)) {
            throw new Error(`${name} length ${2
                } exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.readUInt16LE(this._readIndex);
        this._readIndex += 2;
        // console.log(name, val);
        return val;
    }

    /**
     * Read a UInt32 from the buffer.
     * @param name The name of the data we are trying to read.
     * @returns The value.
     */
    public readUInt32(name: string): number {
        if (!this.hasRemaining(4)) {
            throw new Error(`${name} length ${4
                } exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.readUInt32LE(this._readIndex);
        this._readIndex += 4;
        // console.log(name, val);
        return val;
    }

    /**
     * Read a UInt64 from the buffer.
     * @param name The name of the data we are trying to read.
     * @returns The value.
     */
    public readUInt64(name: string): bigint {
        if (!this.hasRemaining(8)) {
            throw new Error(`${name} length ${8
                } exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.readBigUInt64LE(this._readIndex);
        this._readIndex += 8;
        // console.log(name, val);
        return val;
    }

    /**
     * Read a string from the buffer.
     * @param name The name of the data we are trying to read.
     * @returns The string.
     */
    public readString(name: string): string {
        const stringLength = this.readUInt16(name);

        if (!this.hasRemaining(stringLength)) {
            throw new Error(`${name} length ${stringLength
                } exceeds the remaining data ${this.unused()}`);
        }
        const val = this._buffer.slice(this._readIndex, this._readIndex + stringLength);
        this._readIndex += stringLength;
        // console.log(name, val);

        return val.toString();
    }
}
