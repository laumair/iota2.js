**[@iota/iota2.js](../README.md)**

> [Globals](../README.md) / Bech32Helper

# Class: Bech32Helper

Convert address to bech32.

## Hierarchy

* **Bech32Helper**

## Index

### Properties

* [BECH32\_HRP](bech32helper.md#bech32_hrp)

### Methods

* [fromBech32](bech32helper.md#frombech32)
* [matches](bech32helper.md#matches)
* [toBech32](bech32helper.md#tobech32)

## Properties

### BECH32\_HRP

▪ `Static` **BECH32\_HRP**: string = "iot"

The human readable part of the bech32 addresses.

## Methods

### fromBech32

▸ `Static`**fromBech32**(`bech32Text`: string): { addressBytes: Uint8Array ; addressType: number  } \| undefined

Decode an address from bech32.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bech32Text` | string | The bech32 text to decode. |

**Returns:** { addressBytes: Uint8Array ; addressType: number  } \| undefined

The address type and address bytes or undefined if it cannot be decoded.

___

### matches

▸ `Static`**matches**(`bech32Text?`: undefined \| string): boolean

Does the provided string look like it might be an bech32 address with matching hrp.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bech32Text?` | undefined \| string | The bech32 text to text. |

**Returns:** boolean

True.

___

### toBech32

▸ `Static`**toBech32**(`addressType`: number, `addressBytes`: Uint8Array): string

Encode an address to bech32.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`addressType` | number | The address type to encode. |
`addressBytes` | Uint8Array | The address bytes to encode. |

**Returns:** string

The array formated as hex.
