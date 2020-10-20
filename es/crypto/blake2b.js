"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blake2b = void 0;
/* eslint-disable no-bitwise */
/**
 * Class to help with Blake2B Signature scheme.
 * TypeScript conversion from https://github.com/dcposch/blakejs
 */
var Blake2b = /** @class */ (function () {
    /**
     * Create a new instance of Blake2b.
     */
    function Blake2b() {
        this._v = new Uint32Array(32);
        this._m = new Uint32Array(32);
    }
    /**
     * Perform Sum 256 on the data.
     * @param data The data to operate on.
     * @returns The sum 256 of the data.
     */
    Blake2b.sum256 = function (data) {
        var b2b = new Blake2b();
        var ctx = b2b.init(Blake2b.SIZE_256);
        b2b.update(ctx, data);
        return b2b.final(ctx);
    };
    /**
     * Perform Sum 512 on the data.
     * @param data The data to operate on.
     * @returns The sum 512 of the data.
     */
    Blake2b.sum512 = function (data) {
        var b2b = new Blake2b();
        var ctx = b2b.init(Blake2b.SIZE_512);
        b2b.update(ctx, data);
        return b2b.final(ctx);
    };
    /**
     * Compression.
     * Note we're representing 16 uint64s as 32 uint32s
     * @param ctx The context.
     * @param ctx.b Array.
     * @param ctx.h Array.
     * @param ctx.t Number.
     * @param ctx.c Number.
     * @param ctx.outlen The output length.
     * @param last Is this the last block.
     */
    Blake2b.prototype.compress = function (ctx, last) {
        var i = 0;
        // init work variables
        for (i = 0; i < 16; i++) {
            this._v[i] = ctx.h[i];
            this._v[i + 16] = Blake2b.BLAKE2B_IV32[i];
        }
        // low 64 bits of offset
        this._v[24] ^= ctx.t;
        this._v[25] ^= ctx.t / 0x100000000;
        // high 64 bits not supported, offset may not be higher than 2**53-1
        // last block flag set ?
        if (last) {
            this._v[28] = ~this._v[28];
            this._v[29] = ~this._v[29];
        }
        // get little-endian words
        for (i = 0; i < 32; i++) {
            this._m[i] = this.b2bGet32(ctx.b, 4 * i);
        }
        // twelve rounds of mixing
        for (i = 0; i < 12; i++) {
            this.b2bG(0, 8, 16, 24, Blake2b.SIGMA82[(i * 16) + 0], Blake2b.SIGMA82[(i * 16) + 1]);
            this.b2bG(2, 10, 18, 26, Blake2b.SIGMA82[(i * 16) + 2], Blake2b.SIGMA82[(i * 16) + 3]);
            this.b2bG(4, 12, 20, 28, Blake2b.SIGMA82[(i * 16) + 4], Blake2b.SIGMA82[(i * 16) + 5]);
            this.b2bG(6, 14, 22, 30, Blake2b.SIGMA82[(i * 16) + 6], Blake2b.SIGMA82[(i * 16) + 7]);
            this.b2bG(0, 10, 20, 30, Blake2b.SIGMA82[(i * 16) + 8], Blake2b.SIGMA82[(i * 16) + 9]);
            this.b2bG(2, 12, 22, 24, Blake2b.SIGMA82[(i * 16) + 10], Blake2b.SIGMA82[(i * 16) + 11]);
            this.b2bG(4, 14, 16, 26, Blake2b.SIGMA82[(i * 16) + 12], Blake2b.SIGMA82[(i * 16) + 13]);
            this.b2bG(6, 8, 18, 28, Blake2b.SIGMA82[(i * 16) + 14], Blake2b.SIGMA82[(i * 16) + 15]);
        }
        for (i = 0; i < 16; i++) {
            ctx.h[i] = ctx.h[i] ^ this._v[i] ^ this._v[i + 16];
        }
    };
    /**
     * Creates a BLAKE2b hashing context.
     * @param outlen Output length between 1 and 64 bytes.
     * @param key Optional key.
     * @returns The initialized context.
     */
    Blake2b.prototype.init = function (outlen, key) {
        if (outlen <= 0 || outlen > 64) {
            throw new Error("Illegal output length, expected 0 < length <= 64");
        }
        if (key && key.length > 64) {
            throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
        }
        // state, 'param block'
        var ctx = {
            b: new Uint8Array(128),
            h: new Uint32Array(16),
            t: 0,
            c: 0,
            outlen: outlen // output length in bytes
        };
        // initialize hash state
        for (var i = 0; i < 16; i++) {
            ctx.h[i] = Blake2b.BLAKE2B_IV32[i];
        }
        var keylen = key ? key.length : 0;
        ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen;
        // key the hash, if applicable
        if (key) {
            this.update(ctx, key);
            // at the end
            ctx.c = 128;
        }
        return ctx;
    };
    /**
     * Updates a BLAKE2b streaming hash.
     * @param ctx The context.
     * @param ctx.b Array.
     * @param ctx.h Array.
     * @param ctx.t Number.
     * @param ctx.c Number.
     * @param ctx.outlen The output length.
     * @param input The data to hash.
     */
    Blake2b.prototype.update = function (ctx, input) {
        for (var i = 0; i < input.length; i++) {
            if (ctx.c === 128) { // buffer full ?
                ctx.t += ctx.c; // add counters
                this.compress(ctx, false); // compress (not last)
                ctx.c = 0; // counter to zero
            }
            ctx.b[ctx.c++] = input[i];
        }
    };
    /**
     * Completes a BLAKE2b streaming hash.
     * @param ctx The context.
     * @param ctx.b Array.
     * @param ctx.h Array.
     * @param ctx.t Number.
     * @param ctx.c Number.
     * @param ctx.outlen The output length.
     * @returns The final data.
     */
    Blake2b.prototype.final = function (ctx) {
        ctx.t += ctx.c; // mark last block offset
        while (ctx.c < 128) { // fill up with zeros
            ctx.b[ctx.c++] = 0;
        }
        this.compress(ctx, true); // final block flag = 1
        // little endian convert and store
        var out = new Uint8Array(ctx.outlen);
        for (var i = 0; i < ctx.outlen; i++) {
            out[i] = ctx.h[i >> 2] >> (8 * (i & 3));
        }
        return out;
    };
    /**
     * 64-bit unsigned addition
     * Sets v[a,a+1] += v[b,b+1]
     * @param v The array.
     * @param a The a index.
     * @param b The b index.
     */
    Blake2b.prototype.add64AA = function (v, a, b) {
        var o0 = v[a] + v[b];
        var o1 = v[a + 1] + v[b + 1];
        if (o0 >= 0x100000000) {
            o1++;
        }
        v[a] = o0;
        v[a + 1] = o1;
    };
    /**
     * 64-bit unsigned addition.
     * Sets v[a,a+1] += b.
     * @param v The array of data to work on.
     * @param a The index to use.
     * @param b0 Is the low 32 bits.
     * @param b1 Represents the high 32 bits.
     */
    Blake2b.prototype.add64AC = function (v, a, b0, b1) {
        var o0 = v[a] + b0;
        if (b0 < 0) {
            o0 += 0x100000000;
        }
        var o1 = v[a + 1] + b1;
        if (o0 >= 0x100000000) {
            o1++;
        }
        v[a] = o0;
        v[a + 1] = o1;
    };
    /**
     * Little endian read byte 32;
     * @param arr The array to read from .
     * @param i The index to start reading from.
     * @returns The value.
     */
    Blake2b.prototype.b2bGet32 = function (arr, i) {
        return (arr[i] ^
            (arr[i + 1] << 8) ^
            (arr[i + 2] << 16) ^
            (arr[i + 3] << 24));
    };
    /**
     * G Mixing function.
     * The ROTRs are inlined for speed.
     * @param a The a value.
     * @param b The b value.
     * @param c The c value.
     * @param d The d value.
     * @param ix The ix value.
     * @param iy The iy value.
     */
    Blake2b.prototype.b2bG = function (a, b, c, d, ix, iy) {
        var x0 = this._m[ix];
        var x1 = this._m[ix + 1];
        var y0 = this._m[iy];
        var y1 = this._m[iy + 1];
        this.add64AA(this._v, a, b); // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
        this.add64AC(this._v, a, x0, x1); // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits
        // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
        var xor0 = this._v[d] ^ this._v[a];
        var xor1 = this._v[d + 1] ^ this._v[a + 1];
        this._v[d] = xor1;
        this._v[d + 1] = xor0;
        this.add64AA(this._v, c, d);
        // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
        xor0 = this._v[b] ^ this._v[c];
        xor1 = this._v[b + 1] ^ this._v[c + 1];
        this._v[b] = (xor0 >>> 24) ^ (xor1 << 8);
        this._v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8);
        this.add64AA(this._v, a, b);
        this.add64AC(this._v, a, y0, y1);
        // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
        xor0 = this._v[d] ^ this._v[a];
        xor1 = this._v[d + 1] ^ this._v[a + 1];
        this._v[d] = (xor0 >>> 16) ^ (xor1 << 16);
        this._v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16);
        this.add64AA(this._v, c, d);
        // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
        xor0 = this._v[b] ^ this._v[c];
        xor1 = this._v[b + 1] ^ this._v[c + 1];
        this._v[b] = (xor1 >>> 31) ^ (xor0 << 1);
        this._v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1);
    };
    /**
     * Blake2b 256.
     */
    Blake2b.SIZE_256 = 32;
    /**
     * Blake2b 512.
     */
    Blake2b.SIZE_512 = 64;
    /**
     * Initialization Vector.
     */
    Blake2b.BLAKE2B_IV32 = new Uint32Array([
        0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
        0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
        0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
        0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
    ]);
    /**
     * Initialization Vector.
     */
    Blake2b.SIGMA8 = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
        11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
        7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
        9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
        2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
        12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
        13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
        6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
        10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3
    ];
    /**
     * These are offsets into a uint64 buffer.
     * Multiply them all by 2 to make them offsets into a uint32 buffer,
     * because this is Javascript and we don't have uint64s
     */
    Blake2b.SIGMA82 = new Uint8Array(Blake2b.SIGMA8.map(function (x) { return x * 2; }));
    return Blake2b;
}());
exports.Blake2b = Blake2b;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxha2UyYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vYmxha2UyYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0I7OztHQUdHO0FBQ0g7SUF3REk7O09BRUc7SUFDSDtRQUNJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLGNBQU0sR0FBcEIsVUFBcUIsSUFBZ0I7UUFDakMsSUFBTSxHQUFHLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUMxQixJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyxjQUFNLEdBQXBCLFVBQXFCLElBQWdCO1FBQ2pDLElBQU0sR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUIsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0ssMEJBQVEsR0FBaEIsVUFBaUIsR0FNaEIsRUFBRSxJQUFhO1FBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRVYsc0JBQXNCO1FBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQ25DLG9FQUFvRTtRQUVwRSx3QkFBd0I7UUFDeEIsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5QjtRQUVELDBCQUEwQjtRQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFFRCwwQkFBMEI7UUFDMUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0Y7UUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUN0RDtJ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QUNwRCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3BELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEQsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNwRCxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BELEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEQsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNwRCxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3BELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDcEQsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztLQUN2RCxDQUFDO0lBRUY7Ozs7T0FJRztJQUNxQixlQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEdBQUcsQ0FBQyxFQUFMLENBQUssQ0FBQyxDQUFDLENBQUM7SUFxVHJGLGNBQUM7Q0FBQSxBQWpXRCxJQWlXQztBQWpXWSwwQkFBTyJ9