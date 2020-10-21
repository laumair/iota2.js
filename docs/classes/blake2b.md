**[@iota/iota2.js](../README.md)**

> [Globals](../README.md) / Blake2b

# Class: Blake2b

Class to help with Blake2B Signature scheme.
TypeScript conversion from https://github.com/dcposch/blakejs

## Hierarchy

* **Blake2b**

## Index

### Methods

* [sum256](blake2b.md#sum256)
* [sum512](blake2b.md#sum512)

## Methods

### sum256

▸ `Static`**sum256**(`data`: Uint8Array): Uint8Array

Perform Sum 256 on the data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | Uint8Array | The data to operate on. |

**Returns:** Uint8Array

The sum 256 of the data.

___

### sum512

▸ `Static`**sum512**(`data`: Uint8Array): Uint8Array

Perform Sum 512 on the data.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | Uint8Array | The data to operate on. |

**Returns:** Uint8Array

The sum 512 of the data.
