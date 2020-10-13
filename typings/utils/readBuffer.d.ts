/// <reference types="node" />
/**
 * Keep track of the read index within a buffer.
 */
export declare class ReadBuffer {
    /**
     * The buffer.
     */
    private readonly _buffer;
    /**
     * The current read index.
     */
    private _readIndex;
    /**
     * Create a new instance of ReadBuffer.
     * @param buffer The buffer to access.
     * @param readStartIndex The index to start the reading from.
     */
    constructor(buffer: Buffer, readStartIndex?: number);
    /**
     * Get the length of the buffer.
     * @returns The buffer length.
     */
    length(): number;
    /**
     * Does the buffer have enough data remaining.
     * @param remaining The amount of space needed.
     * @returns True if it has enough data.
     */
    hasRemaining(remaining: number): boolean;
    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    unused(): number;
    /**
     * Read fixed length buffer.
     * @param name The name of the data we are trying to read.
     * @param length The length of the data to read.
     * @returns The buffer.
     */
    readFixedBufferHex(name: string, length: number): string;
    /**
     * Read a byte from the buffer.
     * @param name The name of the data we are trying to read.
     * @returns The value.
     */
    readByte(name: string): number;
    /**
     * Read a UInt16 from the buffer.
     * @param name The name of the data we are trying to read.
     * @returns The value.
     */
    readUInt16(name: string): number;
    /**
     * Read a UInt32 from the buffer.
     * @param name The name of the data we are trying to read.
     * @returns The value.
     */
    readUInt32(name: string): number;
    /**
     * Read a UInt64 from the buffer.
     * @param name The name of the data we are trying to read.
     * @returns The value.
     */
    readUInt64(name: string): bigint;
    /**
     * Read a string from the buffer.
     * @param name The name of the data we are trying to read.
     * @returns The string.
     */
    readString(name: string): string;
}
