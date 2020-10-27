/* eslint-disable no-bitwise */
/**
 * Keccak implementation based on the following.
 * https://keccak.team/keccak_specs_summary.html
 * https://github.com/emn178/js-sha3
 */
export class Sha3 {
    /**
     * Padding for Keccak algorithms
     * @internal
     */
    private static readonly KECCAK_PADDING: Uint32Array = new Uint32Array([
        0x01,
        0x100,
        0x10000,
        0x1000000
    ]);

    /**
     * Padding for sha3 algorithms.
     * @internal
     */
    private static readonly SHA3_PADDING: Uint32Array = new Uint32Array([
        0x06,
        0x600,
        0x60000,
        0x6000000
    ]);

    /**
     * Shift.
     * @internal
     */
    private static readonly SHIFT: Uint8Array = new Uint8Array([0, 8, 16, 24]);

    /**
     * Round constants split into low/high pairs.
     * @internal
     */
    private static readonly ROUND_CONSTANTS: Uint32Array = new Uint32Array([
        0x00000001,
        0x00000000,
        0x00008082,
        0x00000000,
        0x0000808A,
        0x80000000,
        0x80008000,
        0x80000000,
        0x0000808B,
        0x00000000,
        0x80000001,
        0x00000000,
        0x80008081,
        0x80000000,
        0x00008009,
        0x80000000,
        0x0000008A,
        0x00000000,
        0x00000088,
        0x00000000,
        0x80008009,
        0x00000000,
        0x8000000A,
        0x00000000,
        0x8000808B,
        0x00000000,
        0x0000008B,
        0x80000000,
        0x00008089,
        0x80000000,
        0x00008003,
        0x80000000,
        0x00008002,
        0x80000000,
        0x00000080,
        0x80000000,
        0x0000800A,
        0x00000000,
        0x8000000A,
        0x80000000,
        0x80008081,
        0x80000000,
        0x00008080,
        0x80000000,
        0x80000001,
        0x00000000,
        0x80008008,
        0x80000000
    ]);

    /* @internal */
    private readonly _padding: Uint32Array;

    /* @internal */
    private readonly _outputBits: number;

    /* @internal */
    private readonly _blockCount: number;

    /* @internal */
    private readonly _byteCount: number;

    /* @internal */
    private readonly _outputBlocks: number;

    /* @internal */
    private readonly _extraBytes: number;

    /* @internal */
    private _blocks: Uint32Array;

    /* @internal */
    private _state: Uint32Array;

    /* @internal */
    private _reset: boolean;

    /* @internal */
    private _block: number;

    /* @internal */
    private _start: number;

    /* @internal */
    private _lastByteIndex: number;

    /**
     * Create a new instance of SHA3.
     * @param bits The number of input bits.
     * @param padding The padding to use.
     * @param outputBits The number of output bits.
     */
    constructor(bits: number, padding: Uint32Array, outputBits: number) {
        this._padding = padding;
        this._outputBits = outputBits;
        this._blockCount = (1600 - (bits << 1)) >> 5;
        this._byteCount = this._blockCount << 2;
        this._outputBlocks = outputBits >> 5;
        this._extraBytes = (outputBits & 31) >> 3;

        this._reset = true;
        this._block = 0;
        this._start = 0;
        this._blocks = new Uint32Array(this._blockCount + 1);
        this._state = new Uint32Array(50);
        this._lastByteIndex = 0;
    }

    /**
     * Create instance of the sha3 algorithms.
     * @param bits The number of bits to use.
     * @returns An initialized instance of the Keccak algorithm,
     */
    public static sha3(bits: 224 | 256 | 384 | 512): Sha3 {
        return new Sha3(bits, Sha3.SHA3_PADDING, bits);
    }

    /**
     * Create instance of the keccak algorithms.
     * @param bits The number of bits to use.
     * @returns An initialized instance of the Keccak algorithm,
     */
    public static keccak(bits: 224 | 256 | 384 | 512): Sha3 {
        return new Sha3(bits, Sha3.KECCAK_PADDING, bits);
    }

    /**
     * Reset the state.
     */
    public reset(): void {
        this._reset = true;
        this._block = 0;
        this._start = 0;
        this._blocks = new Uint32Array(this._blockCount + 1);
        this._state = new Uint32Array(50);
        this._lastByteIndex = 0;
    }

    /**
     * Update the state.
     * @param input Array of data to use in the update.
     * @returns The this instance for chaining.
     */
    public update(input: Uint8Array): Sha3 {
        const message: Uint8Array = new Uint8Array(input);
        const length = message.length;
        let index = 0;
        let i;

        while (index < length) {
            if (this._reset) {
                this._reset = false;
                this._blocks[0] = this._block;
                for (i = 1; i < this._blockCount + 1; ++i) {
                    this._blocks[i] = 0;
                }
            }
            for (i = this._start; index < length && i < this._byteCount; ++index) {
                this._blocks[i >> 2] |= message[index] << Sha3.SHIFT[i++ & 3];
            }
            this._lastByteIndex = i;
            if (i >= this._byteCount) {
                this._start = i - this._byteCount;
                this._block = this._blocks[this._blockCount];
                for (i = 0; i < this._blockCount; ++i) {
                    this._state[i] ^= this._blocks[i];
                }
                this.keccakPermutation(this._state);
                this._reset = true;
            } else {
                this._start = i;
            }
        }

        return this;
    }

    /**
     * Finalize and return the hash for the digest, will also reset the state.
     * @returns Array buffer containing the digest.
     */
    public digest(): Uint8Array {
        this.finalize();

        let i = 0;
        let j = 0;
        const bytes = this._outputBits >> 3;
        let buffer = new ArrayBuffer(this._extraBytes ? (this._outputBlocks + 1) << 2 : bytes);
        const array = new Uint32Array(buffer);
        while (j < this._outputBlocks) {
            for (i = 0; i < this._blockCount && j < this._outputBlocks; ++i, ++j) {
                array[j] = this._state[i];
            }
        }
        if (this._extraBytes) {
            array[i] = this._state[i];
            buffer = buffer.slice(0, bytes);
        }
        this.reset();

        return new Uint8Array(buffer);
    }

    /* @internal */
    private finalize(): void {
        let i = this._lastByteIndex;
        this._blocks[i >> 2] |= this._padding[i & 3];
        if (this._lastByteIndex === this._byteCount) {
            this._blocks[0] = this._blocks[this._blockCount];
            for (i = 1; i < this._blockCount + 1; ++i) {
                this._blocks[i] = 0;
            }
        }
        this._blocks[this._blockCount - 1] |= 0x80000000;
        for (i = 0; i < this._blockCount; ++i) {
            this._state[i] ^= this._blocks[i];
        }
        this.keccakPermutation(this._state);
    }

    /* @internal */
    private keccakPermutation(s: Uint32Array): void {
        const b: Uint32Array = new Uint32Array(50);
        const c: Uint32Array = new Uint32Array(10);
        let h;
        let l;
        let n;
        for (n = 0; n < 48; n += 2) {
            c[0] = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
            c[1] = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
            c[2] = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
            c[3] = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
            c[4] = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
            c[5] = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
            c[6] = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
            c[7] = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
            c[8] = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
            c[9] = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

            h = c[8] ^ ((c[2] << 1) | (c[3] >>> 31));
            l = c[9] ^ ((c[3] << 1) | (c[2] >>> 31));
            s[0] ^= h;
            s[1] ^= l;
            s[10] ^= h;
            s[11] ^= l;
            s[20] ^= h;
            s[21] ^= l;
            s[30] ^= h;
            s[31] ^= l;
            s[40] ^= h;
            s[41] ^= l;
            h = c[0] ^ ((c[4] << 1) | (c[5] >>> 31));
            l = c[1] ^ ((c[5] << 1) | (c[4] >>> 31));
            s[2] ^= h;
            s[3] ^= l;
            s[12] ^= h;
            s[13] ^= l;
            s[22] ^= h;
            s[23] ^= l;
            s[32] ^= h;
            s[33] ^= l;
            s[42] ^= h;
            s[43] ^= l;
            h = c[2] ^ ((c[6] << 1) | (c[7] >>> 31));
            l = c[3] ^ ((c[7] << 1) | (c[6] >>> 31));
            s[4] ^= h;
            s[5] ^= l;
            s[14] ^= h;
            s[15] ^= l;
            s[24] ^= h;
            s[25] ^= l;
            s[34] ^= h;
            s[35] ^= l;
            s[44] ^= h;
            s[45] ^= l;
            h = c[4] ^ ((c[8] << 1) | (c[9] >>> 31));
            l = c[5] ^ ((c[9] << 1) | (c[8] >>> 31));
            s[6] ^= h;
            s[7] ^= l;
            s[16] ^= h;
            s[17] ^= l;
            s[26] ^= h;
            s[27] ^= l;
            s[36] ^= h;
            s[37] ^= l;
            s[46] ^= h;
            s[47] ^= l;
            h = c[6] ^ ((c[0] << 1) | (c[1] >>> 31));
            l = c[7] ^ ((c[1] << 1) | (c[0] >>> 31));
            s[8] ^= h;
            s[9] ^= l;
            s[18] ^= h;
            s[19] ^= l;
            s[28] ^= h;
            s[29] ^= l;
            s[38] ^= h;
            s[39] ^= l;
            s[48] ^= h;
            s[49] ^= l;

            b[0] = s[0];
            b[1] = s[1];
            b[32] = (s[11] << 4) | (s[10] >>> 28);
            b[33] = (s[10] << 4) | (s[11] >>> 28);
            b[14] = (s[20] << 3) | (s[21] >>> 29);
            b[15] = (s[21] << 3) | (s[20] >>> 29);
            b[46] = (s[31] << 9) | (s[30] >>> 23);
            b[47] = (s[30] << 9) | (s[31] >>> 23);
            b[28] = (s[40] << 18) | (s[41] >>> 14);
            b[29] = (s[41] << 18) | (s[40] >>> 14);
            b[20] = (s[2] << 1) | (s[3] >>> 31);
            b[21] = (s[3] << 1) | (s[2] >>> 31);
            b[2] = (s[13] << 12) | (s[12] >>> 20);
            b[3] = (s[12] << 12) | (s[13] >>> 20);
            b[34] = (s[22] << 10) | (s[23] >>> 22);
            b[35] = (s[23] << 10) | (s[22] >>> 22);
            b[16] = (s[33] << 13) | (s[32] >>> 19);
            b[17] = (s[32] << 13) | (s[33] >>> 19);
            b[48] = (s[42] << 2) | (s[43] >>> 30);
            b[49] = (s[43] << 2) | (s[42] >>> 30);
            b[40] = (s[5] << 30) | (s[4] >>> 2);
            b[41] = (s[4] << 30) | (s[5] >>> 2);
            b[22] = (s[14] << 6) | (s[15] >>> 26);
            b[23] = (s[15] << 6) | (s[14] >>> 26);
            b[4] = (s[25] << 11) | (s[24] >>> 21);
            b[5] = (s[24] << 11) | (s[25] >>> 21);
            b[36] = (s[34] << 15) | (s[35] >>> 17);
            b[37] = (s[35] << 15) | (s[34] >>> 17);
            b[18] = (s[45] << 29) | (s[44] >>> 3);
            b[19] = (s[44] << 29) | (s[45] >>> 3);
            b[10] = (s[6] << 28) | (s[7] >>> 4);
            b[11] = (s[7] << 28) | (s[6] >>> 4);
            b[42] = (s[17] << 23) | (s[16] >>> 9);
            b[43] = (s[16] << 23) | (s[17] >>> 9);
            b[24] = (s[26] << 25) | (s[27] >>> 7);
            b[25] = (s[27] << 25) | (s[26] >>> 7);
            b[6] = (s[36] << 21) | (s[37] >>> 11);
            b[7] = (s[37] << 21) | (s[36] >>> 11);
            b[38] = (s[47] << 24) | (s[46] >>> 8);
            b[39] = (s[46] << 24) | (s[47] >>> 8);
            b[30] = (s[8] << 27) | (s[9] >>> 5);
            b[31] = (s[9] << 27) | (s[8] >>> 5);
            b[12] = (s[18] << 20) | (s[19] >>> 12);
            b[13] = (s[19] << 20) | (s[18] >>> 12);
            b[44] = (s[29] << 7) | (s[28] >>> 25);
            b[45] = (s[28] << 7) | (s[29] >>> 25);
            b[26] = (s[38] << 8) | (s[39] >>> 24);
            b[27] = (s[39] << 8) | (s[38] >>> 24);
            b[8] = (s[48] << 14) | (s[49] >>> 18);
            b[9] = (s[49] << 14) | (s[48] >>> 18);

            s[0] = b[0] ^ (~b[2] & b[4]);
            s[1] = b[1] ^ (~b[3] & b[5]);
            s[10] = b[10] ^ (~b[12] & b[14]);
            s[11] = b[11] ^ (~b[13] & b[15]);
            s[20] = b[20] ^ (~b[22] & b[24]);
            s[21] = b[21] ^ (~b[23] & b[25]);
            s[30] = b[30] ^ (~b[32] & b[34]);
            s[31] = b[31] ^ (~b[33] & b[35]);
            s[40] = b[40] ^ (~b[42] & b[44]);
            s[41] = b[41] ^ (~b[43] & b[45]);
            s[2] = b[2] ^ (~b[4] & b[6]);
            s[3] = b[3] ^ (~b[5] & b[7]);
            s[12] = b[12] ^ (~b[14] & b[16]);
            s[13] = b[13] ^ (~b[15] & b[17]);
            s[22] = b[22] ^ (~b[24] & b[26]);
            s[23] = b[23] ^ (~b[25] & b[27]);
            s[32] = b[32] ^ (~b[34] & b[36]);
            s[33] = b[33] ^ (~b[35] & b[37]);
            s[42] = b[42] ^ (~b[44] & b[46]);
            s[43] = b[43] ^ (~b[45] & b[47]);
            s[4] = b[4] ^ (~b[6] & b[8]);
            s[5] = b[5] ^ (~b[7] & b[9]);
            s[14] = b[14] ^ (~b[16] & b[18]);
            s[15] = b[15] ^ (~b[17] & b[19]);
            s[24] = b[24] ^ (~b[26] & b[28]);
            s[25] = b[25] ^ (~b[27] & b[29]);
            s[34] = b[34] ^ (~b[36] & b[38]);
            s[35] = b[35] ^ (~b[37] & b[39]);
            s[44] = b[44] ^ (~b[46] & b[48]);
            s[45] = b[45] ^ (~b[47] & b[49]);
            s[6] = b[6] ^ (~b[8] & b[0]);
            s[7] = b[7] ^ (~b[9] & b[1]);
            s[16] = b[16] ^ (~b[18] & b[10]);
            s[17] = b[17] ^ (~b[19] & b[11]);
            s[26] = b[26] ^ (~b[28] & b[20]);
            s[27] = b[27] ^ (~b[29] & b[21]);
            s[36] = b[36] ^ (~b[38] & b[30]);
            s[37] = b[37] ^ (~b[39] & b[31]);
            s[46] = b[46] ^ (~b[48] & b[40]);
            s[47] = b[47] ^ (~b[49] & b[41]);
            s[8] = b[8] ^ (~b[0] & b[2]);
            s[9] = b[9] ^ (~b[1] & b[3]);
            s[18] = b[18] ^ (~b[10] & b[12]);
            s[19] = b[19] ^ (~b[11] & b[13]);
            s[28] = b[28] ^ (~b[20] & b[22]);
            s[29] = b[29] ^ (~b[21] & b[23]);
            s[38] = b[38] ^ (~b[30] & b[32]);
            s[39] = b[39] ^ (~b[31] & b[33]);
            s[48] = b[48] ^ (~b[40] & b[42]);
            s[49] = b[49] ^ (~b[41] & b[43]);

            s[0] ^= Sha3.ROUND_CONSTANTS[n];
            s[1] ^= Sha3.ROUND_CONSTANTS[n + 1];
        }
    }
}
