**[@iota/iota2.js](../README.md)**

> [Globals](../README.md) / Ed25519Address

# Class: Ed25519Address

Class to help with Ed25519 Signature scheme.

## Hierarchy

* **Ed25519Address**

## Index

### Methods

* [publicKeyToAddress](ed25519address.md#publickeytoaddress)
* [verifyAddress](ed25519address.md#verifyaddress)

## Methods

### publicKeyToAddress

▸ `Static`**publicKeyToAddress**(`publicKey`: Uint8Array): Uint8Array

Convert the public key to an address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Uint8Array | The public key to convert. |

**Returns:** Uint8Array

The address.

___

### verifyAddress

▸ `Static`**verifyAddress**(`publicKey`: Uint8Array, `address`: Uint8Array): boolean

Use the public key to validate the address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Uint8Array | The public key to verify with. |
`address` | Uint8Array | The address to verify. |

**Returns:** boolean

True if the data and address is verified.
