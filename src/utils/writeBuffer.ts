import { isHex } from "../binary/common";

/**
 * Keep track of the write index within a buffer.
 */
export class WriteBuffer {
    /**
     * Chunk size to expand the buffer.
     */
    private static readonly CHUNK_SIZE: number = 4096;

    /**
     * The buffer.
     */
    private _buffer: Buffer;

    /**
     * The current write index.
     */
    private _writeIndex: number;

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
    public length(): number {
        return this._buffer.length;
    }

    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    public unused(): number {
        return this._buffer.length - this._writeIndex;
    }

    /**
     * Get the final buffer.
     * @returns The final buffer.
     */
    public finalBuffer(): Buffer {
        return this._buffer.slice(0, this._writeIndex);
    }

    /**
     * Get the current write index.
     * @returns The current write index.
     */
    public getWriteIndex(): number {
        return this._writeIndex;
    }

    /**
     * Set the current write index.
     * @param writeIndex The current write index.
     */
    public setWriteIndex(writeIndex: number): void {
        this._writeIndex = writeIndex;
    }

    /**
     * Write fixed length buffer.
     * @param name The name of the data we are trying to write.
     * @param length The length of the data to write.
     * @param val The data to write.
     */
    public writeFixedBufferHex(name: string, length: number, val: string): void {
        if (!isHex(val)) {
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
    public writeByte(name: string, val: number): void {
        this.expand(1);

        this._buffer.writeUInt8(val, this._writeIndex);
        this._writeIndex += 1;
    }

    /**
     * Write a UInt16 to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    public writeUInt16(name: string, val: number): void {
        this.expand(2);

        this._buffer.writeUInt16LE(val, this._writeIndex);
        this._writeIndex += 2;
    }

    /**
     * Write a UInt32 to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    public writeUInt32(name: string, val: number): void {
        this.expand(4);

        this._buffer.writeUInt32LE(val, this._writeIndex);
        this._writeIndex += 4;
    }

    /**
     * Write a UInt64 to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    public writeUInt64(name: string, val: bigint): void {
        this.expand(8);

        if (this._buffer.writeBigUInt64LE) {
            this._buffer.writeBigUInt64LE(val, this._writeIndex);
        } else {
            // Polyfill if buffer has no bigint support
            const width = 8;
            const hex = val.toString(16);
            const buffer = Buffer.from(hex.padStart(width * 2, "0"), "hex");
            buffer.reverse();
            this._buffer.write(buffer.toString("hex"), this._writeIndex);
        }
        this._writeIndex += 8;
    }

    /**
     * Write a string to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     * @returns The string.
     */
    public writeString(name: string, val: string): string {
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
    private expand(additional: number): void {
        if (this._writeIndex + additional > this._buffer.byteLength) {
            this._buffer = Buffer.concat([this._buffer, Buffer.alloc(WriteBuffer.CHUNK_SIZE)]);
        }
    }
}
