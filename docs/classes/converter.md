**[@iota/iota2.js](../README.md)**

> [Globals](../README.md) / Converter

# Class: Converter

Convert arrays to and from different formats.

## Hierarchy

* **Converter**

## Index

### Methods

* [asciiToBytes](converter.md#asciitobytes)
* [asciiToHex](converter.md#asciitohex)
* [bytesToAscii](converter.md#bytestoascii)
* [bytesToHex](converter.md#bytestohex)
* [hexToAscii](converter.md#hextoascii)
* [hexToBytes](converter.md#hextobytes)

## Methods

### asciiToBytes

▸ `Static`**asciiToBytes**(`ascii`: string): Uint8Array

Decode a text string to raw array.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ascii` | string | The text to decode. |

**Returns:** Uint8Array

The array.

___

### asciiToHex

▸ `Static`**asciiToHex**(`ascii`: string): string

Convert the ascii text to hex.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ascii` | string | The ascii to convert. |

**Returns:** string

The hex version of the bytes.

___

### bytesToAscii

▸ `Static`**bytesToAscii**(`array`: ArrayLike\<number>, `startIndex?`: undefined \| number, `length?`: number \| undefined): string

Encode a raw array to text string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`array` | ArrayLike\<number> | The bytes to encode. |
`startIndex?` | undefined \| number | The index to start in the bytes. |
`length?` | number \| undefined | The length of bytes to read. |

**Returns:** string

The array formated as hex.

___

### bytesToHex

▸ `Static`**bytesToHex**(`array`: ArrayLike\<number>, `startIndex?`: undefined \| number, `length?`: number \| undefined, `reverse?`: undefined \| false \| true): string

Encode a raw array to hex string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`array` | ArrayLike\<number> | The bytes to encode. |
`startIndex?` | undefined \| number | The index to start in the bytes. |
`length?` | number \| undefined | The length of bytes to read. |
`reverse?` | undefined \| false \| true | Reverse the combine direction. |

**Returns:** string

The array formated as hex.

___

### hexToAscii

▸ `Static`**hexToAscii**(`hex`: string): string

Convert the hex text to ascii.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`hex` | string | The hex to convert. |

**Returns:** string

The ascii version of the bytes.

___

### hexToBytes

▸ `Static`**hexToBytes**(`hex`: string, `reverse?`: undefined \| false \| true): Uint8Array

Decode a hex string to raw array.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`hex` | string | The hex to decode. |
`reverse?` | undefined \| false \| true | Store the characters in reverse. |

**Returns:** Uint8Array

The array.
