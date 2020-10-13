/// <reference types="node" />
/**
 * Keep track of the write index within a buffer.
 */
export declare class WriteBuffer {
    /**
     * Chunk size to expand the buffer.
     */
    private static readonly CHUNK_SIZE;
    /**
     * The buffer.
     */
    private _buffer;
    /**
     * The current write index.
     */
    private _writeIndex;
    /**
     * Create a new instance of ReadBuffer.
     */
    constructor();
    /**
     * Get the length of the buffer.
     * @returns The buffer length.
     */
    length(): number;
    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    unused(): number;
    /**
     * Get the final buffer.
     * @returns The final buffer.
     */
    finalBuffer(): Buffer;
    /**
     * Get the current write index.
     * @returns The current write index.
     */
    getWriteIndex(): number;
    /**
     * Set the current write index.
     * @param writeIndex The current write index.
     */
    setWriteIndex(writeIndex: number): void;
    /**
     * Write fixed length buffer.
     * @param name The name of the data we are trying to write.
     * @param length The length of the data to write.
     * @param val The data to write.
     */
    writeFixedBufferHex(name: string, length: number, val: string): void;
    /**
     * Write a byte to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeByte(name: string, val: number): void;
    /**
     * Write a UInt16 to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt16(name: string, val: number): void;
    /**
     * Write a UInt32 to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt32(name: string, val: number): void;
    /**
     * Write a UInt64 to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt64(name: string, val: bigint): void;
    /**
     * Write a string to the buffer.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     * @returns The string.
     */
    writeString(name: string, val: string): string;
    /**
     * Expand the buffer if there is not enough spave.
     * @param additional The amount of space needed.
     */
    private expand;
}
