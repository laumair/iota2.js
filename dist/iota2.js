(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('buffer'), require('cross-fetch'), require('tweetnacl'), require('blakejs'), require('crypto')) :
	typeof define === 'function' && define.amd ? define(['buffer', 'cross-fetch', 'tweetnacl', 'blakejs', 'crypto'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Iota2 = factory(global.buffer_1, global['cross-fetch'], global.tweetnacl, global.blakejs, global.crypto));
}(this, (function (buffer_1, require$$0, require$$0$1, blakejs_1, require$$0$2) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var buffer_1__default = /*#__PURE__*/_interopDefaultLegacy(buffer_1);
	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
	var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
	var blakejs_1__default = /*#__PURE__*/_interopDefaultLegacy(blakejs_1);
	var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);

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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ClientError = void 0;
	/**
	 * Class to handle http errors.
	 */
	class ClientError extends Error {
	    /**
	     * Create a new instance of ClientError.
	     * @param message The message for the error.
	     * @param route The route the request was made to.
	     * @param httpStatus The http status code.
	     * @param code The code in the payload.
	     */
	    constructor(message, route, httpStatus, code) {
	        super(message);
	        this.route = route;
	        this.httpStatus = httpStatus;
	        this.code = code;
	    }
	}
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
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SingleNodeClient = void 0;
	const cross_fetch_1 = __importDefault(require$$0__default['default']);

	/**
	 * Client for API communication.
	 */
	class SingleNodeClient {
	    /**
	     * Create a new instance of client.
	     * @param endpoint The endpoint.
	     */
	    constructor(endpoint) {
	        if (!/^https?:\/\/\w+(\.\w+)*(:\d+)?(\/.*)?$/.test(endpoint)) {
	            throw new Error("The endpoint is not in the correct format");
	        }
	        this._endpoint = endpoint.replace(/\/+$/, "");
	    }
	    /**
	     * Get the health of the node.
	     * @returns True if the node is healthy.
	     */
	    health() {
	        return __awaiter(this, void 0, void 0, function* () {
	            const status = yield this.fetchStatus("/health");
	            if (status === 200) {
	                return true;
	            }
	            else if (status === 503) {
	                return false;
	            }
	            throw new clientError.ClientError("Unexpected response code", "/health", status);
	        });
	    }
	    /**
	     * Get the info about the node.
	     * @returns The node information.
	     */
	    info() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.fetchJson("get", "/api/v1/info");
	        });
	    }
	    /**
	     * Get the tips from the node.
	     * @returns The tips.
	     */
	    tips() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.fetchJson("get", "/api/v1/tips");
	        });
	    }
	    /**
	     * Get the message data by id.
	     * @param messageId The message to get the data for.
	     * @returns The message data.
	     */
	    message(messageId) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.fetchJson("get", `/api/v1/messages/${messageId}`);
	        });
	    }
	    /**
	     * Get the message metadata by id.
	     * @param messageId The message to get the metadata for.
	     * @returns The message metadata.
	     */
	    messageMetadata(messageId) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.fetchJson("get", `/api/v1/messages/${messageId}/metadata`);
	        });
	    }
	    /**
	     * Get the message raw data by id.
	     * @param messageId The message to get the data for.
	     * @returns The message raw data.
	     */
	    messageRaw(messageId) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.fetchBinary("get", `/api/v1/messages/${messageId}/raw`);
	        });
	    }
	    /**
	     * Submit message.
	     * @param message The message to submit.
	     * @returns The messageId.
	     */
	    messageSubmit(message) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const response = yield this.fetchJson("post", "/api/v1/messages", message);
	            return response.messageId;
	        });
	    }
	    /**
	     * Submit message in raw format.
	     * @param message The message to submit.
	     * @returns The messageId.
	     */
	    messageSubmitRaw(message) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const response = yield this.fetchBinary("post", "/api/v1/messages", message);
	            return response.messageId;
	        });
	    }
	    /**
	     * Find messages by index.
	     * @param index The index value.
	     * @returns The messageId.
	     */
	    messagesFind(index) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.fetchJson("get", `/api/v1/messages?index=${encodeURIComponent(index)}`);
	        });
	    }
	    /**
	     * Get the children of a message.
	     * @param messageId The id of the message to get the children for.
	     * @returns The messages children.
	     */
	    messageChildren(messageId) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.fetchJson("get", `/api/v1/messages/${messageId}/children`);
	        });
	    }
	    /**
	     * Find an output by its identifier.
	     * @param outputId The id of the output to get.
	     * @returns The output details.
	     */
	    output(outputId) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.fetchJson("get", `/api/v1/outputs/${outputId}`);
	        });
	    }
	    /**
	     * Get the address details.
	     * @param address The address to get the details for.
	     * @returns The address details.
	     */
	    address(address) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.fetchJson("get", `/api/v1/addresses/${address}`);
	        });
	    }
	    /**
	     * Get the address outputs.
	     * @param address The address to get the outputs for.
	     * @returns The address outputs.
	     */
	    addressOutputs(address) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.fetchJson("get", `/api/v1/addresses/${address}/outputs`);
	        });
	    }
	    /**
	     * Get the requested milestone.
	     * @param index The index of the milestone to get.
	     * @returns The milestone details.
	     */
	    milestone(index) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.fetchJson("get", `/api/v1/milestones/${index}`);
	        });
	    }
	    /**
	     * Perform a request and just return the status.
	     * @param route The route of the request.
	     * @returns The response.
	     * @private
	     */
	    fetchStatus(route) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const response = yield cross_fetch_1.default(`${this._endpoint}${route}`, {
	                method: "get"
	            });
	            return response.status;
	        });
	    }
	    /**
	     * Perform a request in json format.
	     * @param method The http method.
	     * @param route The route of the request.
	     * @param requestData Request to send to the endpoint.
	     * @returns The response.
	     * @private
	     */
	    fetchJson(method, route, requestData) {
	        var _a, _b, _c;
	        return __awaiter(this, void 0, void 0, function* () {
	            const response = yield cross_fetch_1.default(`${this._endpoint}${route}`, {
	                method,
	                headers: {
	                    "Content-Type": "application/json"
	                },
	                body: requestData ? JSON.stringify(requestData) : undefined
	            });
	            const responseData = yield response.json();
	            if (response.ok && !responseData.error) {
	                return responseData.data;
	            }
	            throw new clientError.ClientError((_b = (_a = responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData.error) === null || _c === void 0 ? void 0 : _c.code);
	        });
	    }
	    /**
	     * Perform a request for binary data.
	     * @param method The http method.
	     * @param route The route of the request.
	     * @param requestData Request to send to the endpoint.
	     * @returns The response.
	     * @private
	     */
	    fetchBinary(method, route, requestData) {
	        var _a, _b, _c;
	        return __awaiter(this, void 0, void 0, function* () {
	            const response = yield cross_fetch_1.default(`${this._endpoint}${route}`, {
	                method,
	                headers: {
	                    "Content-Type": "application/octet-stream"
	                },
	                body: requestData
	            });
	            let responseData;
	            if (response.ok) {
	                if (method === "get") {
	                    return Buffer.from(yield response.arrayBuffer());
	                }
	                responseData = yield response.json();
	                if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
	                    return responseData === null || responseData === void 0 ? void 0 : responseData.data;
	                }
	            }
	            if (!responseData) {
	                responseData = yield response.json();
	            }
	            throw new clientError.ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
	        });
	    }
	}
	exports.SingleNodeClient = SingleNodeClient;

	});

	var blake2b = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Blake2b = void 0;

	/**
	 * Class to help with Blake2B Signature scheme.
	 */
	class Blake2b {
	    /**
	     * Perform Sum 256 on the data.
	     * @param data The data to operate on.
	     * @returns The sum 256 of the data.
	     */
	    static sum256(data) {
	        return Buffer.from(blakejs_1__default['default'].blake2b(data, undefined, Blake2b.SIZE_256));
	    }
	}
	exports.Blake2b = Blake2b;
	/**
	 * Blake2b 256.
	 */
	Blake2b.SIZE_256 = 32;

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
	const nacl = __importStar(require$$0__default$1['default']);

	/**
	 * Class to help with Ed25519 Signature scheme.
	 */
	class Ed25519 {
	    /**
	     * Privately sign the data.
	     * @param privateKey The private key to sign with.
	     * @param data The data to sign.
	     * @returns The signature.
	     */
	    static signData(privateKey, data) {
	        return Buffer.from(nacl.sign.detached(data, Buffer.from(privateKey, "hex"))).toString("hex");
	    }
	    /**
	     * Use the public key and signature to validate the data.
	     * @param publicKey The public key to verify with.
	     * @param signature The signature to verify.
	     * @param data The data to verify.
	     * @returns True if the data and address is verified.
	     */
	    static verifyData(publicKey, signature, data) {
	        return nacl.sign.detached.verify(data, Buffer.from(signature, "hex"), Buffer.from(publicKey, "hex"));
	    }
	    /**
	     * Convert the public key to an address.
	     * @param publicKey The public key to convert.
	     * @returns The address.
	     */
	    static publicKeyToAddress(publicKey) {
	        return blake2b.Blake2b.sum256(Buffer.from(publicKey, "hex")).toString("hex");
	    }
	    /**
	     * Use the public key to validate the address.
	     * @param publicKey The public key to verify with.
	     * @param address The address to verify.
	     * @returns True if the data and address is verified.
	     */
	    static verifyAddress(publicKey, address) {
	        const addressFromPublicKey = Ed25519.publicKeyToAddress(publicKey);
	        return addressFromPublicKey === address;
	    }
	}
	exports.Ed25519 = Ed25519;
	/**
	 * Version for signature scheme.
	 */
	Ed25519.VERSION = 1;
	/**
	 * Public Key size.
	 */
	Ed25519.PUBLIC_KEY_SIZE = 32;
	/**
	 * Signature size for signing scheme.
	 */
	Ed25519.SIGNATURE_SIZE = 64;
	/**
	 * Address size.
	 */
	Ed25519.ADDRESS_LENGTH = blake2b.Blake2b.SIZE_256;

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
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeAddress(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_ADDRESS_LENGTH)) {
	        throw new Error(`Address data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_ADDRESS_LENGTH}`);
	    }
	    const type = readBuffer.readByte("address.type", false);
	    let address;
	    if (type === 1) {
	        address = deserializeEd25519Address(readBuffer);
	    }
	    else {
	        throw new Error(`Unrecognized address type ${type}`);
	    }
	    return address;
	}
	exports.deserializeAddress = deserializeAddress;
	/**
	 * Serialize the address to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeAddress(writeBuffer, object) {
	    if (object.type === 1) {
	        serializeEd25519Address(writeBuffer, object);
	    }
	    else {
	        throw new Error(`Unrecognized address type ${object.type}`);
	    }
	}
	exports.serializeAddress = serializeAddress;
	/**
	 * Deserialize the Ed25519 address from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeEd25519Address(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_ED25519_ADDRESS_LENGTH)) {
	        throw new Error(`Ed25519 address data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_ED25519_ADDRESS_LENGTH}`);
	    }
	    const type = readBuffer.readByte("ed25519Address.type");
	    if (type !== 1) {
	        throw new Error(`Type mismatch in ed25519Address ${type}`);
	    }
	    const address = readBuffer.readFixedBufferHex("ed25519Address.address", ed25519.Ed25519.ADDRESS_LENGTH);
	    return {
	        type,
	        address
	    };
	}
	exports.deserializeEd25519Address = deserializeEd25519Address;
	/**
	 * Serialize the ed25519 address to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeEd25519Address(writeBuffer, object) {
	    writeBuffer.writeByte("ed25519Address.type", object.type);
	    writeBuffer.writeFixedBufferHex("ed25519Address.address", ed25519.Ed25519.ADDRESS_LENGTH, object.address);
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
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeInputs(readBuffer) {
	    const numInputs = readBuffer.readUInt16("inputs.numInputs");
	    const inputs = [];
	    for (let i = 0; i < numInputs; i++) {
	        inputs.push(deserializeInput(readBuffer));
	    }
	    return inputs;
	}
	exports.deserializeInputs = deserializeInputs;
	/**
	 * Serialize the inputs to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param objects The objects to serialize.
	 */
	function serializeInputs(writeBuffer, objects) {
	    writeBuffer.writeUInt16("inputs.numInputs", objects.length);
	    for (let i = 0; i < objects.length; i++) {
	        serializeInput(writeBuffer, objects[i]);
	    }
	}
	exports.serializeInputs = serializeInputs;
	/**
	 * Deserialize the input from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeInput(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_INPUT_LENGTH)) {
	        throw new Error(`Input data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_INPUT_LENGTH}`);
	    }
	    const type = readBuffer.readByte("input.type", false);
	    let input;
	    if (type === 0) {
	        input = deserializeUTXOInput(readBuffer);
	    }
	    else {
	        throw new Error(`Unrecognized input type ${type}`);
	    }
	    return input;
	}
	exports.deserializeInput = deserializeInput;
	/**
	 * Serialize the input to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeInput(writeBuffer, object) {
	    if (object.type === 0) {
	        serializeUTXOInput(writeBuffer, object);
	    }
	    else {
	        throw new Error(`Unrecognized input type ${object.type}`);
	    }
	}
	exports.serializeInput = serializeInput;
	/**
	 * Deserialize the utxo input from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeUTXOInput(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_UTXO_INPUT_LENGTH)) {
	        throw new Error(`UTXO Input data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_UTXO_INPUT_LENGTH}`);
	    }
	    const type = readBuffer.readByte("utxoInput.type");
	    if (type !== 0) {
	        throw new Error(`Type mismatch in utxoInput ${type}`);
	    }
	    const transactionId = readBuffer.readFixedBufferHex("utxoInput.transactionId", common.TRANSACTION_ID_LENGTH);
	    const transactionOutputIndex = readBuffer.readUInt16("utxoInput.transactionOutputIndex");
	    return {
	        type,
	        transactionId,
	        transactionOutputIndex
	    };
	}
	exports.deserializeUTXOInput = deserializeUTXOInput;
	/**
	 * Serialize the utxo input to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeUTXOInput(writeBuffer, object) {
	    writeBuffer.writeByte("utxoInput.type", object.type);
	    writeBuffer.writeFixedBufferHex("utxoInput.transactionId", common.TRANSACTION_ID_LENGTH, object.transactionId);
	    writeBuffer.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
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
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeOutputs(readBuffer) {
	    const numOutputs = readBuffer.readUInt16("outputs.numOutputs");
	    const inputs = [];
	    for (let i = 0; i < numOutputs; i++) {
	        inputs.push(deserializeOutput(readBuffer));
	    }
	    return inputs;
	}
	exports.deserializeOutputs = deserializeOutputs;
	/**
	 * Serialize the outputs to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param objects The objects to serialize.
	 */
	function serializeOutputs(writeBuffer, objects) {
	    writeBuffer.writeUInt16("outputs.numOutputs", objects.length);
	    for (let i = 0; i < objects.length; i++) {
	        serializeOutput(writeBuffer, objects[i]);
	    }
	}
	exports.serializeOutputs = serializeOutputs;
	/**
	 * Deserialize the output from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeOutput(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_OUTPUT_LENGTH)) {
	        throw new Error(`Output data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_OUTPUT_LENGTH}`);
	    }
	    const type = readBuffer.readByte("output.type", false);
	    let input;
	    if (type === 0) {
	        input = deserializeSigLockedSingleOutput(readBuffer);
	    }
	    else {
	        throw new Error(`Unrecognized output type ${type}`);
	    }
	    return input;
	}
	exports.deserializeOutput = deserializeOutput;
	/**
	 * Serialize the output to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeOutput(writeBuffer, object) {
	    if (object.type === 0) {
	        serializeSigLockedSingleOutput(writeBuffer, object);
	    }
	    else {
	        throw new Error(`Unrecognized output type ${object.type}`);
	    }
	}
	exports.serializeOutput = serializeOutput;
	/**
	 * Deserialize the signature locked single output from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeSigLockedSingleOutput(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_SIG_LOCKED_OUTPUT_LENGTH)) {
	        throw new Error(`Signature Locked Single Output data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_SIG_LOCKED_OUTPUT_LENGTH}`);
	    }
	    const type = readBuffer.readByte("sigLockedSingleOutput.type");
	    if (type !== 0) {
	        throw new Error(`Type mismatch in sigLockedSingleOutput ${type}`);
	    }
	    const address$1 = address.deserializeAddress(readBuffer);
	    const amount = readBuffer.readUInt64("sigLockedSingleOutput.amount");
	    return {
	        type,
	        address: address$1,
	        amount: Number(amount)
	    };
	}
	exports.deserializeSigLockedSingleOutput = deserializeSigLockedSingleOutput;
	/**
	 * Serialize the signature locked single output to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeSigLockedSingleOutput(writeBuffer, object) {
	    writeBuffer.writeByte("sigLockedSingleOutput.type", object.type);
	    address.serializeAddress(writeBuffer, object.address);
	    writeBuffer.writeUInt64("sigLockedSingleOutput.amount", BigInt(object.amount));
	}
	exports.serializeSigLockedSingleOutput = serializeSigLockedSingleOutput;

	});

	var transaction = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.serializeTransactionEssence = exports.deserializeTransactionEssence = exports.MIN_TRANSACTION_ESSENCE_LENGTH = void 0;




	exports.MIN_TRANSACTION_ESSENCE_LENGTH = common.UINT32_SIZE + (2 * common.ARRAY_LENGTH) + common.UINT32_SIZE;
	/**
	 * Deserialize the transaction essence from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeTransactionEssence(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_TRANSACTION_ESSENCE_LENGTH)) {
	        throw new Error(`Transaction essence data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_TRANSACTION_ESSENCE_LENGTH}`);
	    }
	    const type = readBuffer.readUInt32("transactionEssence.type");
	    if (type !== 0) {
	        throw new Error(`Type mismatch in transactionEssence ${type}`);
	    }
	    const inputs = input.deserializeInputs(readBuffer);
	    const outputs = output.deserializeOutputs(readBuffer);
	    const payload$1 = payload.deserializePayload(readBuffer);
	    if (payload$1 && payload$1.type !== 2) {
	        throw new Error("Transaction essence can only contain embedded Indexation Payload");
	    }
	    return {
	        type,
	        inputs,
	        outputs,
	        payload: payload$1
	    };
	}
	exports.deserializeTransactionEssence = deserializeTransactionEssence;
	/**
	 * Serialize the transaction essence to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeTransactionEssence(writeBuffer, object) {
	    writeBuffer.writeUInt32("transactionEssence.type", object.type);
	    input.serializeInputs(writeBuffer, object.inputs);
	    output.serializeOutputs(writeBuffer, object.outputs);
	    payload.serializePayload(writeBuffer, object.payload);
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
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeSignature(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_SIGNATURE_LENGTH)) {
	        throw new Error(`Signature data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_SIGNATURE_LENGTH}`);
	    }
	    const type = readBuffer.readByte("signature.type", false);
	    let input;
	    if (type === 1) {
	        input = deserializeEd25519Signature(readBuffer);
	    }
	    else {
	        throw new Error(`Unrecognized signature type ${type}`);
	    }
	    return input;
	}
	exports.deserializeSignature = deserializeSignature;
	/**
	 * Serialize the signature to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeSignature(writeBuffer, object) {
	    if (object.type === 1) {
	        serializeEd25519Signature(writeBuffer, object);
	    }
	    else {
	        throw new Error(`Unrecognized signature type ${object.type}`);
	    }
	}
	exports.serializeSignature = serializeSignature;
	/**
	 * Deserialize the Ed25519 signature from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeEd25519Signature(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_ED25519_SIGNATURE_LENGTH)) {
	        throw new Error(`Ed25519 signature data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_ED25519_SIGNATURE_LENGTH}`);
	    }
	    const type = readBuffer.readByte("ed25519Signature.type");
	    if (type !== 1) {
	        throw new Error(`Type mismatch in ed25519Signature ${type}`);
	    }
	    const publicKey = readBuffer.readFixedBufferHex("ed25519Signature.publicKey", ed25519.Ed25519.PUBLIC_KEY_SIZE);
	    const signature = readBuffer.readFixedBufferHex("ed25519Signature.signature", ed25519.Ed25519.SIGNATURE_SIZE);
	    return {
	        type,
	        publicKey,
	        signature
	    };
	}
	exports.deserializeEd25519Signature = deserializeEd25519Signature;
	/**
	 * Serialize the Ed25519 signature to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeEd25519Signature(writeBuffer, object) {
	    writeBuffer.writeByte("ed25519Signature.type", object.type);
	    writeBuffer.writeFixedBufferHex("ed25519Signature.publicKey", ed25519.Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
	    writeBuffer.writeFixedBufferHex("ed25519Signature.signature", ed25519.Ed25519.SIGNATURE_SIZE, object.signature);
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
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeUnlockBlocks(readBuffer) {
	    const numUnlockBlocks = readBuffer.readUInt16("transactionEssence.numUnlockBlocks");
	    const unlockBlocks = [];
	    for (let i = 0; i < numUnlockBlocks; i++) {
	        unlockBlocks.push(deserializeUnlockBlock(readBuffer));
	    }
	    return unlockBlocks;
	}
	exports.deserializeUnlockBlocks = deserializeUnlockBlocks;
	/**
	 * Serialize the unlock blocks to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param objects The objects to serialize.
	 */
	function serializeUnlockBlocks(writeBuffer, objects) {
	    writeBuffer.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);
	    for (let i = 0; i < objects.length; i++) {
	        serializeUnlockBlock(writeBuffer, objects[i]);
	    }
	}
	exports.serializeUnlockBlocks = serializeUnlockBlocks;
	/**
	 * Deserialize the unlock block from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeUnlockBlock(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_UNLOCK_BLOCK_LENGTH)) {
	        throw new Error(`Unlock Block data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_UNLOCK_BLOCK_LENGTH}`);
	    }
	    const type = readBuffer.readByte("unlockBlock.type", false);
	    let unlockBlock;
	    if (type === 0) {
	        unlockBlock = deserializeSignatureUnlockBlock(readBuffer);
	    }
	    else if (type === 1) {
	        unlockBlock = deserializeReferenceUnlockBlock(readBuffer);
	    }
	    else {
	        throw new Error(`Unrecognized unlock block type ${type}`);
	    }
	    return unlockBlock;
	}
	exports.deserializeUnlockBlock = deserializeUnlockBlock;
	/**
	 * Serialize the unlock block to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeUnlockBlock(writeBuffer, object) {
	    if (object.type === 0) {
	        serializeSignatureUnlockBlock(writeBuffer, object);
	    }
	    else if (object.type === 1) {
	        serializeReferenceUnlockBlock(writeBuffer, object);
	    }
	    else {
	        throw new Error(`Unrecognized unlock block type ${object.type}`);
	    }
	}
	exports.serializeUnlockBlock = serializeUnlockBlock;
	/**
	 * Deserialize the signature unlock block from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeSignatureUnlockBlock(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
	        throw new Error(`Signature Unlock Block data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH}`);
	    }
	    const type = readBuffer.readByte("signatureUnlockBlock.type");
	    if (type !== 0) {
	        throw new Error(`Type mismatch in signatureUnlockBlock ${type}`);
	    }
	    const signature$1 = signature.deserializeSignature(readBuffer);
	    return {
	        type,
	        signature: signature$1
	    };
	}
	exports.deserializeSignatureUnlockBlock = deserializeSignatureUnlockBlock;
	/**
	 * Serialize the signature unlock block to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeSignatureUnlockBlock(writeBuffer, object) {
	    writeBuffer.writeByte("signatureUnlockBlock.type", object.type);
	    signature.serializeSignature(writeBuffer, object.signature);
	}
	exports.serializeSignatureUnlockBlock = serializeSignatureUnlockBlock;
	/**
	 * Deserialize the reference unlock block from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeReferenceUnlockBlock(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
	        throw new Error(`Reference Unlock Block data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH}`);
	    }
	    const type = readBuffer.readByte("referenceUnlockBlock.type");
	    if (type !== 1) {
	        throw new Error(`Type mismatch in referenceUnlockBlock ${type}`);
	    }
	    const reference = readBuffer.readUInt16("referenceUnlockBlock.reference");
	    return {
	        type,
	        reference
	    };
	}
	exports.deserializeReferenceUnlockBlock = deserializeReferenceUnlockBlock;
	/**
	 * Serialize the reference unlock block to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeReferenceUnlockBlock(writeBuffer, object) {
	    writeBuffer.writeByte("referenceUnlockBlock.type", object.type);
	    writeBuffer.writeUInt16("referenceUnlockBlock.reference", object.reference);
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
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializePayload(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_PAYLOAD_LENGTH)) {
	        throw new Error(`Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_PAYLOAD_LENGTH}`);
	    }
	    const payloadLength = readBuffer.readUInt32("payload.length");
	    if (!readBuffer.hasRemaining(payloadLength)) {
	        throw new Error(`Payload length ${payloadLength} exceeds the remaining data ${readBuffer.unused()}`);
	    }
	    let payload;
	    if (payloadLength > 0) {
	        const payloadType = readBuffer.readUInt32("payload.type", false);
	        if (payloadType === 0) {
	            payload = deserializeTransactionPayload(readBuffer);
	        }
	        else if (payloadType === 1) {
	            payload = deserializeMilestonePayload(readBuffer);
	        }
	        else if (payloadType === 2) {
	            payload = deserializeIndexationPayload(readBuffer);
	        }
	        else {
	            throw new Error(`Unrecognized payload type ${payloadType}`);
	        }
	    }
	    return payload;
	}
	exports.deserializePayload = deserializePayload;
	/**
	 * Serialize the payload essence to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializePayload(writeBuffer, object) {
	    // Store the location for the payload length and write 0
	    // we will rewind and fill in once the size of the payload is known
	    const payloadLengthWriteIndex = writeBuffer.getWriteIndex();
	    writeBuffer.writeUInt32("payload.length", 0);
	    if (!object) ;
	    else if (object.type === 0) {
	        serializeTransactionPayload(writeBuffer, object);
	    }
	    else if (object.type === 1) {
	        serializeMilestonePayload(writeBuffer, object);
	    }
	    else if (object.type === 2) {
	        serializeIndexationPayload(writeBuffer, object);
	    }
	    else {
	        throw new Error(`Unrecognized transaction type ${object.type}`);
	    }
	    const endOfPayloadWriteIndex = writeBuffer.getWriteIndex();
	    writeBuffer.setWriteIndex(payloadLengthWriteIndex);
	    writeBuffer.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - common.UINT32_SIZE);
	    writeBuffer.setWriteIndex(endOfPayloadWriteIndex);
	}
	exports.serializePayload = serializePayload;
	/**
	 * Deserialize the transaction payload from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeTransactionPayload(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_TRANSACTION_PAYLOAD_LENGTH)) {
	        throw new Error(`Transaction Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_TRANSACTION_PAYLOAD_LENGTH}`);
	    }
	    const type = readBuffer.readUInt32("payloadTransaction.type");
	    if (type !== 0) {
	        throw new Error(`Type mismatch in payloadTransaction ${type}`);
	    }
	    const essenceType = readBuffer.readUInt32("payloadTransaction.essenceType", false);
	    let essence;
	    let unlockBlocks;
	    if (essenceType === 0) {
	        essence = transaction.deserializeTransactionEssence(readBuffer);
	        unlockBlocks = unlockBlock.deserializeUnlockBlocks(readBuffer);
	    }
	    else {
	        throw new Error(`Unrecognized transaction essence type ${type}`);
	    }
	    return {
	        type,
	        essence,
	        unlockBlocks
	    };
	}
	exports.deserializeTransactionPayload = deserializeTransactionPayload;
	/**
	 * Serialize the transaction payload essence to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeTransactionPayload(writeBuffer, object) {
	    writeBuffer.writeUInt32("payloadMilestone.type", object.type);
	    if (object.type === 0) {
	        transaction.serializeTransactionEssence(writeBuffer, object.essence);
	        unlockBlock.serializeUnlockBlocks(writeBuffer, object.unlockBlocks);
	    }
	    else {
	        throw new Error(`Unrecognized transaction type ${object.type}`);
	    }
	}
	exports.serializeTransactionPayload = serializeTransactionPayload;
	/**
	 * Deserialize the milestone payload from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeMilestonePayload(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_MILESTONE_PAYLOAD_LENGTH)) {
	        throw new Error(`Milestone Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_MILESTONE_PAYLOAD_LENGTH}`);
	    }
	    const type = readBuffer.readUInt32("payloadMilestone.type");
	    if (type !== 1) {
	        throw new Error(`Type mismatch in payloadMilestone ${type}`);
	    }
	    const index = readBuffer.readUInt64("payloadMilestone.index");
	    const timestamp = readBuffer.readUInt64("payloadMilestone.timestamp");
	    const inclusionMerkleProof = readBuffer.readFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64);
	    const signaturesCount = readBuffer.readByte("payloadMilestone.signaturesCount");
	    const signatures = [];
	    for (let i = 0; i < signaturesCount; i++) {
	        signatures.push(readBuffer.readFixedBufferHex("payloadMilestone.signature", 64));
	    }
	    return {
	        type,
	        index: Number(index),
	        timestamp: Number(timestamp),
	        inclusionMerkleProof,
	        signatures
	    };
	}
	exports.deserializeMilestonePayload = deserializeMilestonePayload;
	/**
	 * Serialize the milestone payload essence to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeMilestonePayload(writeBuffer, object) {
	    writeBuffer.writeUInt32("payloadMilestone.type", object.type);
	    writeBuffer.writeUInt64("payloadMilestone.index", BigInt(object.index));
	    writeBuffer.writeUInt64("payloadMilestone.timestamp", BigInt(object.timestamp));
	    writeBuffer.writeFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64, object.inclusionMerkleProof);
	    writeBuffer.writeByte("payloadMilestone.signaturesCount", object.signatures.length);
	    for (let i = 0; i < object.signatures.length; i++) {
	        writeBuffer.writeFixedBufferHex("payloadMilestone.signature", 64, object.signatures[i]);
	    }
	}
	exports.serializeMilestonePayload = serializeMilestonePayload;
	/**
	 * Deserialize the indexation payload from binary.
	 * @param readBuffer The buffer to read the data from.
	 * @returns The deserialized object.
	 */
	function deserializeIndexationPayload(readBuffer) {
	    if (!readBuffer.hasRemaining(exports.MIN_INDEXATION_PAYLOAD_LENGTH)) {
	        throw new Error(`Indexation Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_INDEXATION_PAYLOAD_LENGTH}`);
	    }
	    const type = readBuffer.readUInt32("payloadIndexation.type");
	    if (type !== 2) {
	        throw new Error(`Type mismatch in payloadIndexation ${type}`);
	    }
	    const index = readBuffer.readString("payloadIndexation.index");
	    const dataLength = readBuffer.readUInt32("payloadIndexation.dataLength");
	    const data = readBuffer.readFixedBufferHex("payloadIndexation.data", dataLength);
	    return {
	        type: 2,
	        index,
	        data
	    };
	}
	exports.deserializeIndexationPayload = deserializeIndexationPayload;
	/**
	 * Serialize the indexation payload essence to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeIndexationPayload(writeBuffer, object) {
	    writeBuffer.writeUInt32("payloadIndexation.type", object.type);
	    writeBuffer.writeString("payloadIndexation.index", object.index);
	    writeBuffer.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
	    writeBuffer.writeFixedBufferHex("payloadIndexation.data", object.data.length / 2, object.data);
	}
	exports.serializeIndexationPayload = serializeIndexationPayload;

	});

	var message = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.serializeMessage = exports.deserializeMessage = void 0;


	const MIN_MESSAGE_LENGTH = common.BYTE_SIZE +
	    (2 * common.MESSAGE_ID_LENGTH) +
	    payload.MIN_PAYLOAD_LENGTH +
	    common.UINT64_SIZE;
	/**
	 * Deserialize the message from binary.
	 * @param readBuffer The message to deserialize.
	 * @returns The deserialized message.
	 */
	function deserializeMessage(readBuffer) {
	    if (!readBuffer.hasRemaining(MIN_MESSAGE_LENGTH)) {
	        throw new Error(`Message data is ${readBuffer.length()} in length which is less than the minimimum size required of ${MIN_MESSAGE_LENGTH}`);
	    }
	    const version = readBuffer.readByte("message.version");
	    if (version !== 1) {
	        throw new Error(`Unsupported message version number: ${version}`);
	    }
	    const parent1MessageId = readBuffer.readFixedBufferHex("message.parent1MessageId", common.MESSAGE_ID_LENGTH);
	    const parent2MessageId = readBuffer.readFixedBufferHex("message.parent2MessageId", common.MESSAGE_ID_LENGTH);
	    const payload$1 = payload.deserializePayload(readBuffer);
	    const nonce = readBuffer.readUInt64("message.nonce");
	    const unused = readBuffer.unused();
	    if (unused !== 0) {
	        throw new Error(`Message data length ${readBuffer.length()} has unused data ${unused}`);
	    }
	    return {
	        version,
	        payload: payload$1,
	        parent1MessageId,
	        parent2MessageId,
	        nonce: Number(nonce)
	    };
	}
	exports.deserializeMessage = deserializeMessage;
	/**
	 * Serialize the message essence to binary.
	 * @param writeBuffer The buffer to write the data to.
	 * @param object The object to serialize.
	 */
	function serializeMessage(writeBuffer, object) {
	    writeBuffer.writeByte("message.version", object.version);
	    writeBuffer.writeFixedBufferHex("message.parent1MessageId", common.MESSAGE_ID_LENGTH, object.parent1MessageId);
	    writeBuffer.writeFixedBufferHex("message.parent2MessageId", common.MESSAGE_ID_LENGTH, object.parent2MessageId);
	    payload.serializePayload(writeBuffer, object.payload);
	    writeBuffer.writeUInt64("message.nonce", BigInt(object.nonce));
	}
	exports.serializeMessage = serializeMessage;

	});

	var bip32Path = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Bip32Path = void 0;
	/**
	 * Class to help with bip32 paths.
	 */
	class Bip32Path {
	    /**
	     * Create a new instance of Bip32Path.
	     * @param initialPath Initial path to create.
	     */
	    constructor(initialPath) {
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
	    toString() {
	        return this._path.length > 0 ? `m/${this._path.join("/")}` : "m";
	    }
	    /**
	     * Push a new index on to the path.
	     * @param index The index to add to the path.
	     */
	    push(index) {
	        this._path.push(`${index}`);
	    }
	    /**
	     * Push a new hardened index on to the path.
	     * @param index The index to add to the path.
	     */
	    pushHardened(index) {
	        this._path.push(`${index}'`);
	    }
	    /**
	     * Pop an index from the path.
	     */
	    pop() {
	        this._path.pop();
	    }
	    /**
	     * Get the segments.
	     * @returns The segments as numbers.
	     */
	    numberSegments() {
	        return this._path.map(p => Number.parseInt(p, 10));
	    }
	}
	exports.Bip32Path = Bip32Path;

	});

	var createHmac = require$$0__default$2['default'].createHmac;

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
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Slip0010 = void 0;
	const create_hmac_1 = __importDefault(createHmac);
	const nacl = __importStar(require$$0__default$1['default']);
	/**
	 * Class to help with slip0010 key derivation.
	 * https://github.com/satoshilabs/slips/blob/master/slip-0010.md
	 */
	class Slip0010 {
	    /**
	     * Get the master key from the seed.
	     * @param seed The seed to generate the master key from.
	     * @returns The key and chain code.
	     */
	    static getMasterKeyFromSeed(seed) {
	        const hmac = create_hmac_1.default("sha512", "ed25519 seed");
	        const fullKey = hmac.update(seed).digest();
	        return {
	            privateKey: fullKey.slice(0, 32),
	            chainCode: fullKey.slice(32)
	        };
	    }
	    /**
	     * Derive a key from the path.
	     * @param seed The seed.
	     * @param path The path.
	     * @returns The key and chain code.
	     */
	    static derivePath(seed, path) {
	        let { privateKey, chainCode } = Slip0010.getMasterKeyFromSeed(seed);
	        const segments = path.numberSegments();
	        for (let i = 0; i < segments.length; i++) {
	            const indexBuffer = Buffer.allocUnsafe(4);
	            indexBuffer.writeUInt32BE(0x80000000 + segments[i], 0);
	            const data = Buffer.concat([Buffer.alloc(1, 0), privateKey, indexBuffer]);
	            const fullKey = create_hmac_1.default("sha512", chainCode)
	                .update(data)
	                .digest();
	            privateKey = fullKey.slice(0, 32);
	            chainCode = fullKey.slice(32);
	        }
	        return {
	            privateKey,
	            chainCode
	        };
	    }
	    /**
	     * Get the public key from the private key.
	     * @param privateKey The private key.
	     * @param withZeroByte Include a zero bute prefix.
	     * @returns The public key.
	     */
	    static getPublicKey(privateKey, withZeroByte = true) {
	        const keyPair = nacl.sign.keyPair.fromSeed(privateKey);
	        const signPk = Buffer.from(keyPair.secretKey.slice(32));
	        return withZeroByte
	            ? Buffer.concat([Buffer.alloc(1, 0), signPk])
	            : signPk;
	    }
	}
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
	const nacl = __importStar(require$$0__default$1['default']);

	/**
	 * Class to help with seeds.
	 */
	class Ed25519Seed {
	    constructor() {
	        /**
	         * The secret key for the seed.
	         */
	        this._secretKey = Buffer.alloc(0);
	    }
	    /**
	     * Create a seed from the bytes.
	     * @param buffer The binary representation of the seed.
	     * @returns The seed.
	     */
	    static fromBytes(buffer) {
	        const seed = new Ed25519Seed();
	        seed._secretKey = buffer;
	        return seed;
	    }
	    /**
	     * Create a seed from the hex string.
	     * @param hex The hex representation of the seed.
	     * @returns The seed.
	     */
	    static fromString(hex) {
	        const seed = new Ed25519Seed();
	        seed._secretKey = Buffer.from(hex, "hex");
	        return seed;
	    }
	    /**
	     * Generate a new random seed.
	     * @returns The random seed.
	     */
	    static random() {
	        return Ed25519Seed.fromBytes(Buffer.from(nacl.randomBytes(Ed25519Seed.SEED_SIZE_BYTES)));
	    }
	    /**
	     * Get the key pair from the seed.
	     * @returns The key pair.
	     */
	    keyPair() {
	        const signKeyPair = nacl.sign.keyPair.fromSeed(this._secretKey);
	        return {
	            publicKey: Buffer.from(signKeyPair.publicKey).toString("hex"),
	            privateKey: Buffer.from(signKeyPair.secretKey).toString("hex")
	        };
	    }
	    /**
	     * Generate a new seed from the path.
	     * @param path The path to generate the seed for.
	     * @returns The generated seed.
	     */
	    generateSeedFromPath(path) {
	        const keys = slip0010.Slip0010.derivePath(this._secretKey, path);
	        return Ed25519Seed.fromBytes(keys.privateKey);
	    }
	    /**
	     * Return the key as bytes.
	     * @returns The key as bytes.
	     */
	    toBytes() {
	        return this._secretKey;
	    }
	    /**
	     * Return the key as string.
	     * @returns The key as string.
	     */
	    toString() {
	        return this._secretKey.toString("hex");
	    }
	}
	exports.Ed25519Seed = Ed25519Seed;
	/**
	 * SeedSize is the size, in bytes, of private key seeds.
	 */
	Ed25519Seed.SEED_SIZE_BYTES = 32;

	});

	var common$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DEFAULT_CHUNK_SIZE = void 0;
	exports.DEFAULT_CHUNK_SIZE = 20;

	});

	var getAddressBalances_1 = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getAddressBalances = void 0;
	/**
	 * Get the balance for a list of addresses.
	 * @param client The client to send the transfer with.
	 * @param addresses The list of addresses to get the balance for.
	 * @returns The balances.
	 */
	function getAddressBalances(client, addresses) {
	    return __awaiter(this, void 0, void 0, function* () {
	        const balances = [];
	        for (const address of addresses) {
	            const addressOutputIds = yield client.addressOutputs(address);
	            let balance = 0;
	            for (const addressOutputId of addressOutputIds.outputIds) {
	                const addressOutput = yield client.output(addressOutputId);
	                if (!addressOutput.isSpent) {
	                    balance += addressOutput.output.amount;
	                }
	            }
	            balances.push(balance);
	        }
	        return balances;
	    });
	}
	exports.getAddressBalances = getAddressBalances;

	});

	var getAddressesKeyPairs_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getAddressesKeyPairs = void 0;

	/**
	 * Generate a list of address key pairs.
	 * @param seed The seed.
	 * @param basePath The base path to start looking for addresses.
	 * @param startIndex The start index to generate from, defaults to 0.
	 * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
	 * @returns A list of the signature key pairs for the addresses.
	 */
	function getAddressesKeyPairs(seed, basePath, startIndex = 0, count = common$1.DEFAULT_CHUNK_SIZE) {
	    const keyPairs = [];
	    for (let i = startIndex; i < startIndex + count; i++) {
	        basePath.push(i);
	        const newSeed = seed.generateSeedFromPath(basePath);
	        keyPairs.push(newSeed.keyPair());
	        basePath.pop();
	    }
	    return keyPairs;
	}
	exports.getAddressesKeyPairs = getAddressesKeyPairs;

	});

	var getAddresses_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getAddresses = void 0;



	/**
	 * Generate a list of address key pairs.
	 * @param seed The seed.
	 * @param basePath The base path to start looking for addresses.
	 * @param startIndex The start index to generate from, defaults to 0.
	 * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
	 * @returns A list of the signature key pairs for the addresses.
	 */
	function getAddresses(seed, basePath, startIndex = 0, count = common$1.DEFAULT_CHUNK_SIZE) {
	    return getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, startIndex, count).map(kp => ed25519.Ed25519.publicKeyToAddress(kp.publicKey));
	}
	exports.getAddresses = getAddresses;

	});

	var getAllUnspentAddresses_1 = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getAllUnspentAddresses = void 0;



	/**
	 * Get all the unspent addresses.
	 * @param client The client to send the transfer with.
	 * @param seed The seed to use for address generation.
	 * @param basePath The base path to start looking for addresses.
	 * @param startIndex Optional start index for the wallet count address, defaults to 0.
	 * @returns All the unspent addresses.
	 */
	function getAllUnspentAddresses(client, seed, basePath, startIndex) {
	    return __awaiter(this, void 0, void 0, function* () {
	        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
	        let finished = false;
	        const allUnspent = [];
	        do {
	            const addresses = getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, localStartIndex, common$1.DEFAULT_CHUNK_SIZE);
	            for (let i = 0; i < addresses.length; i++) {
	                const addr = ed25519.Ed25519.publicKeyToAddress(addresses[i].publicKey);
	                const addressOutputIds = yield client.addressOutputs(addr);
	                let amount = 0;
	                for (const addressOutputId of addressOutputIds.outputIds) {
	                    const addressOutput = yield client.output(addressOutputId);
	                    if (!addressOutput.isSpent && addressOutput.output.amount !== 0) {
	                        amount += addressOutput.output.amount;
	                    }
	                }
	                if (amount === 0) {
	                    finished = true;
	                }
	                else {
	                    allUnspent.push({
	                        address: addr,
	                        index: localStartIndex + i,
	                        amount
	                    });
	                }
	            }
	            localStartIndex += common$1.DEFAULT_CHUNK_SIZE;
	        } while (!finished);
	        return allUnspent;
	    });
	}
	exports.getAllUnspentAddresses = getAllUnspentAddresses;

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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getBalance = void 0;



	/**
	 * Get the balance for the address.
	 * @param client The client to send the transfer with.
	 * @param seed The seed to use for address generation.
	 * @param basePath The base path to start looking for addresses.
	 * @param startIndex Optional start index for the wallet count address, defaults to 0.
	 * @returns The balance.
	 */
	function getBalance(client, seed, basePath, startIndex) {
	    return __awaiter(this, void 0, void 0, function* () {
	        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
	        let finished = false;
	        let balance = 0;
	        do {
	            const addresses = getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, localStartIndex, common$1.DEFAULT_CHUNK_SIZE);
	            for (let i = 0; i < addresses.length; i++) {
	                const addr = ed25519.Ed25519.publicKeyToAddress(addresses[i].publicKey);
	                const addressOutputIds = yield client.addressOutputs(addr);
	                if (addressOutputIds.outputIds.length === 0) {
	                    finished = true;
	                }
	                else {
	                    for (const addressOutputId of addressOutputIds.outputIds) {
	                        const addressOutput = yield client.output(addressOutputId);
	                        if (addressOutput.output.amount === 0) {
	                            finished = true;
	                        }
	                        else if (!addressOutput.isSpent) {
	                            balance += addressOutput.output.amount;
	                        }
	                    }
	                }
	            }
	            localStartIndex += common$1.DEFAULT_CHUNK_SIZE;
	        } while (!finished);
	        return balance;
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
	    return __awaiter(this, void 0, void 0, function* () {
	        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
	        let finished = false;
	        let unspentAddress;
	        let unspentAddressIndex;
	        let unspentAmount = 0;
	        do {
	            const addresses = getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, localStartIndex, common$1.DEFAULT_CHUNK_SIZE);
	            for (let i = 0; i < addresses.length; i++) {
	                const addr = ed25519.Ed25519.publicKeyToAddress(addresses[i].publicKey);
	                const addressOutputIds = yield client.addressOutputs(addr);
	                if (addressOutputIds.outputIds.length === 0) {
	                    finished = true;
	                }
	                else {
	                    for (const addressOutputId of addressOutputIds.outputIds) {
	                        const addressOutput = yield client.output(addressOutputId);
	                        if (addressOutput.output.amount === 0) {
	                            finished = true;
	                        }
	                        else if (!addressOutput.isSpent) {
	                            unspentAddress = addr;
	                            unspentAddressIndex = localStartIndex + i;
	                            unspentAmount += addressOutput.output.amount;
	                        }
	                    }
	                }
	                if (unspentAddress) {
	                    finished = true;
	                }
	            }
	            localStartIndex += common$1.DEFAULT_CHUNK_SIZE;
	        } while (!finished);
	        return unspentAddress && unspentAddressIndex !== undefined ? {
	            address: unspentAddress,
	            index: unspentAddressIndex,
	            amount: unspentAmount
	        } : undefined;
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.retrieveData = void 0;
	/**
	 * Retrieve a data message.
	 * @param client The client to send the transfer with.
	 * @param messageId The message id of the data to get.
	 * @returns The message index and data.
	 */
	function retrieveData(client, messageId) {
	    return __awaiter(this, void 0, void 0, function* () {
	        const message = yield client.message(messageId);
	        if (message === null || message === void 0 ? void 0 : message.payload) {
	            let indexationPayload;
	            if (message.payload.type === 0) {
	                indexationPayload = message.payload.essence.payload;
	            }
	            else if (message.payload.type === 2) {
	                indexationPayload = message.payload;
	            }
	            if (indexationPayload) {
	                return {
	                    index: indexationPayload.index,
	                    data: Buffer.from(indexationPayload.data, "hex")
	                };
	            }
	        }
	    });
	}
	exports.retrieveData = retrieveData;

	});

	var writeBuffer = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WriteBuffer = void 0;

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
	        if (!common.isHex(val)) {
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sendAdvanced = void 0;







	/**
	 * Send a transfer from the balance on the seed.
	 * @param client The client to send the transfer with.
	 * @param seed The seed to use for address generation.
	 * @param basePath The base path to start looking for addresses.
	 * @param outputs The outputs to send.
	 * @param startIndex Optional start index for the wallet count address, defaults to 0.
	 * @param index Optional indexation name.
	 * @param data Optional index data.
	 * @returns The id of the message created and the remainder address if one was needed.
	 */
	function sendAdvanced(client, seed, basePath, outputs, startIndex, index, data) {
	    return __awaiter(this, void 0, void 0, function* () {
	        if (!outputs || outputs.length === 0) {
	            throw new Error("You must specify some outputs");
	        }
	        const requiredBalance = outputs.reduce((total, output) => total + output.amount, 0);
	        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
	        let consumedBalance = 0;
	        const inputsAndSignatureKeyPairs = [];
	        let finished = false;
	        let remainderKeyPair;
	        do {
	            const addresses = getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, localStartIndex, common$1.DEFAULT_CHUNK_SIZE);
	            for (const address of addresses) {
	                const addressOutputIds = yield client.addressOutputs(ed25519.Ed25519.publicKeyToAddress(address.publicKey));
	                if (addressOutputIds.outputIds.length === 0) {
	                    finished = true;
	                    remainderKeyPair = address;
	                }
	                else {
	                    for (const addressOutputId of addressOutputIds.outputIds) {
	                        const addressOutput = yield client.output(addressOutputId);
	                        if (addressOutput.isSpent) {
	                            if (addressOutput.output.amount !== 0) {
	                                throw new Error("Spent address");
	                            }
	                        }
	                        else if (addressOutput.output.amount !== 0) {
	                            if (consumedBalance < requiredBalance) {
	                                consumedBalance += addressOutput.output.amount;
	                                const input$1 = {
	                                    type: 0,
	                                    transactionId: addressOutput.transactionId,
	                                    transactionOutputIndex: addressOutput.outputIndex
	                                };
	                                const writeBuffer$1 = new writeBuffer.WriteBuffer();
	                                input.serializeInput(writeBuffer$1, input$1);
	                                inputsAndSignatureKeyPairs.push({
	                                    input: input$1,
	                                    addressKeyPair: address,
	                                    serialized: writeBuffer$1.finalBuffer().toString("hex")
	                                });
	                            }
	                        }
	                    }
	                }
	            }
	            localStartIndex += common$1.DEFAULT_CHUNK_SIZE;
	        } while (!finished);
	        if (consumedBalance < requiredBalance) {
	            throw new Error("There are not enough funds in the inputs for the required balance");
	        }
	        // We have consumed more than we need to so add a remainder output
	        // back to the address from the seed that didn't have any outputs or balance
	        let remainderAddress;
	        if (requiredBalance < consumedBalance && remainderKeyPair) {
	            remainderAddress = ed25519.Ed25519.publicKeyToAddress(remainderKeyPair.publicKey);
	            outputs.push({
	                amount: consumedBalance - requiredBalance,
	                address: remainderAddress
	            });
	        }
	        const outputsWithSerialization = [];
	        for (const output$1 of outputs) {
	            const sigLockedOutput = {
	                type: 0,
	                address: {
	                    type: 1,
	                    address: output$1.address
	                },
	                amount: output$1.amount
	            };
	            const writeBuffer$1 = new writeBuffer.WriteBuffer();
	            output.serializeOutput(writeBuffer$1, sigLockedOutput);
	            outputsWithSerialization.push({
	                output: sigLockedOutput,
	                serialized: writeBuffer$1.finalBuffer().toString("hex")
	            });
	        }
	        // Lexigraphically sort the inputs and outputs
	        const sortedInputs = inputsAndSignatureKeyPairs.sort((a, b) => a.serialized.localeCompare(b.serialized));
	        const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serialized.localeCompare(b.serialized));
	        const transactionEssence = {
	            type: 0,
	            inputs: sortedInputs.map(i => i.input),
	            outputs: sortedOutputs.map(o => o.output),
	            payload: index && data
	                ? {
	                    type: 2,
	                    index,
	                    data: data.toString("hex")
	                }
	                : undefined
	        };
	        const binaryEssenceBuffer = new writeBuffer.WriteBuffer();
	        transaction.serializeTransactionEssence(binaryEssenceBuffer, transactionEssence);
	        const essenceFinalBuffer = binaryEssenceBuffer.finalBuffer();
	        // Create the unlock blocks
	        const unlockBlocks = [];
	        const addressToUnlockBlock = {};
	        for (const input of sortedInputs) {
	            if (addressToUnlockBlock[input.addressKeyPair.publicKey]) {
	                unlockBlocks.push({
	                    type: 1,
	                    reference: addressToUnlockBlock[input.addressKeyPair.publicKey].unlockIndex
	                });
	            }
	            else {
	                unlockBlocks.push({
	                    type: 0,
	                    signature: {
	                        type: 1,
	                        publicKey: input.addressKeyPair.publicKey,
	                        signature: ed25519.Ed25519.signData(input.addressKeyPair.privateKey, essenceFinalBuffer)
	                    }
	                });
	                addressToUnlockBlock[input.addressKeyPair.publicKey] = {
	                    keyPair: input.addressKeyPair,
	                    unlockIndex: unlockBlocks.length - 1
	                };
	            }
	        }
	        const transactionPayload = {
	            type: 0,
	            essence: transactionEssence,
	            unlockBlocks
	        };
	        const tips = yield client.tips();
	        const message = {
	            version: 1,
	            parent1MessageId: tips.tip1MessageId,
	            parent2MessageId: tips.tip2MessageId,
	            payload: transactionPayload,
	            nonce: 0
	        };
	        const messageId = yield client.messageSubmit(message);
	        return {
	            messageId,
	            message,
	            remainderAddress
	        };
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
	    return __awaiter(this, void 0, void 0, function* () {
	        const response = yield sendAdvanced_1.sendAdvanced(client, seed, basePath, [{ address, amount }], startIndex);
	        return {
	            messageId: response.messageId,
	            message: response.message
	        };
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sendData = void 0;
	/**
	 * Send a data message.
	 * @param client The client to send the transfer with.
	 * @param index The index name.
	 * @param data The index data.
	 * @returns The id of the message created and the message.
	 */
	function sendData(client, index, data) {
	    return __awaiter(this, void 0, void 0, function* () {
	        const indexationPayload = {
	            type: 2,
	            index,
	            data: data.toString("hex")
	        };
	        const tips = yield client.tips();
	        const message = {
	            version: 1,
	            parent1MessageId: tips.tip1MessageId,
	            parent2MessageId: tips.tip2MessageId,
	            payload: indexationPayload,
	            nonce: 0
	        };
	        const messageId = yield client.messageSubmit(message);
	        return {
	            message,
	            messageId
	        };
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
	let logger = (message, data) => console.log(message, data);
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
	    logger(`${prefix}\tVersion:`, message.version);
	    logger(`${prefix}\tParent 1 Message Id:`, message.parent1MessageId);
	    logger(`${prefix}\tParent 2 Message Id:`, message.parent2MessageId);
	    logPayload(`${prefix}\t`, message.payload);
	    if (message.nonce !== undefined) {
	        logger(`${prefix}\tNonce:`, message.nonce);
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
	            const payload = unknownPayload;
	            logger(`${prefix}Transaction Payload`);
	            if (payload.essence.type === 0) {
	                if (payload.essence.inputs) {
	                    logger(`${prefix}\tInputs:`, payload.essence.inputs.length);
	                    for (const input of payload.essence.inputs) {
	                        logInput(`${prefix}\t\t`, input);
	                    }
	                }
	                if (payload.essence.outputs) {
	                    logger(`${prefix}\tOutputs:`, payload.essence.outputs.length);
	                    for (const output of payload.essence.outputs) {
	                        logOutput(`${prefix}\t\t`, output);
	                    }
	                }
	                logPayload(`${prefix}\t`, payload.essence.payload);
	            }
	            if (payload.unlockBlocks) {
	                logger(`${prefix}\tUnlock Blocks:`, payload.unlockBlocks.length);
	                for (const unlockBlock of payload.unlockBlocks) {
	                    logUnlockBlock(`${prefix}\t\t`, unlockBlock);
	                }
	            }
	        }
	        else if (unknownPayload.type === 1) {
	            const payload = unknownPayload;
	            logger(`${prefix}Milestone Payload`);
	            logger(`${prefix}\tIndex:`, payload.index);
	            logger(`${prefix}\tTimestamp:`, payload.timestamp);
	            logger(`${prefix}\tInclusion Merkle Proof:`, payload.inclusionMerkleProof);
	            logger(`${prefix}\tSignatures:`, payload.signatures);
	        }
	        else if (unknownPayload.type === 2) {
	            const payload = unknownPayload;
	            logger(`${prefix}Indexation Payload`);
	            logger(`${prefix}\tIndex:`, payload.index);
	            logger(`${prefix}\tData:`, Buffer.from(payload.data, "hex").toString());
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
	            const address = unknownAddress;
	            logger(`${prefix}Ed25519 Address`);
	            logger(`${prefix}\tAddress:`, address.address);
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
	            const signature = unknownSignature;
	            logger(`${prefix}Ed25519 Signature`);
	            logger(`${prefix}\tPublic Key:`, signature.publicKey);
	            logger(`${prefix}\tSignature:`, signature.signature);
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
	            const input = unknownInput;
	            logger(`${prefix}UTXO Input`);
	            logger(`${prefix}\tTransaction Id:`, input.transactionId);
	            logger(`${prefix}\tTransaction Output Index:`, input.transactionOutputIndex);
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
	            const output = unknownOutput;
	            logger(`${prefix}Signature Locked Single Output`);
	            logAddress(`${prefix}\t\t`, output.address);
	            logger(`${prefix}\t\tAmount:`, output.amount);
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
	            const unlockBlock = unknownUnlockBlock;
	            logger(`${prefix}\tSignature Unlock Block`);
	            logSignature(`${prefix}\t\t\t`, unlockBlock.signature);
	        }
	        else if (unknownUnlockBlock.type === 1) {
	            const unlockBlock = unknownUnlockBlock;
	            logger(`${prefix}\tReference Unlock Block`);
	            logger(`${prefix}\t\tReference:`, unlockBlock.reference);
	        }
	    }
	}
	exports.logUnlockBlock = logUnlockBlock;

	});

	var readBuffer = createCommonjsModule(function (module, exports) {
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
	        let val;
	        if (this._buffer.readBigUInt64LE) {
	            val = this._buffer.readBigUInt64LE(this._readIndex);
	        }
	        else {
	            // Polyfill if buffer has no bigint support
	            const buffer = this._buffer.slice(this._readIndex, this._readIndex + 8);
	            buffer.reverse();
	            val = BigInt(`0x${buffer.toString("hex")}`);
	        }
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
	exports.Buffer = void 0;

	Object.defineProperty(exports, "Buffer", { enumerable: true, get: function () { return buffer_1__default['default'].Buffer; } });
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
	__exportStar(singleNodeClient, exports);
	__exportStar(address, exports);
	__exportStar(common, exports);
	__exportStar(input, exports);
	__exportStar(message, exports);
	__exportStar(output, exports);
	__exportStar(payload, exports);
	__exportStar(signature, exports);
	__exportStar(transaction, exports);
	__exportStar(unlockBlock, exports);
	__exportStar(bip32Path, exports);
	__exportStar(blake2b, exports);
	__exportStar(ed25519, exports);
	__exportStar(ed25519Seed, exports);
	__exportStar(slip0010, exports);
	__exportStar(common$1, exports);
	__exportStar(getAddressBalances_1, exports);
	__exportStar(getAddresses_1, exports);
	__exportStar(getAddressesKeyPairs_1, exports);
	__exportStar(getAllUnspentAddresses_1, exports);
	__exportStar(getBalance_1, exports);
	__exportStar(getUnspentAddress_1, exports);
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
	__exportStar(logging, exports);
	__exportStar(readBuffer, exports);
	__exportStar(writeBuffer, exports);

	});

	var index = /*@__PURE__*/getDefaultExportFromCjs(es);

	return index;

})));
