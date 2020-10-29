**[@iota/iota2.js](../README.md)**

> [Globals](../README.md) / Bech32

# Class: Bech32

Class to help with Bech32 encoding/decoding.
Based on reference implementation https://github.com/sipa/bech32/blob/master/ref/javascript/bech32.js

## Hierarchy

* **Bech32**

## Index

### Methods

* [decode](bech32.md#decode)
* [encode](bech32.md#encode)

## Methods

### decode

▸ `Static`**decode**(`bech`: string): { data: Uint8Array ; humanReadablePart: string  } \| undefined

Decode a bech32 string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bech` | string | The text to decode. |

**Returns:** { data: Uint8Array ; humanReadablePart: string  } \| undefined

The decoded data or undefined if it could not be decoded.

___

### encode

▸ `Static`**encode**(`humanReadablePart`: string, `data`: Uint8Array): string

Encode the buffer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`humanReadablePart` | string | The header |
`data` | Uint8Array | The data to encode. |

**Returns:** string

The encoded data.
