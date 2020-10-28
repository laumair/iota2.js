(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('node-fetch'), require('tweetnacl')) :
	typeof define === 'function' && define.amd ? define(['node-fetch', 'tweetnacl'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Iota2 = factory(global['node-fetch'], global.tweetnacl));
}(this, (function (require$$0$1, require$$0) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var clientError = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ClientError = void 0;
	/**
	 * Class to handle http errors.
	 */
	var ClientError = /** @class */ (function (_super) {
	    __extends(ClientError, _super);
	    /**
	     * Create a new instance of ClientError.
	     * @param message The message for the error.
	     * @param route The route the request was made to.
	     * @param httpStatus The http status code.
	     * @param code The code in the payload.
	     */
	    function ClientError(message, route, httpStatus, code) {
	        var _this = _super.call(this, message) || this;
	        _this.route = route;
	        _this.httpStatus = httpStatus;
	        _this.code = code;
	        return _this;
	    }
	    return ClientError;
	}(Error));
	exports.ClientError = ClientError;

	});

	var IAddress = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IAddressOutputs = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IChildren = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IClient = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IInfo = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IMessageId = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IMessageMetadata = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IMessages = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IMilestone = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IOutput = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IResponse = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var ITips = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var arrayHelper = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ArrayHelper = void 0;
	/* eslint-disable no-bitwise */
	/**
	 * Array helper methods.
	 */
	var ArrayHelper = /** @class */ (function () {
	    function ArrayHelper() {
	    }
	    /**
	     * Ar the two array equals.
	     * @param array1 The first array.
	     * @param array2 The second arry.
	     * @returns True if the arrays are equal.
	     */
	    ArrayHelper.equal = function (array1, array2) {
	        if (!array1 || !array2 || array1.length !== array2.length) {
	            return false;
	        }
	        for (var i = 0; i < array1.length; i++) {
	            if (array1[i] !== array2[i]) {
	                return false;
	            }
	        }
	        return true;
	    };
	    return ArrayHelper;
	}());
	exports.ArrayHelper = ArrayHelper;

	});

	var blake2b = createCommonjsModule(function (module, exports) {
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
	     * @internal
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
	     * @internal
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
	     * @internal
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
	     * @internal
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
	     * @internal
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
	     * @internal
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
	     * @internal
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
	     * @internal
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
	     * @internal
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
	     * @internal
	     */
	    Blake2b.SIZE_256 = 32;
	    /**
	     * Blake2b 512.
	     * @internal
	     */
	    Blake2b.SIZE_512 = 64;
	    /**
	     * Initialization Vector.
	     * @internal
	     */
	    Blake2b.BLAKE2B_IV32 = new Uint32Array([
	        0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
	        0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
	        0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
	        0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
	    ]);
	    /**
	     * Initialization Vector.
	     * @internal
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
	     * @internal
	     */
	    Blake2b.SIGMA82 = new Uint8Array(Blake2b.SIGMA8.map(function (x) { return x * 2; }));
	    return Blake2b;
	}());
	exports.Blake2b = Blake2b;

	});

	var ed25519 = createCommonjsModule(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Ed25519 = void 0;
	var nacl = __importStar(require$$0__default['default']);


	/**
	 * Class to help with Ed25519 Signature scheme.
	 */
	var Ed25519 = /** @class */ (function () {
	    function Ed25519() {
	    }
	    /**
	     * Privately sign the data.
	     * @param privateKey The private key to sign with.
	     * @param data The data to sign.
	     * @returns The signature.
	     */
	    Ed25519.signData = function (privateKey, data) {
	        return nacl.sign.detached(data, privateKey);
	    };
	    /**
	     * Use the public key and signature to validate the data.
	     * @param publicKey The public key to verify with.
	     * @param signature The signature to verify.
	     * @param data The data to verify.
	     * @returns True if the data and address is verified.
	     */
	    Ed25519.verifyData = function (publicKey, signature, data) {
	        return nacl.sign.detached.verify(data, signature, publicKey);
	    };
	    /**
	     * Convert the public key to an address.
	     * @param publicKey The public key to convert.
	     * @returns The address.
	     */
	    Ed25519.publicKeyToAddress = function (publicKey) {
	        return blake2b.Blake2b.sum256(publicKey);
	    };
	    /**
	     * Use the public key to validate the address.
	     * @param publicKey The public key to verify with.
	     * @param address The address to verify.
	     * @returns True if the data and address is verified.
	     */
	    Ed25519.verifyAddress = function (publicKey, address) {
	        return arrayHelper.ArrayHelper.equal(Ed25519.publicKeyToAddress(publicKey), address);
	    };
	    /**
	     * Public Key size.
	     * @internal
	     */
	    Ed25519.PUBLIC_KEY_SIZE = 32;
	    /**
	     * Signature size for signing scheme.
	     * @internal
	     */
	    Ed25519.SIGNATURE_SIZE = 64;
	    /**
	     * Address size.
	     * @internal
	     */
	    Ed25519.ADDRESS_LENGTH = blake2b.Blake2b.SIZE_256;
	    return Ed25519;
	}());
	exports.Ed25519 = Ed25519;

	});

	var common = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isHex = exports.ARRAY_LENGTH = exports.STRING_LENGTH = exports.SMALL_TYPE_LENGTH = exports.TYPE_LENGTH = exports.TRANSACTION_ID_LENGTH = exports.MESSAGE_ID_LENGTH = exports.UINT64_SIZE = exports.UINT32_SIZE = exports.UINT16_SIZE = exports.BYTE_SIZE = void 0;

	exports.BYTE_SIZE = 1;
	exports.UINT16_SIZE = 2;
	exports.UINT32_SIZE = 4;
	exports.UINT64_SIZE = 8;
	exports.MESSAGE_ID_LENGTH = blake2b.Blake2b.SIZE_256;
	exports.TRANSACTION_ID_LENGTH = blake2b.Blake2b.SIZE_256;
	exports.TYPE_LENGTH = exports.UINT32_SIZE;
	exports.SMALL_TYPE_LENGTH = exports.BYTE_SIZE;
	exports.STRING_LENGTH = exports.UINT16_SIZE;
	exports.ARRAY_LENGTH = exports.UINT16_SIZE;
	/**
	 * Is the data hex format.
	 * @param value The value to test.
	 * @returns true if the string is hex.
	 */
	function isHex(value) {
	    if (value.length % 2 === 1) {
	        return false;
	    }
	    return /[\da-f]/gi.test(value);
	}
	exports.isHex = isHex;

	});

	var address = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.serializeEd25519Address = exports.deserializeEd25519Address = exports.serializeAddress = exports.deserializeAddress = exports.MIN_ED25519_ADDRESS_LENGTH = exports.MIN_ADDRESS_LENGTH = void 0;


	exports.MIN_ADDRESS_LENGTH = common.SMALL_TYPE_LENGTH;
	exports.MIN_ED25519_ADDRESS_LENGTH = exports.MIN_ADDRESS_LENGTH + ed25519.Ed25519.ADDRESS_LENGTH;
	/**
	 * Deserialize the address from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeAddress(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_ADDRESS_LENGTH)) {
	        throw new Error("Address data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ADDRESS_LENGTH);
	    }
	    var type = readStream.readByte("address.type", false);
	    var address;
	    if (type === 1) {
	        address = deserializeEd25519Address(readStream);
	    }
	    else {
	        throw new Error("Unrecognized address type " + type);
	    }
	    return address;
	}
	exports.deserializeAddress = deserializeAddress;
	/**
	 * Serialize the address to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeAddress(writeStream, object) {
	    if (object.type === 1) {
	        serializeEd25519Address(writeStream, object);
	    }
	    else {
	        throw new Error("Unrecognized address type " + object.type);
	    }
	}
	exports.serializeAddress = serializeAddress;
	/**
	 * Deserialize the Ed25519 address from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeEd25519Address(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_ED25519_ADDRESS_LENGTH)) {
	        throw new Error("Ed25519 address data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ED25519_ADDRESS_LENGTH);
	    }
	    var type = readStream.readByte("ed25519Address.type");
	    if (type !== 1) {
	        throw new Error("Type mismatch in ed25519Address " + type);
	    }
	    var address = readStream.readFixedHex("ed25519Address.address", ed25519.Ed25519.ADDRESS_LENGTH);
	    return {
	        type: type,
	        address: address
	    };
	}
	exports.deserializeEd25519Address = deserializeEd25519Address;
	/**
	 * Serialize the ed25519 address to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeEd25519Address(writeStream, object) {
	    writeStream.writeByte("ed25519Address.type", object.type);
	    writeStream.writeFixedHex("ed25519Address.address", ed25519.Ed25519.ADDRESS_LENGTH, object.address);
	}
	exports.serializeEd25519Address = serializeEd25519Address;

	});

	var input = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.serializeUTXOInput = exports.deserializeUTXOInput = exports.serializeInput = exports.deserializeInput = exports.serializeInputs = exports.deserializeInputs = exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH = void 0;

	exports.MIN_INPUT_LENGTH = common.SMALL_TYPE_LENGTH;
	exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH + common.TRANSACTION_ID_LENGTH + common.UINT16_SIZE;
	/**
	 * Deserialize the inputs from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeInputs(readStream) {
	    var numInputs = readStream.readUInt16("inputs.numInputs");
	    var inputs = [];
	    for (var i = 0; i < numInputs; i++) {
	        inputs.push(deserializeInput(readStream));
	    }
	    return inputs;
	}
	exports.deserializeInputs = deserializeInputs;
	/**
	 * Serialize the inputs to binary.
	 * @param writeStream The stream to write the data to.
	 * @param objects The objects to serialize.
	 */
	function serializeInputs(writeStream, objects) {
	    writeStream.writeUInt16("inputs.numInputs", objects.length);
	    for (var i = 0; i < objects.length; i++) {
	        serializeInput(writeStream, objects[i]);
	    }
	}
	exports.serializeInputs = serializeInputs;
	/**
	 * Deserialize the input from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeInput(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_INPUT_LENGTH)) {
	        throw new Error("Input data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_INPUT_LENGTH);
	    }
	    var type = readStream.readByte("input.type", false);
	    var input;
	    if (type === 0) {
	        input = deserializeUTXOInput(readStream);
	    }
	    else {
	        throw new Error("Unrecognized input type " + type);
	    }
	    return input;
	}
	exports.deserializeInput = deserializeInput;
	/**
	 * Serialize the input to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeInput(writeStream, object) {
	    if (object.type === 0) {
	        serializeUTXOInput(writeStream, object);
	    }
	    else {
	        throw new Error("Unrecognized input type " + object.type);
	    }
	}
	exports.serializeInput = serializeInput;
	/**
	 * Deserialize the utxo input from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeUTXOInput(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_UTXO_INPUT_LENGTH)) {
	        throw new Error("UTXO Input data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_UTXO_INPUT_LENGTH);
	    }
	    var type = readStream.readByte("utxoInput.type");
	    if (type !== 0) {
	        throw new Error("Type mismatch in utxoInput " + type);
	    }
	    var transactionId = readStream.readFixedHex("utxoInput.transactionId", common.TRANSACTION_ID_LENGTH);
	    var transactionOutputIndex = readStream.readUInt16("utxoInput.transactionOutputIndex");
	    return {
	        type: type,
	        transactionId: transactionId,
	        transactionOutputIndex: transactionOutputIndex
	    };
	}
	exports.deserializeUTXOInput = deserializeUTXOInput;
	/**
	 * Serialize the utxo input to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeUTXOInput(writeStream, object) {
	    writeStream.writeByte("utxoInput.type", object.type);
	    writeStream.writeFixedHex("utxoInput.transactionId", common.TRANSACTION_ID_LENGTH, object.transactionId);
	    writeStream.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
	}
	exports.serializeUTXOInput = serializeUTXOInput;

	});

	var output = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.serializeSigLockedSingleOutput = exports.deserializeSigLockedSingleOutput = exports.serializeOutput = exports.deserializeOutput = exports.serializeOutputs = exports.deserializeOutputs = exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH = void 0;


	exports.MIN_OUTPUT_LENGTH = common.SMALL_TYPE_LENGTH;
	exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH + address.MIN_ADDRESS_LENGTH + address.MIN_ED25519_ADDRESS_LENGTH;
	/**
	 * Deserialize the outputs from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeOutputs(readStream) {
	    var numOutputs = readStream.readUInt16("outputs.numOutputs");
	    var inputs = [];
	    for (var i = 0; i < numOutputs; i++) {
	        inputs.push(deserializeOutput(readStream));
	    }
	    return inputs;
	}
	exports.deserializeOutputs = deserializeOutputs;
	/**
	 * Serialize the outputs to binary.
	 * @param writeStream The stream to write the data to.
	 * @param objects The objects to serialize.
	 */
	function serializeOutputs(writeStream, objects) {
	    writeStream.writeUInt16("outputs.numOutputs", objects.length);
	    for (var i = 0; i < objects.length; i++) {
	        serializeOutput(writeStream, objects[i]);
	    }
	}
	exports.serializeOutputs = serializeOutputs;
	/**
	 * Deserialize the output from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeOutput(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_OUTPUT_LENGTH)) {
	        throw new Error("Output data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_OUTPUT_LENGTH);
	    }
	    var type = readStream.readByte("output.type", false);
	    var input;
	    if (type === 0) {
	        input = deserializeSigLockedSingleOutput(readStream);
	    }
	    else {
	        throw new Error("Unrecognized output type " + type);
	    }
	    return input;
	}
	exports.deserializeOutput = deserializeOutput;
	/**
	 * Serialize the output to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeOutput(writeStream, object) {
	    if (object.type === 0) {
	        serializeSigLockedSingleOutput(writeStream, object);
	    }
	    else {
	        throw new Error("Unrecognized output type " + object.type);
	    }
	}
	exports.serializeOutput = serializeOutput;
	/**
	 * Deserialize the signature locked single output from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeSigLockedSingleOutput(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_SIG_LOCKED_OUTPUT_LENGTH)) {
	        throw new Error("Signature Locked Single Output data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIG_LOCKED_OUTPUT_LENGTH);
	    }
	    var type = readStream.readByte("sigLockedSingleOutput.type");
	    if (type !== 0) {
	        throw new Error("Type mismatch in sigLockedSingleOutput " + type);
	    }
	    var address$1 = address.deserializeAddress(readStream);
	    var amount = readStream.readUInt64("sigLockedSingleOutput.amount");
	    return {
	        type: type,
	        address: address$1,
	        amount: Number(amount)
	    };
	}
	exports.deserializeSigLockedSingleOutput = deserializeSigLockedSingleOutput;
	/**
	 * Serialize the signature locked single output to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeSigLockedSingleOutput(writeStream, object) {
	    writeStream.writeByte("sigLockedSingleOutput.type", object.type);
	    address.serializeAddress(writeStream, object.address);
	    writeStream.writeUInt64("sigLockedSingleOutput.amount", BigInt(object.amount));
	}
	exports.serializeSigLockedSingleOutput = serializeSigLockedSingleOutput;

	});

	var transaction = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.serializeTransactionEssence = exports.deserializeTransactionEssence = exports.MIN_TRANSACTION_ESSENCE_LENGTH = void 0;




	exports.MIN_TRANSACTION_ESSENCE_LENGTH = common.SMALL_TYPE_LENGTH + (2 * common.ARRAY_LENGTH) + common.UINT32_SIZE;
	/**
	 * Deserialize the transaction essence from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeTransactionEssence(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_TRANSACTION_ESSENCE_LENGTH)) {
	        throw new Error("Transaction essence data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_TRANSACTION_ESSENCE_LENGTH);
	    }
	    var type = readStream.readByte("transactionEssence.type");
	    if (type !== 0) {
	        throw new Error("Type mismatch in transactionEssence " + type);
	    }
	    var inputs = input.deserializeInputs(readStream);
	    var outputs = output.deserializeOutputs(readStream);
	    var payload$1 = payload.deserializePayload(readStream);
	    if (payload$1 && payload$1.type !== 2) {
	        throw new Error("Transaction essence can only contain embedded Indexation Payload");
	    }
	    return {
	        type: type,
	        inputs: inputs,
	        outputs: outputs,
	        payload: payload$1
	    };
	}
	exports.deserializeTransactionEssence = deserializeTransactionEssence;
	/**
	 * Serialize the transaction essence to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeTransactionEssence(writeStream, object) {
	    writeStream.writeByte("transactionEssence.type", object.type);
	    input.serializeInputs(writeStream, object.inputs);
	    output.serializeOutputs(writeStream, object.outputs);
	    payload.serializePayload(writeStream, object.payload);
	}
	exports.serializeTransactionEssence = serializeTransactionEssence;

	});

	var signature = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.serializeEd25519Signature = exports.deserializeEd25519Signature = exports.serializeSignature = exports.deserializeSignature = exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH = void 0;


	exports.MIN_SIGNATURE_LENGTH = common.SMALL_TYPE_LENGTH;
	exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH + ed25519.Ed25519.SIGNATURE_SIZE + ed25519.Ed25519.PUBLIC_KEY_SIZE;
	/**
	 * Deserialize the signature from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeSignature(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_SIGNATURE_LENGTH)) {
	        throw new Error("Signature data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIGNATURE_LENGTH);
	    }
	    var type = readStream.readByte("signature.type", false);
	    var input;
	    if (type === 1) {
	        input = deserializeEd25519Signature(readStream);
	    }
	    else {
	        throw new Error("Unrecognized signature type " + type);
	    }
	    return input;
	}
	exports.deserializeSignature = deserializeSignature;
	/**
	 * Serialize the signature to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeSignature(writeStream, object) {
	    if (object.type === 1) {
	        serializeEd25519Signature(writeStream, object);
	    }
	    else {
	        throw new Error("Unrecognized signature type " + object.type);
	    }
	}
	exports.serializeSignature = serializeSignature;
	/**
	 * Deserialize the Ed25519 signature from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeEd25519Signature(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_ED25519_SIGNATURE_LENGTH)) {
	        throw new Error("Ed25519 signature data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ED25519_SIGNATURE_LENGTH);
	    }
	    var type = readStream.readByte("ed25519Signature.type");
	    if (type !== 1) {
	        throw new Error("Type mismatch in ed25519Signature " + type);
	    }
	    var publicKey = readStream.readFixedHex("ed25519Signature.publicKey", ed25519.Ed25519.PUBLIC_KEY_SIZE);
	    var signature = readStream.readFixedHex("ed25519Signature.signature", ed25519.Ed25519.SIGNATURE_SIZE);
	    return {
	        type: type,
	        publicKey: publicKey,
	        signature: signature
	    };
	}
	exports.deserializeEd25519Signature = deserializeEd25519Signature;
	/**
	 * Serialize the Ed25519 signature to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeEd25519Signature(writeStream, object) {
	    writeStream.writeByte("ed25519Signature.type", object.type);
	    writeStream.writeFixedHex("ed25519Signature.publicKey", ed25519.Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
	    writeStream.writeFixedHex("ed25519Signature.signature", ed25519.Ed25519.SIGNATURE_SIZE, object.signature);
	}
	exports.serializeEd25519Signature = serializeEd25519Signature;

	});

	var unlockBlock = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.serializeReferenceUnlockBlock = exports.deserializeReferenceUnlockBlock = exports.serializeSignatureUnlockBlock = exports.deserializeSignatureUnlockBlock = exports.serializeUnlockBlock = exports.deserializeUnlockBlock = exports.serializeUnlockBlocks = exports.deserializeUnlockBlocks = exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH = void 0;


	exports.MIN_UNLOCK_BLOCK_LENGTH = common.SMALL_TYPE_LENGTH;
	exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH + signature.MIN_SIGNATURE_LENGTH;
	exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH + common.UINT16_SIZE;
	/**
	 * Deserialize the unlock blocks from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeUnlockBlocks(readStream) {
	    var numUnlockBlocks = readStream.readUInt16("transactionEssence.numUnlockBlocks");
	    var unlockBlocks = [];
	    for (var i = 0; i < numUnlockBlocks; i++) {
	        unlockBlocks.push(deserializeUnlockBlock(readStream));
	    }
	    return unlockBlocks;
	}
	exports.deserializeUnlockBlocks = deserializeUnlockBlocks;
	/**
	 * Serialize the unlock blocks to binary.
	 * @param writeStream The stream to write the data to.
	 * @param objects The objects to serialize.
	 */
	function serializeUnlockBlocks(writeStream, objects) {
	    writeStream.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);
	    for (var i = 0; i < objects.length; i++) {
	        serializeUnlockBlock(writeStream, objects[i]);
	    }
	}
	exports.serializeUnlockBlocks = serializeUnlockBlocks;
	/**
	 * Deserialize the unlock block from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeUnlockBlock(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_UNLOCK_BLOCK_LENGTH)) {
	        throw new Error("Unlock Block data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_UNLOCK_BLOCK_LENGTH);
	    }
	    var type = readStream.readByte("unlockBlock.type", false);
	    var unlockBlock;
	    if (type === 0) {
	        unlockBlock = deserializeSignatureUnlockBlock(readStream);
	    }
	    else if (type === 1) {
	        unlockBlock = deserializeReferenceUnlockBlock(readStream);
	    }
	    else {
	        throw new Error("Unrecognized unlock block type " + type);
	    }
	    return unlockBlock;
	}
	exports.deserializeUnlockBlock = deserializeUnlockBlock;
	/**
	 * Serialize the unlock block to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeUnlockBlock(writeStream, object) {
	    if (object.type === 0) {
	        serializeSignatureUnlockBlock(writeStream, object);
	    }
	    else if (object.type === 1) {
	        serializeReferenceUnlockBlock(writeStream, object);
	    }
	    else {
	        throw new Error("Unrecognized unlock block type " + object.type);
	    }
	}
	exports.serializeUnlockBlock = serializeUnlockBlock;
	/**
	 * Deserialize the signature unlock block from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeSignatureUnlockBlock(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
	        throw new Error("Signature Unlock Block data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH);
	    }
	    var type = readStream.readByte("signatureUnlockBlock.type");
	    if (type !== 0) {
	        throw new Error("Type mismatch in signatureUnlockBlock " + type);
	    }
	    var signature$1 = signature.deserializeSignature(readStream);
	    return {
	        type: type,
	        signature: signature$1
	    };
	}
	exports.deserializeSignatureUnlockBlock = deserializeSignatureUnlockBlock;
	/**
	 * Serialize the signature unlock block to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeSignatureUnlockBlock(writeStream, object) {
	    writeStream.writeByte("signatureUnlockBlock.type", object.type);
	    signature.serializeSignature(writeStream, object.signature);
	}
	exports.serializeSignatureUnlockBlock = serializeSignatureUnlockBlock;
	/**
	 * Deserialize the reference unlock block from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeReferenceUnlockBlock(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
	        throw new Error("Reference Unlock Block data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH);
	    }
	    var type = readStream.readByte("referenceUnlockBlock.type");
	    if (type !== 1) {
	        throw new Error("Type mismatch in referenceUnlockBlock " + type);
	    }
	    var reference = readStream.readUInt16("referenceUnlockBlock.reference");
	    return {
	        type: type,
	        reference: reference
	    };
	}
	exports.deserializeReferenceUnlockBlock = deserializeReferenceUnlockBlock;
	/**
	 * Serialize the reference unlock block to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeReferenceUnlockBlock(writeStream, object) {
	    writeStream.writeByte("referenceUnlockBlock.type", object.type);
	    writeStream.writeUInt16("referenceUnlockBlock.reference", object.reference);
	}
	exports.serializeReferenceUnlockBlock = serializeReferenceUnlockBlock;

	});

	var payload = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.serializeIndexationPayload = exports.deserializeIndexationPayload = exports.serializeMilestonePayload = exports.deserializeMilestonePayload = exports.serializeTransactionPayload = exports.deserializeTransactionPayload = exports.serializePayload = exports.deserializePayload = exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH = void 0;



	exports.MIN_PAYLOAD_LENGTH = common.TYPE_LENGTH;
	exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + (2 * common.UINT64_SIZE) + 64 + common.BYTE_SIZE;
	exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + common.STRING_LENGTH + common.STRING_LENGTH;
	exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + common.UINT32_SIZE;
	/**
	 * Deserialize the payload from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializePayload(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_PAYLOAD_LENGTH)) {
	        throw new Error("Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_PAYLOAD_LENGTH);
	    }
	    var payloadLength = readStream.readUInt32("payload.length");
	    if (!readStream.hasRemaining(payloadLength)) {
	        throw new Error("Payload length " + payloadLength + " exceeds the remaining data " + readStream.unused());
	    }
	    var payload;
	    if (payloadLength > 0) {
	        var payloadType = readStream.readUInt32("payload.type", false);
	        if (payloadType === 0) {
	            payload = deserializeTransactionPayload(readStream);
	        }
	        else if (payloadType === 1) {
	            payload = deserializeMilestonePayload(readStream);
	        }
	        else if (payloadType === 2) {
	            payload = deserializeIndexationPayload(readStream);
	        }
	        else {
	            throw new Error("Unrecognized payload type " + payloadType);
	        }
	    }
	    return payload;
	}
	exports.deserializePayload = deserializePayload;
	/**
	 * Serialize the payload essence to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializePayload(writeStream, object) {
	    // Store the location for the payload length and write 0
	    // we will rewind and fill in once the size of the payload is known
	    var payloadLengthWriteIndex = writeStream.getWriteIndex();
	    writeStream.writeUInt32("payload.length", 0);
	    if (!object) ;
	    else if (object.type === 0) {
	        serializeTransactionPayload(writeStream, object);
	    }
	    else if (object.type === 1) {
	        serializeMilestonePayload(writeStream, object);
	    }
	    else if (object.type === 2) {
	        serializeIndexationPayload(writeStream, object);
	    }
	    else {
	        throw new Error("Unrecognized transaction type " + object.type);
	    }
	    var endOfPayloadWriteIndex = writeStream.getWriteIndex();
	    writeStream.setWriteIndex(payloadLengthWriteIndex);
	    writeStream.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - common.UINT32_SIZE);
	    writeStream.setWriteIndex(endOfPayloadWriteIndex);
	}
	exports.serializePayload = serializePayload;
	/**
	 * Deserialize the transaction payload from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeTransactionPayload(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_TRANSACTION_PAYLOAD_LENGTH)) {
	        throw new Error("Transaction Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_TRANSACTION_PAYLOAD_LENGTH);
	    }
	    var type = readStream.readUInt32("payloadTransaction.type");
	    if (type !== 0) {
	        throw new Error("Type mismatch in payloadTransaction " + type);
	    }
	    var essenceType = readStream.readByte("payloadTransaction.essenceType", false);
	    var essence;
	    var unlockBlocks;
	    if (essenceType === 0) {
	        essence = transaction.deserializeTransactionEssence(readStream);
	        unlockBlocks = unlockBlock.deserializeUnlockBlocks(readStream);
	    }
	    else {
	        throw new Error("Unrecognized transaction essence type " + type);
	    }
	    return {
	        type: type,
	        essence: essence,
	        unlockBlocks: unlockBlocks
	    };
	}
	exports.deserializeTransactionPayload = deserializeTransactionPayload;
	/**
	 * Serialize the transaction payload essence to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeTransactionPayload(writeStream, object) {
	    writeStream.writeUInt32("payloadMilestone.type", object.type);
	    if (object.type === 0) {
	        transaction.serializeTransactionEssence(writeStream, object.essence);
	        unlockBlock.serializeUnlockBlocks(writeStream, object.unlockBlocks);
	    }
	    else {
	        throw new Error("Unrecognized transaction type " + object.type);
	    }
	}
	exports.serializeTransactionPayload = serializeTransactionPayload;
	/**
	 * Deserialize the milestone payload from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeMilestonePayload(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_MILESTONE_PAYLOAD_LENGTH)) {
	        throw new Error("Milestone Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_MILESTONE_PAYLOAD_LENGTH);
	    }
	    var type = readStream.readUInt32("payloadMilestone.type");
	    if (type !== 1) {
	        throw new Error("Type mismatch in payloadMilestone " + type);
	    }
	    var index = readStream.readUInt64("payloadMilestone.index");
	    var timestamp = readStream.readUInt64("payloadMilestone.timestamp");
	    var inclusionMerkleProof = readStream.readFixedHex("payloadMilestone.inclusionMerkleProof", 64);
	    var signaturesCount = readStream.readByte("payloadMilestone.signaturesCount");
	    var signatures = [];
	    for (var i = 0; i < signaturesCount; i++) {
	        signatures.push(readStream.readFixedHex("payloadMilestone.signature", 64));
	    }
	    return {
	        type: type,
	        index: Number(index),
	        timestamp: Number(timestamp),
	        inclusionMerkleProof: inclusionMerkleProof,
	        signatures: signatures
	    };
	}
	exports.deserializeMilestonePayload = deserializeMilestonePayload;
	/**
	 * Serialize the milestone payload essence to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeMilestonePayload(writeStream, object) {
	    writeStream.writeUInt32("payloadMilestone.type", object.type);
	    writeStream.writeUInt64("payloadMilestone.index", BigInt(object.index));
	    writeStream.writeUInt64("payloadMilestone.timestamp", BigInt(object.timestamp));
	    writeStream.writeFixedHex("payloadMilestone.inclusionMerkleProof", 64, object.inclusionMerkleProof);
	    writeStream.writeByte("payloadMilestone.signaturesCount", object.signatures.length);
	    for (var i = 0; i < object.signatures.length; i++) {
	        writeStream.writeFixedHex("payloadMilestone.signature", 64, object.signatures[i]);
	    }
	}
	exports.serializeMilestonePayload = serializeMilestonePayload;
	/**
	 * Deserialize the indexation payload from binary.
	 * @param readStream The stream to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeIndexationPayload(readStream) {
	    if (!readStream.hasRemaining(exports.MIN_INDEXATION_PAYLOAD_LENGTH)) {
	        throw new Error("Indexation Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_INDEXATION_PAYLOAD_LENGTH);
	    }
	    var type = readStream.readUInt32("payloadIndexation.type");
	    if (type !== 2) {
	        throw new Error("Type mismatch in payloadIndexation " + type);
	    }
	    var index = readStream.readString("payloadIndexation.index");
	    var dataLength = readStream.readUInt32("payloadIndexation.dataLength");
	    var data = readStream.readFixedHex("payloadIndexation.data", dataLength);
	    return {
	        type: 2,
	        index: index,
	        data: data
	    };
	}
	exports.deserializeIndexationPayload = deserializeIndexationPayload;
	/**
	 * Serialize the indexation payload essence to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeIndexationPayload(writeStream, object) {
	    writeStream.writeUInt32("payloadIndexation.type", object.type);
	    writeStream.writeString("payloadIndexation.index", object.index);
	    writeStream.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
	    writeStream.writeFixedHex("payloadIndexation.data", object.data.length / 2, object.data);
	}
	exports.serializeIndexationPayload = serializeIndexationPayload;

	});

	var message = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.serializeMessage = exports.deserializeMessage = void 0;


	var MIN_MESSAGE_LENGTH = common.BYTE_SIZE +
	    (2 * common.MESSAGE_ID_LENGTH) +
	    payload.MIN_PAYLOAD_LENGTH +
	    common.UINT64_SIZE;
	var EMPTY_MESSAGE_ID_HEX = "0".repeat(common.MESSAGE_ID_LENGTH * 2);
	/**
	 * Deserialize the message from binary.
	 * @param readStream The message to deserialize.
	 * @returns The deserialized message.
	 */
	function deserializeMessage(readStream) {
	    if (!readStream.hasRemaining(MIN_MESSAGE_LENGTH)) {
	        throw new Error("Message data is " + readStream.length() + " in length which is less than the minimimum size required of " + MIN_MESSAGE_LENGTH);
	    }
	    var version = readStream.readByte("message.version");
	    if (version !== 1) {
	        throw new Error("Unsupported message version number: " + version);
	    }
	    var parent1MessageId = readStream.readFixedHex("message.parent1MessageId", common.MESSAGE_ID_LENGTH);
	    var parent2MessageId = readStream.readFixedHex("message.parent2MessageId", common.MESSAGE_ID_LENGTH);
	    var payload$1 = payload.deserializePayload(readStream);
	    var nonce = readStream.readUInt64("message.nonce");
	    var unused = readStream.unused();
	    if (unused !== 0) {
	        throw new Error("Message data length " + readStream.length() + " has unused data " + unused);
	    }
	    return {
	        version: version,
	        payload: payload$1,
	        parent1MessageId: parent1MessageId,
	        parent2MessageId: parent2MessageId,
	        nonce: Number(nonce)
	    };
	}
	exports.deserializeMessage = deserializeMessage;
	/**
	 * Serialize the message essence to binary.
	 * @param writeStream The stream to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeMessage(writeStream, object) {
	    var _a, _b;
	    writeStream.writeByte("message.version", object.version);
	    writeStream.writeFixedHex("message.parent1MessageId", common.MESSAGE_ID_LENGTH, (_a = object.parent1MessageId) !== null && _a !== void 0 ? _a : EMPTY_MESSAGE_ID_HEX);
	    writeStream.writeFixedHex("message.parent2MessageId", common.MESSAGE_ID_LENGTH, (_b = object.parent2MessageId) !== null && _b !== void 0 ? _b : EMPTY_MESSAGE_ID_HEX);
	    payload.serializePayload(writeStream, object.payload);
	    writeStream.writeUInt64("message.nonce", BigInt(object.nonce));
	}
	exports.serializeMessage = serializeMessage;

	});

	var singleNodeClient = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SingleNodeClient = void 0;

	/**
	 * Client for API communication.
	 */
	var SingleNodeClient = /** @class */ (function () {
	    /**
	     * Create a new instance of client.
	     * @param endpoint The endpoint.
	     */
	    function SingleNodeClient(endpoint) {
	        if (!/^https?:\/\/\w+(\.\w+)*(:\d+)?(\/.*)?$/.test(endpoint)) {
	            throw new Error("The endpoint is not in the correct format");
	        }
	        this._endpoint = endpoint.replace(/\/+$/, "");
	    }
	    /**
	     * Get the health of the node.
	     * @returns True if the node is healthy.
	     */
	    SingleNodeClient.prototype.health = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var status;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.fetchStatus("/health")];
	                    case 1:
	                        status = _a.sent();
	                        if (status === 200) {
	                            return [2 /*return*/, true];
	                        }
	                        else if (status === 503) {
	                            return [2 /*return*/, false];
	                        }
	                        throw new clientError.ClientError("Unexpected response code", "/health", status);
	                }
	            });
	        });
	    };
	    /**
	     * Get the info about the node.
	     * @returns The node information.
	     */
	    SingleNodeClient.prototype.info = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, this.fetchJson("get", "/api/v1/info")];
	            });
	        });
	    };
	    /**
	     * Get the tips from the node.
	     * @returns The tips.
	     */
	    SingleNodeClient.prototype.tips = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, this.fetchJson("get", "/api/v1/tips")];
	            });
	        });
	    };
	    /**
	     * Get the message data by id.
	     * @param messageId The message to get the data for.
	     * @returns The message data.
	     */
	    SingleNodeClient.prototype.message = function (messageId) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, this.fetchJson("get", "/api/v1/messages/" + messageId)];
	            });
	        });
	    };
	    /**
	     * Get the message metadata by id.
	     * @param messageId The message to get the metadata for.
	     * @returns The message metadata.
	     */
	    SingleNodeClient.prototype.messageMetadata = function (messageId) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, this.fetchJson("get", "/api/v1/messages/" + messageId + "/metadata")];
	            });
	        });
	    };
	    /**
	     * Get the message raw data by id.
	     * @param messageId The message to get the data for.
	     * @returns The message raw data.
	     */
	    SingleNodeClient.prototype.messageRaw = function (messageId) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, this.fetchBinary("get", "/api/v1/messages/" + messageId + "/raw")];
	            });
	        });
	    };
	    /**
	     * Submit message.
	     * @param message The message to submit.
	     * @returns The messageId.
	     */
	    SingleNodeClient.prototype.messageSubmit = function (message) {
	        return __awaiter(this, void 0, void 0, function () {
	            var response;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.fetchJson("post", "/api/v1/messages", message)];
	                    case 1:
	                        response = _a.sent();
	                        return [2 /*return*/, response.messageId];
	                }
	            });
	        });
	    };
	    /**
	     * Submit message in raw format.
	     * @param message The message to submit.
	     * @returns The messageId.
	     */
	    SingleNodeClient.prototype.messageSubmitRaw = function (message) {
	        return __awaiter(this, void 0, void 0, function () {
	            var response;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.fetchBinary("post", "/api/v1/messages", message)];
	                    case 1:
	                        response = _a.sent();
	                        return [2 /*return*/, response.messageId];
	                }
	            });
	        });
	    };
	    /**
	     * Find messages by index.
	     * @param indexationKey The index value.
	     * @returns The messageId.
	     */
	    SingleNodeClient.prototype.messagesFind = function (indexationKey) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, this.fetchJson("get", "/api/v1/messages?index=" + encodeURIComponent(indexationKey))];
	            });
	        });
	    };
	    /**
	     * Get the children of a message.
	     * @param messageId The id of the message to get the children for.
	     * @returns The messages children.
	     */
	    SingleNodeClient.prototype.messageChildren = function (messageId) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, this.fetchJson("get", "/api/v1/messages/" + messageId + "/children")];
	            });
	        });
	    };
	    /**
	     * Find an output by its identifier.
	     * @param outputId The id of the output to get.
	     * @returns The output details.
	     */
	    SingleNodeClient.prototype.output = function (outputId) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, this.fetchJson("get", "/api/v1/outputs/" + outputId)];
	            });
	        });
	    };
	    /**
	     * Get the address details.
	     * @param address The address to get the details for.
	     * @returns The address details.
	     */
	    SingleNodeClient.prototype.address = function (address) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, this.fetchJson("get", "/api/v1/addresses/" + address)];
	            });
	        });
	    };
	    /**
	     * Get the address outputs.
	     * @param address The address to get the outputs for.
	     * @returns The address outputs.
	     */
	    SingleNodeClient.prototype.addressOutputs = function (address) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, this.fetchJson("get", "/api/v1/addresses/" + address + "/outputs")];
	            });
	        });
	    };
	    /**
	     * Get the requested milestone.
	     * @param index The index of the milestone to get.
	     * @returns The milestone details.
	     */
	    SingleNodeClient.prototype.milestone = function (index) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, this.fetchJson("get", "/api/v1/milestones/" + index)];
	            });
	        });
	    };
	    /**
	     * Perform a request and just return the status.
	     * @param route The route of the request.
	     * @returns The response.
	     * @internal
	     */
	    SingleNodeClient.prototype.fetchStatus = function (route) {
	        return __awaiter(this, void 0, void 0, function () {
	            var response;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + route, {
	                            method: "get"
	                        })];
	                    case 1:
	                        response = _a.sent();
	                        return [2 /*return*/, response.status];
	                }
	            });
	        });
	    };
	    /**
	     * Perform a request in json format.
	     * @param method The http method.
	     * @param route The route of the request.
	     * @param requestData Request to send to the endpoint.
	     * @returns The response.
	     * @internal
	     */
	    SingleNodeClient.prototype.fetchJson = function (method, route, requestData) {
	        var _a, _b, _c;
	        return __awaiter(this, void 0, void 0, function () {
	            var response, responseData;
	            return __generator(this, function (_d) {
	                switch (_d.label) {
	                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + route, {
	                            method: method,
	                            headers: {
	                                "Content-Type": "application/json"
	                            },
	                            body: requestData ? JSON.stringify(requestData) : undefined
	                        })];
	                    case 1:
	                        response = _d.sent();
	                        return [4 /*yield*/, response.json()];
	                    case 2:
	                        responseData = _d.sent();
	                        if (response.ok && !responseData.error) {
	                            return [2 /*return*/, responseData.data];
	                        }
	                        throw new clientError.ClientError((_b = (_a = responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData.error) === null || _c === void 0 ? void 0 : _c.code);
	                }
	            });
	        });
	    };
	    /**
	     * Perform a request for binary data.
	     * @param method The http method.
	     * @param route The route of the request.
	     * @param requestData Request to send to the endpoint.
	     * @returns The response.
	     * @internal
	     */
	    SingleNodeClient.prototype.fetchBinary = function (method, route, requestData) {
	        var _a, _b, _c;
	        return __awaiter(this, void 0, void 0, function () {
	            var response, responseData, _d;
	            return __generator(this, function (_e) {
	                switch (_e.label) {
	                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + route, {
	                            method: method,
	                            headers: {
	                                "Content-Type": "application/octet-stream"
	                            },
	                            body: requestData
	                        })];
	                    case 1:
	                        response = _e.sent();
	                        if (!response.ok) return [3 /*break*/, 5];
	                        if (!(method === "get")) return [3 /*break*/, 3];
	                        _d = Uint8Array.bind;
	                        return [4 /*yield*/, response.arrayBuffer()];
	                    case 2: return [2 /*return*/, new (_d.apply(Uint8Array, [void 0, _e.sent()]))()];
	                    case 3: return [4 /*yield*/, response.json()];
	                    case 4:
	                        responseData = _e.sent();
	                        if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
	                            return [2 /*return*/, responseData === null || responseData === void 0 ? void 0 : responseData.data];
	                        }
	                        _e.label = 5;
	                    case 5:
	                        if (!!responseData) return [3 /*break*/, 7];
	                        return [4 /*yield*/, response.json()];
	                    case 6:
	                        responseData = _e.sent();
	                        _e.label = 7;
	                    case 7: throw new clientError.ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
	                }
	            });
	        });
	    };
	    return SingleNodeClient;
	}());
	exports.SingleNodeClient = SingleNodeClient;

	});

	var bip32Path = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Bip32Path = void 0;
	/**
	 * Class to help with bip32 paths.
	 */
	var Bip32Path = /** @class */ (function () {
	    /**
	     * Create a new instance of Bip32Path.
	     * @param initialPath Initial path to create.
	     */
	    function Bip32Path(initialPath) {
	        if (initialPath) {
	            this._path = initialPath.split("/");
	            if (this._path[0] === "m") {
	                this._path.shift();
	            }
	        }
	        else {
	            this._path = [];
	        }
	    }
	    /**
	     * Converts the path to a string.
	     * @returns The path as a string.
	     */
	    Bip32Path.prototype.toString = function () {
	        return this._path.length > 0 ? "m/" + this._path.join("/") : "m";
	    };
	    /**
	     * Push a new index on to the path.
	     * @param index The index to add to the path.
	     */
	    Bip32Path.prototype.push = function (index) {
	        this._path.push("" + index);
	    };
	    /**
	     * Push a new hardened index on to the path.
	     * @param index The index to add to the path.
	     */
	    Bip32Path.prototype.pushHardened = function (index) {
	        this._path.push(index + "'");
	    };
	    /**
	     * Pop an index from the path.
	     */
	    Bip32Path.prototype.pop = function () {
	        this._path.pop();
	    };
	    /**
	     * Get the segments.
	     * @returns The segments as numbers.
	     */
	    Bip32Path.prototype.numberSegments = function () {
	        return this._path.map(function (p) { return Number.parseInt(p, 10); });
	    };
	    return Bip32Path;
	}());
	exports.Bip32Path = Bip32Path;

	});

	var converter = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Converter = void 0;
	/* eslint-disable no-bitwise */
	/**
	 * Convert arrays to and from different formats.
	 */
	var Converter = /** @class */ (function () {
	    function Converter() {
	    }
	    /**
	     * Encode a raw array to text string.
	     * @param array The bytes to encode.
	     * @param startIndex The index to start in the bytes.
	     * @param length The length of bytes to read.
	     * @returns The array formated as hex.
	     */
	    Converter.bytesToAscii = function (array, startIndex, length) {
	        var ascii = "";
	        var len = length !== null && length !== void 0 ? length : array.length;
	        var start = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
	        for (var i = 0; i < len; i++) {
	            ascii += String.fromCharCode(array[start + i]);
	        }
	        return ascii;
	    };
	    /**
	     * Decode a text string to raw array.
	     * @param ascii The text to decode.
	     * @returns The array.
	     */
	    Converter.asciiToBytes = function (ascii) {
	        var sizeof = ascii.length;
	        var array = new Uint8Array(sizeof);
	        for (var i = 0; i < ascii.length; i++) {
	            array[i] = ascii.charCodeAt(i);
	        }
	        return array;
	    };
	    /**
	     * Encode a raw array to hex string.
	     * @param array The bytes to encode.
	     * @param startIndex The index to start in the bytes.
	     * @param length The length of bytes to read.
	     * @param reverse Reverse the combine direction.
	     * @returns The array formated as hex.
	     */
	    Converter.bytesToHex = function (array, startIndex, length, reverse) {
	        var hex = "";
	        this.buildHexLookups();
	        if (Converter.ENCODE_LOOKUP) {
	            var len = length !== null && length !== void 0 ? length : array.length;
	            var start = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
	            if (reverse) {
	                for (var i = 0; i < len; i++) {
	                    hex = Converter.ENCODE_LOOKUP[array[start + i]] + hex;
	                }
	            }
	            else {
	                for (var i = 0; i < len; i++) {
	                    hex += Converter.ENCODE_LOOKUP[array[start + i]];
	                }
	            }
	        }
	        return hex;
	    };
	    /**
	     * Decode a hex string to raw array.
	     * @param hex The hex to decode.
	     * @param reverse Store the characters in reverse.
	     * @returns The array.
	     */
	    Converter.hexToBytes = function (hex, reverse) {
	        var sizeof = hex.length >> 1;
	        var length = sizeof << 1;
	        var array = new Uint8Array(sizeof);
	        this.buildHexLookups();
	        if (Converter.DECODE_LOOKUP) {
	            var i = 0;
	            var n = 0;
	            while (i < length) {
	                array[n++] =
	                    (Converter.DECODE_LOOKUP[hex.charCodeAt(i++)] << 4) |
	                        Converter.DECODE_LOOKUP[hex.charCodeAt(i++)];
	            }
	            if (reverse) {
	                array.reverse();
	            }
	        }
	        return array;
	    };
	    /**
	     * Convert the ascii text to hex.
	     * @param ascii The ascii to convert.
	     * @returns The hex version of the bytes.
	     */
	    Converter.asciiToHex = function (ascii) {
	        return Converter.bytesToHex(Converter.asciiToBytes(ascii));
	    };
	    /**
	     * Convert the hex text to ascii.
	     * @param hex The hex to convert.
	     * @returns The ascii version of the bytes.
	     */
	    Converter.hexToAscii = function (hex) {
	        return Converter.bytesToAscii(Converter.hexToBytes(hex));
	    };
	    /**
	     * Build the static lookup tables.
	     * @internal
	     */
	    Converter.buildHexLookups = function () {
	        if (!Converter.ENCODE_LOOKUP || !Converter.DECODE_LOOKUP) {
	            var alphabet = "0123456789abcdef";
	            Converter.ENCODE_LOOKUP = [];
	            Converter.DECODE_LOOKUP = [];
	            for (var i = 0; i < 256; i++) {
	                Converter.ENCODE_LOOKUP[i] = alphabet[(i >> 4) & 0xF] + alphabet[i & 0xF];
	                if (i < 16) {
	                    if (i < 10) {
	                        Converter.DECODE_LOOKUP[0x30 + i] = i;
	                    }
	                    else {
	                        Converter.DECODE_LOOKUP[0x61 - 10 + i] = i;
	                    }
	                }
	            }
	        }
	    };
	    return Converter;
	}());
	exports.Converter = Converter;

	});

	var sha512 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Sha512 = void 0;
	/* eslint-disable no-bitwise */
	/**
	 * Class to help with Sha512 scheme.
	 * TypeScript conversion from https://github.com/emn178/js-sha512
	 */
	var Sha512 = /** @class */ (function () {
	    /**
	     * Create a new instance of Sha512.
	     * @param bits The number of bits.
	     */
	    function Sha512(bits) {
	        if (bits === void 0) { bits = 512; }
	        /**
	         * Blocks.
	         * @internal
	         */
	        this._blocks = [];
	        this._blocks = [
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	        ];
	        if (bits === 384) {
	            this._h0h = 0xCBBB9D5D;
	            this._h0l = 0xC1059ED8;
	            this._h1h = 0x629A292A;
	            this._h1l = 0x367CD507;
	            this._h2h = 0x9159015A;
	            this._h2l = 0x3070DD17;
	            this._h3h = 0x152FECD8;
	            this._h3l = 0xF70E5939;
	            this._h4h = 0x67332667;
	            this._h4l = 0xFFC00B31;
	            this._h5h = 0x8EB44A87;
	            this._h5l = 0x68581511;
	            this._h6h = 0xDB0C2E0D;
	            this._h6l = 0x64F98FA7;
	            this._h7h = 0x47B5481D;
	            this._h7l = 0xBEFA4FA4;
	        }
	        else if (bits === 256) {
	            this._h0h = 0x22312194;
	            this._h0l = 0xFC2BF72C;
	            this._h1h = 0x9F555FA3;
	            this._h1l = 0xC84C64C2;
	            this._h2h = 0x2393B86B;
	            this._h2l = 0x6F53B151;
	            this._h3h = 0x96387719;
	            this._h3l = 0x5940EABD;
	            this._h4h = 0x96283EE2;
	            this._h4l = 0xA88EFFE3;
	            this._h5h = 0xBE5E1E25;
	            this._h5l = 0x53863992;
	            this._h6h = 0x2B0199FC;
	            this._h6l = 0x2C85B8AA;
	            this._h7h = 0x0EB72DDC;
	            this._h7l = 0x81C52CA2;
	        }
	        else if (bits === 224) {
	            this._h0h = 0x8C3D37C8;
	            this._h0l = 0x19544DA2;
	            this._h1h = 0x73E19966;
	            this._h1l = 0x89DCD4D6;
	            this._h2h = 0x1DFAB7AE;
	            this._h2l = 0x32FF9C82;
	            this._h3h = 0x679DD514;
	            this._h3l = 0x582F9FCF;
	            this._h4h = 0x0F6D2B69;
	            this._h4l = 0x7BD44DA8;
	            this._h5h = 0x77E36F73;
	            this._h5l = 0x04C48942;
	            this._h6h = 0x3F9D85A8;
	            this._h6l = 0x6A1D36C8;
	            this._h7h = 0x1112E6AD;
	            this._h7l = 0x91D692A1;
	        }
	        else { // 512
	            this._h0h = 0x6A09E667;
	            this._h0l = 0xF3BCC908;
	            this._h1h = 0xBB67AE85;
	            this._h1l = 0x84CAA73B;
	            this._h2h = 0x3C6EF372;
	            this._h2l = 0xFE94F82B;
	            this._h3h = 0xA54FF53A;
	            this._h3l = 0x5F1D36F1;
	            this._h4h = 0x510E527F;
	            this._h4l = 0xADE682D1;
	            this._h5h = 0x9B05688C;
	            this._h5l = 0x2B3E6C1F;
	            this._h6h = 0x1F83D9AB;
	            this._h6l = 0xFB41BD6B;
	            this._h7h = 0x5BE0CD19;
	            this._h7l = 0x137E2179;
	        }
	        this._bits = bits;
	        this._block = 0;
	        this._start = 0;
	        this._bytes = 0;
	        this._hBytes = 0;
	        this._lastByteIndex = 0;
	        this._finalized = false;
	        this._hashed = false;
	    }
	    /**
	     * Update the hash with the data.
	     * @param message The data to update the hash with.
	     * @returns The instance for chaining.
	     */
	    Sha512.prototype.update = function (message) {
	        if (this._finalized) {
	            throw new Error("The hash has already been finalized.");
	        }
	        var index = 0;
	        var i;
	        var length = message.length;
	        var blocks = this._blocks;
	        while (index < length) {
	            if (this._hashed) {
	                this._hashed = false;
	                blocks[0] = this._block;
	                blocks[1] = 0;
	                blocks[2] = 0;
	                blocks[3] = 0;
	                blocks[4] = 0;
	                blocks[5] = 0;
	                blocks[6] = 0;
	                blocks[7] = 0;
	                blocks[8] = 0;
	                blocks[9] = 0;
	                blocks[10] = 0;
	                blocks[11] = 0;
	                blocks[12] = 0;
	                blocks[13] = 0;
	                blocks[14] = 0;
	                blocks[15] = 0;
	                blocks[16] = 0;
	                blocks[17] = 0;
	                blocks[18] = 0;
	                blocks[19] = 0;
	                blocks[20] = 0;
	                blocks[21] = 0;
	                blocks[22] = 0;
	                blocks[23] = 0;
	                blocks[24] = 0;
	                blocks[25] = 0;
	                blocks[26] = 0;
	                blocks[27] = 0;
	                blocks[28] = 0;
	                blocks[29] = 0;
	                blocks[30] = 0;
	                blocks[31] = 0;
	                blocks[32] = 0;
	            }
	            for (i = this._start; index < length && i < 128; ++index) {
	                blocks[i >> 2] |= message[index] << Sha512.SHIFT[i++ & 3];
	            }
	            this._lastByteIndex = i;
	            this._bytes += i - this._start;
	            if (i >= 128) {
	                this._block = blocks[32];
	                this._start = i - 128;
	                this.hash();
	                this._hashed = true;
	            }
	            else {
	                this._start = i;
	            }
	        }
	        if (this._bytes > 4294967295) {
	            this._hBytes += Math.trunc(this._bytes / 4294967296);
	            this._bytes %= 4294967296;
	        }
	        return this;
	    };
	    /**
	     * Get the digest.
	     * @returns The digest.
	     */
	    Sha512.prototype.digest = function () {
	        this.finalize();
	        var h0h = this._h0h;
	        var h0l = this._h0l;
	        var h1h = this._h1h;
	        var h1l = this._h1l;
	        var h2h = this._h2h;
	        var h2l = this._h2l;
	        var h3h = this._h3h;
	        var h3l = this._h3l;
	        var h4h = this._h4h;
	        var h4l = this._h4l;
	        var h5h = this._h5h;
	        var h5l = this._h5l;
	        var h6h = this._h6h;
	        var h6l = this._h6l;
	        var h7h = this._h7h;
	        var h7l = this._h7l;
	        var bits = this._bits;
	        var arr = [
	            (h0h >> 24) & 0xFF, (h0h >> 16) & 0xFF, (h0h >> 8) & 0xFF, h0h & 0xFF,
	            (h0l >> 24) & 0xFF, (h0l >> 16) & 0xFF, (h0l >> 8) & 0xFF, h0l & 0xFF,
	            (h1h >> 24) & 0xFF, (h1h >> 16) & 0xFF, (h1h >> 8) & 0xFF, h1h & 0xFF,
	            (h1l >> 24) & 0xFF, (h1l >> 16) & 0xFF, (h1l >> 8) & 0xFF, h1l & 0xFF,
	            (h2h >> 24) & 0xFF, (h2h >> 16) & 0xFF, (h2h >> 8) & 0xFF, h2h & 0xFF,
	            (h2l >> 24) & 0xFF, (h2l >> 16) & 0xFF, (h2l >> 8) & 0xFF, h2l & 0xFF,
	            (h3h >> 24) & 0xFF, (h3h >> 16) & 0xFF, (h3h >> 8) & 0xFF, h3h & 0xFF
	        ];
	        if (bits >= 256) {
	            arr.push((h3l >> 24) & 0xFF, (h3l >> 16) & 0xFF, (h3l >> 8) & 0xFF, h3l & 0xFF);
	        }
	        if (bits >= 384) {
	            arr.push((h4h >> 24) & 0xFF, (h4h >> 16) & 0xFF, (h4h >> 8) & 0xFF, h4h & 0xFF, (h4l >> 24) & 0xFF, (h4l >> 16) & 0xFF, (h4l >> 8) & 0xFF, h4l & 0xFF, (h5h >> 24) & 0xFF, (h5h >> 16) & 0xFF, (h5h >> 8) & 0xFF, h5h & 0xFF, (h5l >> 24) & 0xFF, (h5l >> 16) & 0xFF, (h5l >> 8) & 0xFF, h5l & 0xFF);
	        }
	        if (bits === 512) {
	            arr.push((h6h >> 24) & 0xFF, (h6h >> 16) & 0xFF, (h6h >> 8) & 0xFF, h6h & 0xFF, (h6l >> 24) & 0xFF, (h6l >> 16) & 0xFF, (h6l >> 8) & 0xFF, h6l & 0xFF, (h7h >> 24) & 0xFF, (h7h >> 16) & 0xFF, (h7h >> 8) & 0xFF, h7h & 0xFF, (h7l >> 24) & 0xFF, (h7l >> 16) & 0xFF, (h7l >> 8) & 0xFF, h7l & 0xFF);
	        }
	        return Uint8Array.from(arr);
	    };
	    /**
	     * Finalize the hash.
	     * @internal
	     */
	    Sha512.prototype.finalize = function () {
	        if (this._finalized) {
	            return;
	        }
	        this._finalized = true;
	        var blocks = this._blocks;
	        var i = this._lastByteIndex;
	        blocks[32] = this._block;
	        blocks[i >> 2] |= Sha512.EXTRA[i & 3];
	        this._block = blocks[32];
	        if (i >= 112) {
	            if (!this._hashed) {
	                this.hash();
	            }
	            blocks[0] = this._block;
	            blocks[1] = 0;
	            blocks[2] = 0;
	            blocks[3] = 0;
	            blocks[4] = 0;
	            blocks[5] = 0;
	            blocks[6] = 0;
	            blocks[7] = 0;
	            blocks[8] = 0;
	            blocks[9] = 0;
	            blocks[10] = 0;
	            blocks[11] = 0;
	            blocks[12] = 0;
	            blocks[13] = 0;
	            blocks[14] = 0;
	            blocks[15] = 0;
	            blocks[16] = 0;
	            blocks[17] = 0;
	            blocks[18] = 0;
	            blocks[19] = 0;
	            blocks[20] = 0;
	            blocks[21] = 0;
	            blocks[22] = 0;
	            blocks[23] = 0;
	            blocks[24] = 0;
	            blocks[25] = 0;
	            blocks[26] = 0;
	            blocks[27] = 0;
	            blocks[28] = 0;
	            blocks[29] = 0;
	            blocks[30] = 0;
	            blocks[31] = 0;
	            blocks[32] = 0;
	        }
	        blocks[30] = (this._hBytes << 3) | (this._bytes >>> 29);
	        blocks[31] = this._bytes << 3;
	        this.hash();
	    };
	    /**
	     * Perform the hash.
	     * @internal
	     */
	    Sha512.prototype.hash = function () {
	        var h0h = this._h0h;
	        var h0l = this._h0l;
	        var h1h = this._h1h;
	        var h1l = this._h1l;
	        var h2h = this._h2h;
	        var h2l = this._h2l;
	        var h3h = this._h3h;
	        var h3l = this._h3l;
	        var h4h = this._h4h;
	        var h4l = this._h4l;
	        var h5h = this._h5h;
	        var h5l = this._h5l;
	        var h6h = this._h6h;
	        var h6l = this._h6l;
	        var h7h = this._h7h;
	        var h7l = this._h7l;
	        var blocks = this._blocks;
	        var j;
	        var s0h;
	        var s0l;
	        var s1h;
	        var s1l;
	        var c1;
	        var c2;
	        var c3;
	        var c4;
	        var abh;
	        var abl;
	        var dah;
	        var dal;
	        var cdh;
	        var cdl;
	        var bch;
	        var bcl;
	        var majh;
	        var majl;
	        var t1h;
	        var t1l;
	        var t2h;
	        var t2l;
	        var chh;
	        var chl;
	        for (j = 32; j < 160; j += 2) {
	            t1h = blocks[j - 30];
	            t1l = blocks[j - 29];
	            s0h = ((t1h >>> 1) | (t1l << 31)) ^ ((t1h >>> 8) | (t1l << 24)) ^ (t1h >>> 7);
	            s0l = ((t1l >>> 1) | (t1h << 31)) ^ ((t1l >>> 8) | (t1h << 24)) ^ ((t1l >>> 7) | (t1h << 25));
	            t1h = blocks[j - 4];
	            t1l = blocks[j - 3];
	            s1h = ((t1h >>> 19) | (t1l << 13)) ^ ((t1l >>> 29) | (t1h << 3)) ^ (t1h >>> 6);
	            s1l = ((t1l >>> 19) | (t1h << 13)) ^ ((t1h >>> 29) | (t1l << 3)) ^ ((t1l >>> 6) | (t1h << 26));
	            t1h = blocks[j - 32];
	            t1l = blocks[j - 31];
	            t2h = blocks[j - 14];
	            t2l = blocks[j - 13];
	            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (s0l & 0xFFFF) + (s1l & 0xFFFF);
	            c2 = (t2l >>> 16) + (t1l >>> 16) + (s0l >>> 16) + (s1l >>> 16) + (c1 >>> 16);
	            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (s0h & 0xFFFF) + (s1h & 0xFFFF) + (c2 >>> 16);
	            c4 = (t2h >>> 16) + (t1h >>> 16) + (s0h >>> 16) + (s1h >>> 16) + (c3 >>> 16);
	            blocks[j] = (c4 << 16) | (c3 & 0xFFFF);
	            blocks[j + 1] = (c2 << 16) | (c1 & 0xFFFF);
	        }
	        var ah = h0h;
	        var al = h0l;
	        var bh = h1h;
	        var bl = h1l;
	        var ch = h2h;
	        var cl = h2l;
	        var dh = h3h;
	        var dl = h3l;
	        var eh = h4h;
	        var el = h4l;
	        var fh = h5h;
	        var fl = h5l;
	        var gh = h6h;
	        var gl = h6l;
	        var hh = h7h;
	        var hl = h7l;
	        bch = bh & ch;
	        bcl = bl & cl;
	        for (j = 0; j < 160; j += 8) {
	            s0h = ((ah >>> 28) | (al << 4)) ^ ((al >>> 2) | (ah << 30)) ^ ((al >>> 7) | (ah << 25));
	            s0l = ((al >>> 28) | (ah << 4)) ^ ((ah >>> 2) | (al << 30)) ^ ((ah >>> 7) | (al << 25));
	            s1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((el >>> 9) | (eh << 23));
	            s1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((eh >>> 9) | (el << 23));
	            abh = ah & bh;
	            abl = al & bl;
	            majh = abh ^ (ah & ch) ^ bch;
	            majl = abl ^ (al & cl) ^ bcl;
	            chh = (eh & fh) ^ (~eh & gh);
	            chl = (el & fl) ^ (~el & gl);
	            t1h = blocks[j];
	            t1l = blocks[j + 1];
	            t2h = Sha512.K[j];
	            t2l = Sha512.K[j + 1];
	            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (hl & 0xFFFF);
	            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (hl >>> 16) + (c1 >>> 16);
	            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (hh & 0xFFFF) + (c2 >>> 16);
	            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (hh >>> 16) + (c3 >>> 16);
	            t1h = (c4 << 16) | (c3 & 0xFFFF);
	            t1l = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
	            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
	            c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
	            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
	            t2h = (c4 << 16) | (c3 & 0xFFFF);
	            t2l = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (dl & 0xFFFF) + (t1l & 0xFFFF);
	            c2 = (dl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
	            c3 = (dh & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
	            c4 = (dh >>> 16) + (t1h >>> 16) + (c3 >>> 16);
	            hh = (c4 << 16) | (c3 & 0xFFFF);
	            hl = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
	            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
	            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
	            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
	            dh = (c4 << 16) | (c3 & 0xFFFF);
	            dl = (c2 << 16) | (c1 & 0xFFFF);
	            s0h = ((dh >>> 28) | (dl << 4)) ^ ((dl >>> 2) | (dh << 30)) ^ ((dl >>> 7) | (dh << 25));
	            s0l = ((dl >>> 28) | (dh << 4)) ^ ((dh >>> 2) | (dl << 30)) ^ ((dh >>> 7) | (dl << 25));
	            s1h = ((hh >>> 14) | (hl << 18)) ^ ((hh >>> 18) | (hl << 14)) ^ ((hl >>> 9) | (hh << 23));
	            s1l = ((hl >>> 14) | (hh << 18)) ^ ((hl >>> 18) | (hh << 14)) ^ ((hh >>> 9) | (hl << 23));
	            dah = dh & ah;
	            dal = dl & al;
	            majh = dah ^ (dh & bh) ^ abh;
	            majl = dal ^ (dl & bl) ^ abl;
	            chh = (hh & eh) ^ (~hh & fh);
	            chl = (hl & el) ^ (~hl & fl);
	            t1h = blocks[j + 2];
	            t1l = blocks[j + 3];
	            t2h = Sha512.K[j + 2];
	            t2l = Sha512.K[j + 3];
	            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (gl & 0xFFFF);
	            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (gl >>> 16) + (c1 >>> 16);
	            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (gh & 0xFFFF) + (c2 >>> 16);
	            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (gh >>> 16) + (c3 >>> 16);
	            t1h = (c4 << 16) | (c3 & 0xFFFF);
	            t1l = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
	            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
	            c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
	            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
	            t2h = (c4 << 16) | (c3 & 0xFFFF);
	            t2l = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (cl & 0xFFFF) + (t1l & 0xFFFF);
	            c2 = (cl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
	            c3 = (ch & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
	            c4 = (ch >>> 16) + (t1h >>> 16) + (c3 >>> 16);
	            gh = (c4 << 16) | (c3 & 0xFFFF);
	            gl = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
	            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
	            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
	            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
	            ch = (c4 << 16) | (c3 & 0xFFFF);
	            cl = (c2 << 16) | (c1 & 0xFFFF);
	            s0h = ((ch >>> 28) | (cl << 4)) ^ ((cl >>> 2) | (ch << 30)) ^ ((cl >>> 7) | (ch << 25));
	            s0l = ((cl >>> 28) | (ch << 4)) ^ ((ch >>> 2) | (cl << 30)) ^ ((ch >>> 7) | (cl << 25));
	            s1h = ((gh >>> 14) | (gl << 18)) ^ ((gh >>> 18) | (gl << 14)) ^ ((gl >>> 9) | (gh << 23));
	            s1l = ((gl >>> 14) | (gh << 18)) ^ ((gl >>> 18) | (gh << 14)) ^ ((gh >>> 9) | (gl << 23));
	            cdh = ch & dh;
	            cdl = cl & dl;
	            majh = cdh ^ (ch & ah) ^ dah;
	            majl = cdl ^ (cl & al) ^ dal;
	            chh = (gh & hh) ^ (~gh & eh);
	            chl = (gl & hl) ^ (~gl & el);
	            t1h = blocks[j + 4];
	            t1l = blocks[j + 5];
	            t2h = Sha512.K[j + 4];
	            t2l = Sha512.K[j + 5];
	            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (fl & 0xFFFF);
	            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (fl >>> 16) + (c1 >>> 16);
	            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (fh & 0xFFFF) + (c2 >>> 16);
	            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (fh >>> 16) + (c3 >>> 16);
	            t1h = (c4 << 16) | (c3 & 0xFFFF);
	            t1l = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
	            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
	            c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
	            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
	            t2h = (c4 << 16) | (c3 & 0xFFFF);
	            t2l = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (bl & 0xFFFF) + (t1l & 0xFFFF);
	            c2 = (bl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
	            c3 = (bh & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
	            c4 = (bh >>> 16) + (t1h >>> 16) + (c3 >>> 16);
	            fh = (c4 << 16) | (c3 & 0xFFFF);
	            fl = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
	            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
	            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
	            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
	            bh = (c4 << 16) | (c3 & 0xFFFF);
	            bl = (c2 << 16) | (c1 & 0xFFFF);
	            s0h = ((bh >>> 28) | (bl << 4)) ^ ((bl >>> 2) | (bh << 30)) ^ ((bl >>> 7) | (bh << 25));
	            s0l = ((bl >>> 28) | (bh << 4)) ^ ((bh >>> 2) | (bl << 30)) ^ ((bh >>> 7) | (bl << 25));
	            s1h = ((fh >>> 14) | (fl << 18)) ^ ((fh >>> 18) | (fl << 14)) ^ ((fl >>> 9) | (fh << 23));
	            s1l = ((fl >>> 14) | (fh << 18)) ^ ((fl >>> 18) | (fh << 14)) ^ ((fh >>> 9) | (fl << 23));
	            bch = bh & ch;
	            bcl = bl & cl;
	            majh = bch ^ (bh & dh) ^ cdh;
	            majl = bcl ^ (bl & dl) ^ cdl;
	            chh = (fh & gh) ^ (~fh & hh);
	            chl = (fl & gl) ^ (~fl & hl);
	            t1h = blocks[j + 6];
	            t1l = blocks[j + 7];
	            t2h = Sha512.K[j + 6];
	            t2l = Sha512.K[j + 7];
	            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (el & 0xFFFF);
	            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (el >>> 16) + (c1 >>> 16);
	            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (eh & 0xFFFF) + (c2 >>> 16);
	            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (eh >>> 16) + (c3 >>> 16);
	            t1h = (c4 << 16) | (c3 & 0xFFFF);
	            t1l = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
	            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
	            c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
	            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
	            t2h = (c4 << 16) | (c3 & 0xFFFF);
	            t2l = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (al & 0xFFFF) + (t1l & 0xFFFF);
	            c2 = (al >>> 16) + (t1l >>> 16) + (c1 >>> 16);
	            c3 = (ah & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
	            c4 = (ah >>> 16) + (t1h >>> 16) + (c3 >>> 16);
	            eh = (c4 << 16) | (c3 & 0xFFFF);
	            el = (c2 << 16) | (c1 & 0xFFFF);
	            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
	            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
	            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
	            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
	            ah = (c4 << 16) | (c3 & 0xFFFF);
	            al = (c2 << 16) | (c1 & 0xFFFF);
	        }
	        c1 = (h0l & 0xFFFF) + (al & 0xFFFF);
	        c2 = (h0l >>> 16) + (al >>> 16) + (c1 >>> 16);
	        c3 = (h0h & 0xFFFF) + (ah & 0xFFFF) + (c2 >>> 16);
	        c4 = (h0h >>> 16) + (ah >>> 16) + (c3 >>> 16);
	        this._h0h = (c4 << 16) | (c3 & 0xFFFF);
	        this._h0l = (c2 << 16) | (c1 & 0xFFFF);
	        c1 = (h1l & 0xFFFF) + (bl & 0xFFFF);
	        c2 = (h1l >>> 16) + (bl >>> 16) + (c1 >>> 16);
	        c3 = (h1h & 0xFFFF) + (bh & 0xFFFF) + (c2 >>> 16);
	        c4 = (h1h >>> 16) + (bh >>> 16) + (c3 >>> 16);
	        this._h1h = (c4 << 16) | (c3 & 0xFFFF);
	        this._h1l = (c2 << 16) | (c1 & 0xFFFF);
	        c1 = (h2l & 0xFFFF) + (cl & 0xFFFF);
	        c2 = (h2l >>> 16) + (cl >>> 16) + (c1 >>> 16);
	        c3 = (h2h & 0xFFFF) + (ch & 0xFFFF) + (c2 >>> 16);
	        c4 = (h2h >>> 16) + (ch >>> 16) + (c3 >>> 16);
	        this._h2h = (c4 << 16) | (c3 & 0xFFFF);
	        this._h2l = (c2 << 16) | (c1 & 0xFFFF);
	        c1 = (h3l & 0xFFFF) + (dl & 0xFFFF);
	        c2 = (h3l >>> 16) + (dl >>> 16) + (c1 >>> 16);
	        c3 = (h3h & 0xFFFF) + (dh & 0xFFFF) + (c2 >>> 16);
	        c4 = (h3h >>> 16) + (dh >>> 16) + (c3 >>> 16);
	        this._h3h = (c4 << 16) | (c3 & 0xFFFF);
	        this._h3l = (c2 << 16) | (c1 & 0xFFFF);
	        c1 = (h4l & 0xFFFF) + (el & 0xFFFF);
	        c2 = (h4l >>> 16) + (el >>> 16) + (c1 >>> 16);
	        c3 = (h4h & 0xFFFF) + (eh & 0xFFFF) + (c2 >>> 16);
	        c4 = (h4h >>> 16) + (eh >>> 16) + (c3 >>> 16);
	        this._h4h = (c4 << 16) | (c3 & 0xFFFF);
	        this._h4l = (c2 << 16) | (c1 & 0xFFFF);
	        c1 = (h5l & 0xFFFF) + (fl & 0xFFFF);
	        c2 = (h5l >>> 16) + (fl >>> 16) + (c1 >>> 16);
	        c3 = (h5h & 0xFFFF) + (fh & 0xFFFF) + (c2 >>> 16);
	        c4 = (h5h >>> 16) + (fh >>> 16) + (c3 >>> 16);
	        this._h5h = (c4 << 16) | (c3 & 0xFFFF);
	        this._h5l = (c2 << 16) | (c1 & 0xFFFF);
	        c1 = (h6l & 0xFFFF) + (gl & 0xFFFF);
	        c2 = (h6l >>> 16) + (gl >>> 16) + (c1 >>> 16);
	        c3 = (h6h & 0xFFFF) + (gh & 0xFFFF) + (c2 >>> 16);
	        c4 = (h6h >>> 16) + (gh >>> 16) + (c3 >>> 16);
	        this._h6h = (c4 << 16) | (c3 & 0xFFFF);
	        this._h6l = (c2 << 16) | (c1 & 0xFFFF);
	        c1 = (h7l & 0xFFFF) + (hl & 0xFFFF);
	        c2 = (h7l >>> 16) + (hl >>> 16) + (c1 >>> 16);
	        c3 = (h7h & 0xFFFF) + (hh & 0xFFFF) + (c2 >>> 16);
	        c4 = (h7h >>> 16) + (hh >>> 16) + (c3 >>> 16);
	        this._h7h = (c4 << 16) | (c3 & 0xFFFF);
	        this._h7l = (c2 << 16) | (c1 & 0xFFFF);
	    };
	    /**
	     * Extra constants.
	     * @internal
	     */
	    Sha512.EXTRA = [-2147483648, 8388608, 32768, 128];
	    /**
	     * Shift constants.
	     * @internal
	     */
	    Sha512.SHIFT = [24, 16, 8, 0];
	    /**
	     * K.
	     * @internal
	     */
	    Sha512.K = Uint32Array.from([
	        0x428A2F98, 0xD728AE22, 0x71374491, 0x23EF65CD,
	        0xB5C0FBCF, 0xEC4D3B2F, 0xE9B5DBA5, 0x8189DBBC,
	        0x3956C25B, 0xF348B538, 0x59F111F1, 0xB605D019,
	        0x923F82A4, 0xAF194F9B, 0xAB1C5ED5, 0xDA6D8118,
	        0xD807AA98, 0xA3030242, 0x12835B01, 0x45706FBE,
	        0x243185BE, 0x4EE4B28C, 0x550C7DC3, 0xD5FFB4E2,
	        0x72BE5D74, 0xF27B896F, 0x80DEB1FE, 0x3B1696B1,
	        0x9BDC06A7, 0x25C71235, 0xC19BF174, 0xCF692694,
	        0xE49B69C1, 0x9EF14AD2, 0xEFBE4786, 0x384F25E3,
	        0x0FC19DC6, 0x8B8CD5B5, 0x240CA1CC, 0x77AC9C65,
	        0x2DE92C6F, 0x592B0275, 0x4A7484AA, 0x6EA6E483,
	        0x5CB0A9DC, 0xBD41FBD4, 0x76F988DA, 0x831153B5,
	        0x983E5152, 0xEE66DFAB, 0xA831C66D, 0x2DB43210,
	        0xB00327C8, 0x98FB213F, 0xBF597FC7, 0xBEEF0EE4,
	        0xC6E00BF3, 0x3DA88FC2, 0xD5A79147, 0x930AA725,
	        0x06CA6351, 0xE003826F, 0x14292967, 0x0A0E6E70,
	        0x27B70A85, 0x46D22FFC, 0x2E1B2138, 0x5C26C926,
	        0x4D2C6DFC, 0x5AC42AED, 0x53380D13, 0x9D95B3DF,
	        0x650A7354, 0x8BAF63DE, 0x766A0ABB, 0x3C77B2A8,
	        0x81C2C92E, 0x47EDAEE6, 0x92722C85, 0x1482353B,
	        0xA2BFE8A1, 0x4CF10364, 0xA81A664B, 0xBC423001,
	        0xC24B8B70, 0xD0F89791, 0xC76C51A3, 0x0654BE30,
	        0xD192E819, 0xD6EF5218, 0xD6990624, 0x5565A910,
	        0xF40E3585, 0x5771202A, 0x106AA070, 0x32BBD1B8,
	        0x19A4C116, 0xB8D2D0C8, 0x1E376C08, 0x5141AB53,
	        0x2748774C, 0xDF8EEB99, 0x34B0BCB5, 0xE19B48A8,
	        0x391C0CB3, 0xC5C95A63, 0x4ED8AA4A, 0xE3418ACB,
	        0x5B9CCA4F, 0x7763E373, 0x682E6FF3, 0xD6B2B8A3,
	        0x748F82EE, 0x5DEFB2FC, 0x78A5636F, 0x43172F60,
	        0x84C87814, 0xA1F0AB72, 0x8CC70208, 0x1A6439EC,
	        0x90BEFFFA, 0x23631E28, 0xA4506CEB, 0xDE82BDE9,
	        0xBEF9A3F7, 0xB2C67915, 0xC67178F2, 0xE372532B,
	        0xCA273ECE, 0xEA26619C, 0xD186B8C7, 0x21C0C207,
	        0xEADA7DD6, 0xCDE0EB1E, 0xF57D4F7F, 0xEE6ED178,
	        0x06F067AA, 0x72176FBA, 0x0A637DC5, 0xA2C898A6,
	        0x113F9804, 0xBEF90DAE, 0x1B710B35, 0x131C471B,
	        0x28DB77F5, 0x23047D84, 0x32CAAB7B, 0x40C72493,
	        0x3C9EBE0A, 0x15C9BEBC, 0x431D67C4, 0x9C100D4C,
	        0x4CC5D4BE, 0xCB3E42B6, 0x597F299C, 0xFC657E2A,
	        0x5FCB6FAB, 0x3AD6FAEC, 0x6C44198C, 0x4A475817
	    ]);
	    return Sha512;
	}());
	exports.Sha512 = Sha512;

	});

	var hmacSha512 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HmacSha512 = void 0;
	/* eslint-disable no-bitwise */

	/**
	 * Class to help with HmacSha512 scheme.
	 * TypeScript conversion from https://github.com/emn178/js-sha512
	 */
	var HmacSha512 = /** @class */ (function () {
	    /**
	     * Create a new instance of HmacSha512.
	     * @param key The key for the hmac.
	     * @param bits The number of bits.
	     */
	    function HmacSha512(key, bits) {
	        if (bits === void 0) { bits = 512; }
	        this._bits = bits;
	        this._sha512 = new sha512.Sha512(bits);
	        if (key.length > 128) {
	            key = new sha512.Sha512(bits).digest();
	        }
	        this._oKeyPad = new Uint8Array(128);
	        var iKeyPad = new Uint8Array(128);
	        for (var i = 0; i < 128; ++i) {
	            var b = key[i] || 0;
	            this._oKeyPad[i] = 0x5C ^ b;
	            iKeyPad[i] = 0x36 ^ b;
	        }
	        this._sha512.update(iKeyPad);
	    }
	    /**
	     * Update the hash with the data.
	     * @param message The data to update the hash with.
	     * @returns The instance for chaining.
	     */
	    HmacSha512.prototype.update = function (message) {
	        this._sha512.update(message);
	        return this;
	    };
	    /**
	     * Get the digest.
	     * @returns The digest.
	     */
	    HmacSha512.prototype.digest = function () {
	        var innerHash = this._sha512.digest();
	        var finalSha512 = new sha512.Sha512(this._bits);
	        finalSha512.update(this._oKeyPad);
	        finalSha512.update(innerHash);
	        return finalSha512.digest();
	    };
	    return HmacSha512;
	}());
	exports.HmacSha512 = HmacSha512;

	});

	var slip0010 = createCommonjsModule(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Slip0010 = void 0;
	/* eslint-disable no-bitwise */
	var nacl = __importStar(require$$0__default['default']);


	/**
	 * Class to help with slip0010 key derivation.
	 * https://github.com/satoshilabs/slips/blob/master/slip-0010.md
	 */
	var Slip0010 = /** @class */ (function () {
	    function Slip0010() {
	    }
	    /**
	     * Get the master key from the seed.
	     * @param seed The seed to generate the master key from.
	     * @returns The key and chain code.
	     */
	    Slip0010.getMasterKeyFromSeed = function (seed) {
	        var hmac = new hmacSha512.HmacSha512(converter.Converter.asciiToBytes("ed25519 seed"));
	        var fullKey = hmac.update(seed).digest();
	        return {
	            privateKey: Uint8Array.from(fullKey.slice(0, 32)),
	            chainCode: Uint8Array.from(fullKey.slice(32))
	        };
	    };
	    /**
	     * Derive a key from the path.
	     * @param seed The seed.
	     * @param path The path.
	     * @returns The key and chain code.
	     */
	    Slip0010.derivePath = function (seed, path) {
	        var _a = Slip0010.getMasterKeyFromSeed(seed), privateKey = _a.privateKey, chainCode = _a.chainCode;
	        var segments = path.numberSegments();
	        for (var i = 0; i < segments.length; i++) {
	            var indexValue = 0x80000000 + segments[i];
	            var data = new Uint8Array(1 + privateKey.length + 4);
	            data[0] = 0;
	            data.set(privateKey, 1);
	            data[privateKey.length + 1] = indexValue >>> 24;
	            data[privateKey.length + 2] = indexValue >>> 16;
	            data[privateKey.length + 3] = indexValue >>> 8;
	            data[privateKey.length + 4] = indexValue & 0xFF;
	            // TS definition for create only accepts string
	            // in reality it accepts bytes, which is what we want to send
	            var fullKey = new hmacSha512.HmacSha512(chainCode)
	                .update(data)
	                .digest();
	            privateKey = Uint8Array.from(fullKey.slice(0, 32));
	            chainCode = Uint8Array.from(fullKey.slice(32));
	        }
	        return {
	            privateKey: privateKey,
	            chainCode: chainCode
	        };
	    };
	    /**
	     * Get the public key from the private key.
	     * @param privateKey The private key.
	     * @param withZeroByte Include a zero bute prefix.
	     * @returns The public key.
	     */
	    Slip0010.getPublicKey = function (privateKey, withZeroByte) {
	        if (withZeroByte === void 0) { withZeroByte = true; }
	        var keyPair = nacl.sign.keyPair.fromSeed(privateKey);
	        var signPk = keyPair.secretKey.slice(32);
	        if (withZeroByte) {
	            var arr = new Uint8Array(1 + signPk.length);
	            arr[0] = 0;
	            arr.set(signPk, 1);
	            return arr;
	        }
	        return signPk;
	    };
	    return Slip0010;
	}());
	exports.Slip0010 = Slip0010;

	});

	var ed25519Seed = createCommonjsModule(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Ed25519Seed = void 0;
	var nacl = __importStar(require$$0__default['default']);

	/**
	 * Class to help with seeds.
	 */
	var Ed25519Seed = /** @class */ (function () {
	    function Ed25519Seed() {
	        /**
	         * The secret key for the seed.
	         * @internal
	         */
	        this._secretKey = new Uint8Array();
	    }
	    /**
	     * Create a seed from the bytes.
	     * @param bytes The binary representation of the seed.
	     * @returns The seed.
	     */
	    Ed25519Seed.fromBytes = function (bytes) {
	        var seed = new Ed25519Seed();
	        seed._secretKey = bytes;
	        return seed;
	    };
	    /**
	     * Generate a new random seed.
	     * @returns The random seed.
	     */
	    Ed25519Seed.random = function () {
	        return Ed25519Seed.fromBytes(nacl.randomBytes(Ed25519Seed.SEED_SIZE_BYTES));
	    };
	    /**
	     * Get the key pair from the seed.
	     * @returns The key pair.
	     */
	    Ed25519Seed.prototype.keyPair = function () {
	        var signKeyPair = nacl.sign.keyPair.fromSeed(this._secretKey);
	        return {
	            publicKey: signKeyPair.publicKey,
	            privateKey: signKeyPair.secretKey
	        };
	    };
	    /**
	     * Generate a new seed from the path.
	     * @param path The path to generate the seed for.
	     * @returns The generated seed.
	     */
	    Ed25519Seed.prototype.generateSeedFromPath = function (path) {
	        var keys = slip0010.Slip0010.derivePath(this._secretKey, path);
	        return Ed25519Seed.fromBytes(keys.privateKey);
	    };
	    /**
	     * Return the key as bytes.
	     * @returns The key as bytes.
	     */
	    Ed25519Seed.prototype.toBytes = function () {
	        return this._secretKey;
	    };
	    /**
	     * SeedSize is the size, in bytes, of private key seeds.
	     * @internal
	     */
	    Ed25519Seed.SEED_SIZE_BYTES = 32;
	    return Ed25519Seed;
	}());
	exports.Ed25519Seed = Ed25519Seed;

	});

	var sha3 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Sha3 = void 0;
	/* eslint-disable no-bitwise */
	/**
	 * Keccak implementation based on the following.
	 * https://keccak.team/keccak_specs_summary.html
	 * https://github.com/emn178/js-sha3
	 */
	var Sha3 = /** @class */ (function () {
	    /**
	     * Create a new instance of SHA3.
	     * @param bits The number of input bits.
	     * @param padding The padding to use.
	     * @param outputBits The number of output bits.
	     */
	    function Sha3(bits, padding, outputBits) {
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
	    Sha3.sha3 = function (bits) {
	        return new Sha3(bits, Sha3.SHA3_PADDING, bits);
	    };
	    /**
	     * Create instance of the keccak algorithms.
	     * @param bits The number of bits to use.
	     * @returns An initialized instance of the Keccak algorithm,
	     */
	    Sha3.keccak = function (bits) {
	        return new Sha3(bits, Sha3.KECCAK_PADDING, bits);
	    };
	    /**
	     * Reset the state.
	     */
	    Sha3.prototype.reset = function () {
	        this._reset = true;
	        this._block = 0;
	        this._start = 0;
	        this._blocks = new Uint32Array(this._blockCount + 1);
	        this._state = new Uint32Array(50);
	        this._lastByteIndex = 0;
	    };
	    /**
	     * Update the state.
	     * @param input Array of data to use in the update.
	     * @returns The this instance for chaining.
	     */
	    Sha3.prototype.update = function (input) {
	        var message = new Uint8Array(input);
	        var length = message.length;
	        var index = 0;
	        var i;
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
	            }
	            else {
	                this._start = i;
	            }
	        }
	        return this;
	    };
	    /**
	     * Finalize and return the hash for the digest, will also reset the state.
	     * @returns Array buffer containing the digest.
	     */
	    Sha3.prototype.digest = function () {
	        this.finalize();
	        var i = 0;
	        var j = 0;
	        var bytes = this._outputBits >> 3;
	        var buffer = new ArrayBuffer(this._extraBytes ? (this._outputBlocks + 1) << 2 : bytes);
	        var array = new Uint32Array(buffer);
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
	    };
	    /* @internal */
	    Sha3.prototype.finalize = function () {
	        var i = this._lastByteIndex;
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
	    };
	    /* @internal */
	    Sha3.prototype.keccakPermutation = function (s) {
	        var b = new Uint32Array(50);
	        var c = new Uint32Array(10);
	        var h;
	        var l;
	        var n;
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
	    };
	    /**
	     * Padding for Keccak algorithms
	     * @internal
	     */
	    Sha3.KECCAK_PADDING = new Uint32Array([
	        0x01,
	        0x100,
	        0x10000,
	        0x1000000
	    ]);
	    /**
	     * Padding for sha3 algorithms.
	     * @internal
	     */
	    Sha3.SHA3_PADDING = new Uint32Array([
	        0x06,
	        0x600,
	        0x60000,
	        0x6000000
	    ]);
	    /**
	     * Shift.
	     * @internal
	     */
	    Sha3.SHIFT = new Uint8Array([0, 8, 16, 24]);
	    /**
	     * Round constants split into low/high pairs.
	     * @internal
	     */
	    Sha3.ROUND_CONSTANTS = new Uint32Array([
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
	    return Sha3;
	}());
	exports.Sha3 = Sha3;

	});

	var getUnspentAddresses_1 = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getUnspentAddresses = void 0;


	/**
	 * Get all the unspent addresses.
	 * @param client The client to send the transfer with.
	 * @param seed The seed to use for address generation.
	 * @param basePath The base path to start looking for addresses.
	 * @param startIndex Optional start index for the wallet count address, defaults to 0.
	 * @param countLimit Limit the number of items to find.
	 * @returns All the unspent addresses.
	 */
	function getUnspentAddresses(client, seed, basePath, startIndex, countLimit) {
	    return __awaiter(this, void 0, void 0, function () {
	        var localStartIndex, localCountLimit, finished, allUnspent, addressKeyPair, address, addressResponse;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
	                    localCountLimit = countLimit !== null && countLimit !== void 0 ? countLimit : Number.MAX_SAFE_INTEGER;
	                    finished = false;
	                    allUnspent = [];
	                    _a.label = 1;
	                case 1:
	                    basePath.push(localStartIndex);
	                    addressKeyPair = seed.generateSeedFromPath(basePath).keyPair();
	                    basePath.pop();
	                    address = converter.Converter.bytesToHex(ed25519.Ed25519.publicKeyToAddress(addressKeyPair.publicKey));
	                    return [4 /*yield*/, client.address(address)];
	                case 2:
	                    addressResponse = _a.sent();
	                    // If there are no outputs for the address we have reached the
	                    // end of the used addresses
	                    if (addressResponse.count === 0) {
	                        finished = true;
	                    }
	                    else {
	                        allUnspent.push({
	                            address: address,
	                            index: localStartIndex,
	                            balance: addressResponse.balance
	                        });
	                        if (allUnspent.length === localCountLimit) {
	                            finished = true;
	                        }
	                    }
	                    localStartIndex++;
	                    _a.label = 3;
	                case 3:
	                    if (!finished) return [3 /*break*/, 1];
	                    _a.label = 4;
	                case 4: return [2 /*return*/, allUnspent];
	            }
	        });
	    });
	}
	exports.getUnspentAddresses = getUnspentAddresses;

	});

	var getBalance_1 = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getBalance = void 0;

	/**
	 * Get the balance for a list of addresses.
	 * @param client The client to send the transfer with.
	 * @param seed The seed.
	 * @param basePath The base path to start looking for addresses.
	 * @param startIndex The start index to generate from, defaults to 0.
	 * @returns The balance.
	 */
	function getBalance(client, seed, basePath, startIndex) {
	    if (startIndex === void 0) { startIndex = 0; }
	    return __awaiter(this, void 0, void 0, function () {
	        var allUnspent;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, getUnspentAddresses_1.getUnspentAddresses(client, seed, basePath, startIndex)];
	                case 1:
	                    allUnspent = _a.sent();
	                    return [2 /*return*/, allUnspent.reduce(function (total, output) { return total + output.balance; }, 0)];
	            }
	        });
	    });
	}
	exports.getBalance = getBalance;

	});

	var getUnspentAddress_1 = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getUnspentAddress = void 0;

	/**
	 * Get the first unspent address.
	 * @param client The client to send the transfer with.
	 * @param seed The seed to use for address generation.
	 * @param basePath The base path to start looking for addresses.
	 * @param startIndex Optional start index for the wallet count address, defaults to 0.
	 * @returns The first unspent address.
	 */
	function getUnspentAddress(client, seed, basePath, startIndex) {
	    return __awaiter(this, void 0, void 0, function () {
	        var allUnspent;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, getUnspentAddresses_1.getUnspentAddresses(client, seed, basePath, startIndex, 1)];
	                case 1:
	                    allUnspent = _a.sent();
	                    return [2 /*return*/, allUnspent.length > 0 ? allUnspent[0] : undefined];
	            }
	        });
	    });
	}
	exports.getUnspentAddress = getUnspentAddress;

	});

	var retrieveData_1 = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.retrieveData = void 0;

	/**
	 * Retrieve a data message.
	 * @param client The client to send the transfer with.
	 * @param messageId The message id of the data to get.
	 * @returns The message index and data.
	 */
	function retrieveData(client, messageId) {
	    return __awaiter(this, void 0, void 0, function () {
	        var message, indexationPayload;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, client.message(messageId)];
	                case 1:
	                    message = _a.sent();
	                    if (message === null || message === void 0 ? void 0 : message.payload) {
	                        indexationPayload = void 0;
	                        if (message.payload.type === 0) {
	                            indexationPayload = message.payload.essence.payload;
	                        }
	                        else if (message.payload.type === 2) {
	                            indexationPayload = message.payload;
	                        }
	                        if (indexationPayload) {
	                            return [2 /*return*/, {
	                                    index: indexationPayload.index,
	                                    data: converter.Converter.hexToBytes(indexationPayload.data)
	                                }];
	                        }
	                    }
	                    return [2 /*return*/];
	            }
	        });
	    });
	}
	exports.retrieveData = retrieveData;

	});

	var writeStream = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WriteStream = void 0;
	/* eslint-disable no-bitwise */


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
	        return converter.Converter.bytesToHex(this._storage.subarray(0, this._writeIndex));
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
	        if (!common.isHex(val)) {
	            throw new Error("The " + val + " should be in hex format");
	        }
	        // Hex should be twice the length as each byte is 2 ascii characters
	        if (length * 2 !== val.length) {
	            throw new Error(name + " length " + val.length + " does not match expected length " + length * 2);
	        }
	        this.expand(length);
	        this._storage.set(converter.Converter.hexToBytes(val), this._writeIndex);
	        this._writeIndex += length;
	    };
	    /**
	     * Write fixed length stream.
	     * @param name The name of the data we are trying to write.
	     * @param length The length of the data to write.
	     * @param val The data to write.
	     */
	    WriteStream.prototype.writeBytes = function (name, length, val) {
	        this.expand(length);
	        this._storage.set(val, this._writeIndex);
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
	        var arr = converter.Converter.hexToBytes(hex, true);
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
	        this._storage.set(converter.Converter.asciiToBytes(val), this._writeIndex);
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

	});

	var sendAdvanced_1 = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sendAdvanced = void 0;






	/**
	 * Send a transfer from the balance on the seed.
	 * @param client The client to send the transfer with.
	 * @param seed The seed to use for address generation.
	 * @param basePath The base path to start looking for addresses.
	 * @param outputs The outputs to send.
	 * @param startIndex Optional start index for the wallet count address, defaults to 0.
	 * @param indexationKey Optional indexation key.
	 * @param indexationData Optional index data.
	 * @returns The id of the message created and the remainder address if one was needed.
	 */
	function sendAdvanced(client, seed, basePath, outputs, startIndex, indexationKey, indexationData) {
	    return __awaiter(this, void 0, void 0, function () {
	        var requiredBalance, localStartIndex, consumedBalance, inputsAndSignatureKeyPairs, finished, addressKeyPair, address, addressOutputIds, _i, _a, addressOutputId, addressOutput, input$1, writeStream$1, outputsWithSerialization, _b, outputs_1, output$1, sigLockedOutput, writeStream$1, sortedInputs, sortedOutputs, transactionEssence, binaryEssence, essenceFinal, unlockBlocks, addressToUnlockBlock, _c, sortedInputs_1, input$1, hexInputAddressPublic, transactionPayload, tips, message, messageId;
	        return __generator(this, function (_d) {
	            switch (_d.label) {
	                case 0:
	                    if (!outputs || outputs.length === 0) {
	                        throw new Error("You must specify some outputs");
	                    }
	                    requiredBalance = outputs.reduce(function (total, output) { return total + output.amount; }, 0);
	                    localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
	                    consumedBalance = 0;
	                    inputsAndSignatureKeyPairs = [];
	                    finished = false;
	                    _d.label = 1;
	                case 1:
	                    basePath.push(localStartIndex);
	                    addressKeyPair = seed.generateSeedFromPath(basePath).keyPair();
	                    basePath.pop();
	                    address = converter.Converter.bytesToHex(ed25519.Ed25519.publicKeyToAddress(addressKeyPair.publicKey));
	                    return [4 /*yield*/, client.addressOutputs(address)];
	                case 2:
	                    addressOutputIds = _d.sent();
	                    if (!(addressOutputIds.count === 0)) return [3 /*break*/, 3];
	                    finished = true;
	                    return [3 /*break*/, 7];
	                case 3:
	                    _i = 0, _a = addressOutputIds.outputIds;
	                    _d.label = 4;
	                case 4:
	                    if (!(_i < _a.length)) return [3 /*break*/, 7];
	                    addressOutputId = _a[_i];
	                    return [4 /*yield*/, client.output(addressOutputId)];
	                case 5:
	                    addressOutput = _d.sent();
	                    if (!addressOutput.isSpent &&
	                        consumedBalance < requiredBalance) {
	                        if (addressOutput.output.amount === 0) {
	                            finished = true;
	                        }
	                        else {
	                            consumedBalance += addressOutput.output.amount;
	                            input$1 = {
	                                type: 0,
	                                transactionId: addressOutput.transactionId,
	                                transactionOutputIndex: addressOutput.outputIndex
	                            };
	                            writeStream$1 = new writeStream.WriteStream();
	                            input.serializeInput(writeStream$1, input$1);
	                            inputsAndSignatureKeyPairs.push({
	                                input: input$1,
	                                addressKeyPair: addressKeyPair,
	                                serialized: writeStream$1.finalHex()
	                            });
	                            if (consumedBalance >= requiredBalance) {
	                                // We didn't use all the balance from the last input
	                                // so return the rest to the same address.
	                                if (consumedBalance - requiredBalance > 0) {
	                                    outputs.push({
	                                        amount: consumedBalance - requiredBalance,
	                                        address: address
	                                    });
	                                }
	                                finished = true;
	                            }
	                        }
	                    }
	                    _d.label = 6;
	                case 6:
	                    _i++;
	                    return [3 /*break*/, 4];
	                case 7:
	                    localStartIndex++;
	                    _d.label = 8;
	                case 8:
	                    if (!finished) return [3 /*break*/, 1];
	                    _d.label = 9;
	                case 9:
	                    if (consumedBalance < requiredBalance) {
	                        throw new Error("There are not enough funds in the inputs for the required balance");
	                    }
	                    outputsWithSerialization = [];
	                    for (_b = 0, outputs_1 = outputs; _b < outputs_1.length; _b++) {
	                        output$1 = outputs_1[_b];
	                        sigLockedOutput = {
	                            type: 0,
	                            address: {
	                                type: 1,
	                                address: output$1.address
	                            },
	                            amount: output$1.amount
	                        };
	                        writeStream$1 = new writeStream.WriteStream();
	                        output.serializeOutput(writeStream$1, sigLockedOutput);
	                        outputsWithSerialization.push({
	                            output: sigLockedOutput,
	                            serialized: writeStream$1.finalHex()
	                        });
	                    }
	                    sortedInputs = inputsAndSignatureKeyPairs.sort(function (a, b) { return a.serialized.localeCompare(b.serialized); });
	                    sortedOutputs = outputsWithSerialization.sort(function (a, b) { return a.serialized.localeCompare(b.serialized); });
	                    transactionEssence = {
	                        type: 0,
	                        inputs: sortedInputs.map(function (i) { return i.input; }),
	                        outputs: sortedOutputs.map(function (o) { return o.output; }),
	                        payload: indexationKey && indexationData
	                            ? {
	                                type: 2,
	                                index: indexationKey,
	                                data: converter.Converter.bytesToHex(indexationData)
	                            }
	                            : undefined
	                    };
	                    binaryEssence = new writeStream.WriteStream();
	                    transaction.serializeTransactionEssence(binaryEssence, transactionEssence);
	                    essenceFinal = binaryEssence.finalBytes();
	                    unlockBlocks = [];
	                    addressToUnlockBlock = {};
	                    for (_c = 0, sortedInputs_1 = sortedInputs; _c < sortedInputs_1.length; _c++) {
	                        input$1 = sortedInputs_1[_c];
	                        hexInputAddressPublic = converter.Converter.bytesToHex(input$1.addressKeyPair.publicKey);
	                        if (addressToUnlockBlock[hexInputAddressPublic]) {
	                            unlockBlocks.push({
	                                type: 1,
	                                reference: addressToUnlockBlock[hexInputAddressPublic].unlockIndex
	                            });
	                        }
	                        else {
	                            unlockBlocks.push({
	                                type: 0,
	                                signature: {
	                                    type: 1,
	                                    publicKey: hexInputAddressPublic,
	                                    signature: converter.Converter.bytesToHex(ed25519.Ed25519.signData(input$1.addressKeyPair.privateKey, essenceFinal))
	                                }
	                            });
	                            addressToUnlockBlock[hexInputAddressPublic] = {
	                                keyPair: input$1.addressKeyPair,
	                                unlockIndex: unlockBlocks.length - 1
	                            };
	                        }
	                    }
	                    transactionPayload = {
	                        type: 0,
	                        essence: transactionEssence,
	                        unlockBlocks: unlockBlocks
	                    };
	                    return [4 /*yield*/, client.tips()];
	                case 10:
	                    tips = _d.sent();
	                    message = {
	                        version: 1,
	                        parent1MessageId: tips.tip1MessageId,
	                        parent2MessageId: tips.tip2MessageId,
	                        payload: transactionPayload,
	                        nonce: 0
	                    };
	                    return [4 /*yield*/, client.messageSubmit(message)];
	                case 11:
	                    messageId = _d.sent();
	                    return [2 /*return*/, {
	                            messageId: messageId,
	                            message: message
	                        }];
	            }
	        });
	    });
	}
	exports.sendAdvanced = sendAdvanced;

	});

	var send_1 = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.send = void 0;

	/**
	 * Send a transfer from the balance on the seed.
	 * @param client The client to send the transfer with.
	 * @param seed The seed to use for address generation.
	 * @param basePath The base path to start looking for addresses.
	 * @param address The address to send the funds to.
	 * @param amount The amount to send.
	 * @param startIndex The start index for the wallet count address, defaults to 0.
	 * @returns The id of the message created and the contructed message.
	 */
	function send(client, seed, basePath, address, amount, startIndex) {
	    return __awaiter(this, void 0, void 0, function () {
	        var response;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, sendAdvanced_1.sendAdvanced(client, seed, basePath, [{ address: address, amount: amount }], startIndex)];
	                case 1:
	                    response = _a.sent();
	                    return [2 /*return*/, {
	                            messageId: response.messageId,
	                            message: response.message
	                        }];
	            }
	        });
	    });
	}
	exports.send = send;

	});

	var sendData_1 = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sendData = void 0;

	/**
	 * Send a data message.
	 * @param client The client to send the transfer with.
	 * @param indexationKey The index name.
	 * @param indexationData The index data.
	 * @returns The id of the message created and the message.
	 */
	function sendData(client, indexationKey, indexationData) {
	    return __awaiter(this, void 0, void 0, function () {
	        var indexationPayload, tips, message, messageId;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    indexationPayload = {
	                        type: 2,
	                        index: indexationKey,
	                        data: converter.Converter.bytesToHex(indexationData)
	                    };
	                    return [4 /*yield*/, client.tips()];
	                case 1:
	                    tips = _a.sent();
	                    message = {
	                        version: 1,
	                        parent1MessageId: tips.tip1MessageId,
	                        parent2MessageId: tips.tip2MessageId,
	                        payload: indexationPayload,
	                        nonce: 0
	                    };
	                    return [4 /*yield*/, client.messageSubmit(message)];
	                case 2:
	                    messageId = _a.sent();
	                    return [2 /*return*/, {
	                            message: message,
	                            messageId: messageId
	                        }];
	            }
	        });
	    });
	}
	exports.sendData = sendData;

	});

	var IEd25519Address = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IEd25519Signature = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IIndexationPayload = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IKeyPair = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IMessage = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IMilestonePayload = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IReferenceUnlockBlock = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var ISeed = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var ISigLockedSingleOutput = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var ISignatureUnlockBlock = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var ITransactionEssence = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var ITransactionPayload = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var ITypeBase = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IUTXOInput = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var logging = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.logUnlockBlock = exports.logOutput = exports.logInput = exports.logSignature = exports.logAddress = exports.logPayload = exports.logMessage = exports.setLogger = void 0;

	/**
	 * The logger used by the log methods.
	 * @param message The message to output.
	 * @param data The data to output.
	 * @returns Nothing.
	 */
	var logger = function (message, data) {
	    return (data !== undefined ? console.log(message, data) : console.log(message));
	};
	/**
	 * Set the logger for output.
	 * @param log The logger.
	 */
	function setLogger(log) {
	    logger = log;
	}
	exports.setLogger = setLogger;
	/**
	 * Log a message to the console.
	 * @param prefix The prefix for the output.
	 * @param message The message to log.
	 */
	function logMessage(prefix, message) {
	    logger(prefix + "\tVersion:", message.version);
	    logger(prefix + "\tParent 1 Message Id:", message.parent1MessageId);
	    logger(prefix + "\tParent 2 Message Id:", message.parent2MessageId);
	    logPayload(prefix + "\t", message.payload);
	    if (message.nonce !== undefined) {
	        logger(prefix + "\tNonce:", message.nonce);
	    }
	}
	exports.logMessage = logMessage;
	/**
	 * Log a message to the console.
	 * @param prefix The prefix for the output.
	 * @param unknownPayload The payload.
	 */
	function logPayload(prefix, unknownPayload) {
	    if (unknownPayload) {
	        if (unknownPayload.type === 0) {
	            var payload = unknownPayload;
	            logger(prefix + "Transaction Payload");
	            if (payload.essence.type === 0) {
	                if (payload.essence.inputs) {
	                    logger(prefix + "\tInputs:", payload.essence.inputs.length);
	                    for (var _i = 0, _a = payload.essence.inputs; _i < _a.length; _i++) {
	                        var input = _a[_i];
	                        logInput(prefix + "\t\t", input);
	                    }
	                }
	                if (payload.essence.outputs) {
	                    logger(prefix + "\tOutputs:", payload.essence.outputs.length);
	                    for (var _b = 0, _c = payload.essence.outputs; _b < _c.length; _b++) {
	                        var output = _c[_b];
	                        logOutput(prefix + "\t\t", output);
	                    }
	                }
	                logPayload(prefix + "\t", payload.essence.payload);
	            }
	            if (payload.unlockBlocks) {
	                logger(prefix + "\tUnlock Blocks:", payload.unlockBlocks.length);
	                for (var _d = 0, _e = payload.unlockBlocks; _d < _e.length; _d++) {
	                    var unlockBlock = _e[_d];
	                    logUnlockBlock(prefix + "\t\t", unlockBlock);
	                }
	            }
	        }
	        else if (unknownPayload.type === 1) {
	            var payload = unknownPayload;
	            logger(prefix + "Milestone Payload");
	            logger(prefix + "\tIndex:", payload.index);
	            logger(prefix + "\tTimestamp:", payload.timestamp);
	            logger(prefix + "\tInclusion Merkle Proof:", payload.inclusionMerkleProof);
	            logger(prefix + "\tSignatures:", payload.signatures);
	        }
	        else if (unknownPayload.type === 2) {
	            var payload = unknownPayload;
	            logger(prefix + "Indexation Payload");
	            logger(prefix + "\tIndex:", payload.index);
	            logger(prefix + "\tData:", converter.Converter.hexToAscii(payload.data));
	        }
	    }
	}
	exports.logPayload = logPayload;
	/**
	 * Log an address to the console.
	 * @param prefix The prefix for the output.
	 * @param unknownAddress The address to log.
	 */
	function logAddress(prefix, unknownAddress) {
	    if (unknownAddress) {
	        if (unknownAddress.type === 1) {
	            var address = unknownAddress;
	            logger(prefix + "Ed25519 Address");
	            logger(prefix + "\tAddress:", address.address);
	        }
	    }
	}
	exports.logAddress = logAddress;
	/**
	 * Log signature to the console.
	 * @param prefix The prefix for the output.
	 * @param unknownSignature The signature to log.
	 */
	function logSignature(prefix, unknownSignature) {
	    if (unknownSignature) {
	        if (unknownSignature.type === 1) {
	            var signature = unknownSignature;
	            logger(prefix + "Ed25519 Signature");
	            logger(prefix + "\tPublic Key:", signature.publicKey);
	            logger(prefix + "\tSignature:", signature.signature);
	        }
	    }
	}
	exports.logSignature = logSignature;
	/**
	 * Log input to the console.
	 * @param prefix The prefix for the output.
	 * @param unknownInput The input to log.
	 */
	function logInput(prefix, unknownInput) {
	    if (unknownInput) {
	        if (unknownInput.type === 0) {
	            var input = unknownInput;
	            logger(prefix + "UTXO Input");
	            logger(prefix + "\tTransaction Id:", input.transactionId);
	            logger(prefix + "\tTransaction Output Index:", input.transactionOutputIndex);
	        }
	    }
	}
	exports.logInput = logInput;
	/**
	 * Log output to the console.
	 * @param prefix The prefix for the output.
	 * @param unknownOutput The output to log.
	 */
	function logOutput(prefix, unknownOutput) {
	    if (unknownOutput) {
	        if (unknownOutput.type === 0) {
	            var output = unknownOutput;
	            logger(prefix + "Signature Locked Single Output");
	            logAddress(prefix + "\t\t", output.address);
	            logger(prefix + "\t\tAmount:", output.amount);
	        }
	    }
	}
	exports.logOutput = logOutput;
	/**
	 * Log unlock block to the console.
	 * @param prefix The prefix for the output.
	 * @param unknownUnlockBlock The unlock block to log.
	 */
	function logUnlockBlock(prefix, unknownUnlockBlock) {
	    if (unknownUnlockBlock) {
	        if (unknownUnlockBlock.type === 0) {
	            var unlockBlock = unknownUnlockBlock;
	            logger(prefix + "\tSignature Unlock Block");
	            logSignature(prefix + "\t\t\t", unlockBlock.signature);
	        }
	        else if (unknownUnlockBlock.type === 1) {
	            var unlockBlock = unknownUnlockBlock;
	            logger(prefix + "\tReference Unlock Block");
	            logger(prefix + "\t\tReference:", unlockBlock.reference);
	        }
	    }
	}
	exports.logUnlockBlock = logUnlockBlock;

	});

	var readStream = createCommonjsModule(function (module, exports) {
	/* eslint-disable no-bitwise */
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ReadStream = void 0;

	/**
	 * Keep track of the read index within a stream.
	 */
	var ReadStream = /** @class */ (function () {
	    /**
	     * Create a new instance of ReadStream.
	     * @param storage The data to access.
	     * @param readStartIndex The index to start the reading from.
	     */
	    function ReadStream(storage, readStartIndex) {
	        if (readStartIndex === void 0) { readStartIndex = 0; }
	        this._storage = new Uint8Array(storage);
	        this._readIndex = readStartIndex;
	    }
	    /**
	     * Get the length of the storage.
	     * @returns The storage length.
	     */
	    ReadStream.prototype.length = function () {
	        return this._storage.byteLength;
	    };
	    /**
	     * Does the storage have enough data remaining.
	     * @param remaining The amount of space needed.
	     * @returns True if it has enough data.
	     */
	    ReadStream.prototype.hasRemaining = function (remaining) {
	        return this._readIndex + remaining <= this._storage.byteLength;
	    };
	    /**
	     * How much unused data is there.
	     * @returns The amount of unused data.
	     */
	    ReadStream.prototype.unused = function () {
	        return this._storage.byteLength - this._readIndex;
	    };
	    /**
	     * Read fixed length as hex.
	     * @param name The name of the data we are trying to read.
	     * @param length The length of the data to read.
	     * @param moveIndex Move the index pointer on.
	     * @returns The hex formatted data.
	     */
	    ReadStream.prototype.readFixedHex = function (name, length, moveIndex) {
	        if (moveIndex === void 0) { moveIndex = true; }
	        if (!this.hasRemaining(length)) {
	            throw new Error(name + " length " + length + " exceeds the remaining data " + this.unused());
	        }
	        var hex = converter.Converter.bytesToHex(this._storage, this._readIndex, length);
	        if (moveIndex) {
	            this._readIndex += length;
	        }
	        return hex;
	    };
	    /**
	     * Read an array of byte from the stream.
	     * @param name The name of the data we are trying to read.
	     * @param length The length of the array to read.
	     * @param moveIndex Move the index pointer on.
	     * @returns The value.
	     */
	    ReadStream.prototype.readBytes = function (name, length, moveIndex) {
	        if (moveIndex === void 0) { moveIndex = true; }
	        if (!this.hasRemaining(length)) {
	            throw new Error(name + " length " + length + " exceeds the remaining data " + this.unused());
	        }
	        var val = this._storage.slice(this._readIndex, this._readIndex + length);
	        if (moveIndex) {
	            this._readIndex += length;
	        }
	        return val;
	    };
	    /**
	     * Read a byte from the stream.
	     * @param name The name of the data we are trying to read.
	     * @param moveIndex Move the index pointer on.
	     * @returns The value.
	     */
	    ReadStream.prototype.readByte = function (name, moveIndex) {
	        if (moveIndex === void 0) { moveIndex = true; }
	        if (!this.hasRemaining(1)) {
	            throw new Error(name + " length " + 1 + " exceeds the remaining data " + this.unused());
	        }
	        var val = this._storage[this._readIndex];
	        if (moveIndex) {
	            this._readIndex += 1;
	        }
	        return val;
	    };
	    /**
	     * Read a UInt16 from the stream.
	     * @param name The name of the data we are trying to read.
	     * @param moveIndex Move the index pointer on.
	     * @returns The value.
	     */
	    ReadStream.prototype.readUInt16 = function (name, moveIndex) {
	        if (moveIndex === void 0) { moveIndex = true; }
	        if (!this.hasRemaining(2)) {
	            throw new Error(name + " length " + 2 + " exceeds the remaining data " + this.unused());
	        }
	        var val = this._storage[this._readIndex] |
	            (this._storage[this._readIndex + 1] << 8);
	        if (moveIndex) {
	            this._readIndex += 2;
	        }
	        return val;
	    };
	    /**
	     * Read a UInt32 from the stream.
	     * @param name The name of the data we are trying to read.
	     * @param moveIndex Move the index pointer on.
	     * @returns The value.
	     */
	    ReadStream.prototype.readUInt32 = function (name, moveIndex) {
	        if (moveIndex === void 0) { moveIndex = true; }
	        if (!this.hasRemaining(4)) {
	            throw new Error(name + " length " + 4 + " exceeds the remaining data " + this.unused());
	        }
	        var val = (this._storage[this._readIndex]) |
	            (this._storage[this._readIndex + 1] * 0x100) |
	            (this._storage[this._readIndex + 2] * 0x10000) +
	                (this._storage[this._readIndex + 3] * 0x1000000);
	        if (moveIndex) {
	            this._readIndex += 4;
	        }
	        return val;
	    };
	    /**
	     * Read a UInt64 from the stream.
	     * @param name The name of the data we are trying to read.
	     * @param moveIndex Move the index pointer on.
	     * @returns The value.
	     */
	    ReadStream.prototype.readUInt64 = function (name, moveIndex) {
	        if (moveIndex === void 0) { moveIndex = true; }
	        if (!this.hasRemaining(8)) {
	            throw new Error(name + " length " + 8 + " exceeds the remaining data " + this.unused());
	        }
	        // We reverse the string conversion as this is LE
	        var val = BigInt("0x" + converter.Converter.bytesToHex(this._storage, this._readIndex, 8, true));
	        if (moveIndex) {
	            this._readIndex += 8;
	        }
	        return val;
	    };
	    /**
	     * Read a string from the stream.
	     * @param name The name of the data we are trying to read.
	     * @param moveIndex Move the index pointer on.
	     * @returns The string.
	     */
	    ReadStream.prototype.readString = function (name, moveIndex) {
	        if (moveIndex === void 0) { moveIndex = true; }
	        var stringLength = this.readUInt16(name);
	        if (!this.hasRemaining(stringLength)) {
	            throw new Error(name + " length " + stringLength + " exceeds the remaining data " + this.unused());
	        }
	        var val = converter.Converter.bytesToAscii(this._storage, this._readIndex, stringLength);
	        if (moveIndex) {
	            this._readIndex += stringLength;
	        }
	        return val;
	    };
	    return ReadStream;
	}());
	exports.ReadStream = ReadStream;

	});

	var es = createCommonjsModule(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(clientError, exports);
	__exportStar(IAddress, exports);
	__exportStar(IAddressOutputs, exports);
	__exportStar(IChildren, exports);
	__exportStar(IClient, exports);
	__exportStar(IInfo, exports);
	__exportStar(IMessageId, exports);
	__exportStar(IMessageMetadata, exports);
	__exportStar(IMessages, exports);
	__exportStar(IMilestone, exports);
	__exportStar(IOutput, exports);
	__exportStar(IResponse, exports);
	__exportStar(ITips, exports);
	__exportStar(address, exports);
	__exportStar(common, exports);
	__exportStar(input, exports);
	__exportStar(message, exports);
	__exportStar(output, exports);
	__exportStar(payload, exports);
	__exportStar(signature, exports);
	__exportStar(transaction, exports);
	__exportStar(unlockBlock, exports);
	__exportStar(singleNodeClient, exports);
	__exportStar(bip32Path, exports);
	__exportStar(blake2b, exports);
	__exportStar(ed25519, exports);
	__exportStar(ed25519Seed, exports);
	__exportStar(hmacSha512, exports);
	__exportStar(sha3, exports);
	__exportStar(sha512, exports);
	__exportStar(slip0010, exports);
	__exportStar(getBalance_1, exports);
	__exportStar(getUnspentAddress_1, exports);
	__exportStar(getUnspentAddresses_1, exports);
	__exportStar(retrieveData_1, exports);
	__exportStar(send_1, exports);
	__exportStar(sendAdvanced_1, exports);
	__exportStar(sendData_1, exports);
	__exportStar(IEd25519Address, exports);
	__exportStar(IEd25519Signature, exports);
	__exportStar(IIndexationPayload, exports);
	__exportStar(IKeyPair, exports);
	__exportStar(IMessage, exports);
	__exportStar(IMilestonePayload, exports);
	__exportStar(IReferenceUnlockBlock, exports);
	__exportStar(ISeed, exports);
	__exportStar(ISigLockedSingleOutput, exports);
	__exportStar(ISignatureUnlockBlock, exports);
	__exportStar(ITransactionEssence, exports);
	__exportStar(ITransactionPayload, exports);
	__exportStar(ITypeBase, exports);
	__exportStar(IUTXOInput, exports);
	__exportStar(converter, exports);
	__exportStar(logging, exports);
	__exportStar(readStream, exports);
	__exportStar(writeStream, exports);

	});

	var index_node = createCommonjsModule(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var node_fetch_1 = __importDefault(require$$0__default$1['default']);
	if (!globalThis.fetch) {
	    // eslint-disable-next-line @typescript-eslint/no-explicit-any
	    globalThis.fetch = node_fetch_1.default;
	}
	__exportStar(es, exports);

	});

	var index_node$1 = /*@__PURE__*/getDefaultExportFromCjs(index_node);

	return index_node$1;

})));
