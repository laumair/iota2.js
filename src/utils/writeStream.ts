/* eslint-disable no-bitwise */
import { isHex } from "../binary/common";
import { Converter } from "./converter";

/**
 * Keep track of the write index within a stream.
 */
export class WriteStream {
    /**
     * Chunk size to expand the storage.
     * @internal
     */
    private static readonly CHUNK_SIZE: number = 4096;

    /**
     * The storage.
     * @internal
     */
    private _storage: Uint8Array;

    /**
     * The current write index.
     * @internal
     */
    private _writeIndex: number;

    /**
     * Create a new instance of ReadStream.
     */
    constructor() {
        this._storage = new Uint8Array(WriteStream.CHUNK_SIZE);
        this._writeIndex = 0;
    }

    /**
     * Get the length of the stream.
     * @returns The stream length.
     */
    public length(): number {
        return this._storage.length;
    }

    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    public unused(): number {
        return this._storage.length - this._writeIndex;
    }

    /**
     * Get the final stream as bytes.
     * @returns The final stream.
     */
    public finalBytes(): Uint8Array {
        return this._storage.subarray(0, this._writeIndex);
    }

    /**
     * Get the final stream as hex.
     * @returns The final stream as hex.
     */
    public finalHex(): string {
        return Converter.bytesToHex(this._storage.subarray(0, this._writeIndex));
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
     * Write fixed length stream.
     * @param name The name of the data we are trying to write.
     * @param length The length of the data to write.
     * @param val The data to write.
     */
    public writeFixedHex(name: string, length: number, val: string): void {
        if (!isHex(val)) {
            throw new Error(`The ${val} should be in hex format`);
        }

        // Hex should be twice the length as each byte is 2 ascii characters
        if (length * 2 !== val.length) {
            throw new Error(`${name} length ${val.length} does not match expected length ${length * 2}`);
        }

        this.expand(length);

        this._storage.set(Converter.hexToBytes(val), this._writeIndex);
        this._writeIndex += length;
    }

    /**
     * Write a byte to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    public writeByte(name: string, val: number): void {
        this.expand(1);

        this._storage[this._writeIndex++] = val & 0xFF;
    }

    /**
     * Write a UInt16 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    public writeUInt16(name: string, val: number): void {
        this.expand(2);

        this._storage[this._writeIndex++] = val & 0xFF;
        this._storage[this._writeIndex++] = val >>> 8;
    }

    /**
     * Write a UInt32 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    public writeUInt32(name: string, val: number): void {
        this.expand(4);

        this._storage[this._writeIndex++] = val & 0xFF;
        this._storage[this._writeIndex++] = val >>> 8;
        this._storage[this._writeIndex++] = val >>> 16;
        this._storage[this._writeIndex++] = val >>> 24;
    }

    /**
     * Write a UInt64 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    public writeUInt64(name: string, val: bigint): void {
        this.expand(8);

        const hex = val.toString(16).padStart(16, "0");
        const arr = Converter.hexToBytes(hex, true);
        this._storage.set(arr, this._writeIndex);

        this._writeIndex += 8;
    }

    /**
     * Write a string to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     * @returns The string.
     */
    public writeString(name: string, val: string): string {
        this.writeUInt16(name, val.length);

        this.expand(val.length);

        this._storage.set(Converter.asciiToBytes(val), this._writeIndex);
        this._writeIndex += val.length;

        return val;
    }

    /**
     * Expand the storage if there is not enough spave.
     * @param additional The amount of space needed.
     */
    private expand(additional: number): void {
        if (this._writeIndex + additional > this._storage.byteLength) {
            const newArr = new Uint8Array(this._storage.length + WriteStream.CHUNK_SIZE);
            newArr.set(this._storage, 0);
            this._storage = newArr;
        }
    }
}
