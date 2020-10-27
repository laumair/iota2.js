**[@iota/iota2.js](../README.md)**

> [Globals](../README.md) / Sha3

# Class: Sha3

Keccak implementation based on the following.
https://keccak.team/keccak_specs_summary.html
https://github.com/emn178/js-sha3

## Hierarchy

* **Sha3**

## Index

### Constructors

* [constructor](sha3.md#constructor)

### Methods

* [digest](sha3.md#digest)
* [reset](sha3.md#reset)
* [update](sha3.md#update)
* [keccak](sha3.md#keccak)
* [sha3](sha3.md#sha3)

## Constructors

### constructor

\+ **new Sha3**(`bits`: number, `padding`: Uint32Array, `outputBits`: number): [Sha3](sha3.md)

Create a new instance of SHA3.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bits` | number | The number of input bits. |
`padding` | Uint32Array | The padding to use. |
`outputBits` | number | The number of output bits.  |

**Returns:** [Sha3](sha3.md)

## Methods

### digest

▸ **digest**(): Uint8Array

Finalize and return the hash for the digest, will also reset the state.

**Returns:** Uint8Array

Array buffer containing the digest.

___

### reset

▸ **reset**(): void

Reset the state.

**Returns:** void

___

### update

▸ **update**(`input`: Uint8Array): [Sha3](sha3.md)

Update the state.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`input` | Uint8Array | Array of data to use in the update. |

**Returns:** [Sha3](sha3.md)

The this instance for chaining.

___

### keccak

▸ `Static`**keccak**(`bits`: 224 \| 256 \| 384 \| 512): [Sha3](sha3.md)

Create instance of the keccak algorithms.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bits` | 224 \| 256 \| 384 \| 512 | The number of bits to use. |

**Returns:** [Sha3](sha3.md)

An initialized instance of the Keccak algorithm,

___

### sha3

▸ `Static`**sha3**(`bits`: 224 \| 256 \| 384 \| 512): [Sha3](sha3.md)

Create instance of the sha3 algorithms.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bits` | 224 \| 256 \| 384 \| 512 | The number of bits to use. |

**Returns:** [Sha3](sha3.md)

An initialized instance of the Keccak algorithm,
