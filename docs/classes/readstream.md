**[@iota/iota2.js](../README.md)**

> [Globals](../README.md) / ReadStream

# Class: ReadStream

Keep track of the read index within a stream.

## Hierarchy

* **ReadStream**

## Index

### Constructors

* [constructor](readstream.md#constructor)

### Methods

* [hasRemaining](readstream.md#hasremaining)
* [length](readstream.md#length)
* [readByte](readstream.md#readbyte)
* [readFixedHex](readstream.md#readfixedhex)
* [readString](readstream.md#readstring)
* [readUInt16](readstream.md#readuint16)
* [readUInt32](readstream.md#readuint32)
* [readUInt64](readstream.md#readuint64)
* [unused](readstream.md#unused)

## Constructors

### constructor

\+ **new ReadStream**(`storage`: Uint8Array, `readStartIndex?`: number): [ReadStream](readstream.md)

Create a new instance of ReadStream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`storage` | Uint8Array | - | The data to access. |
`readStartIndex` | number | 0 | The index to start the reading from.  |

**Returns:** [ReadStream](readstream.md)

## Methods

### hasRemaining

▸ **hasRemaining**(`remaining`: number): boolean

Does the storage have enough data remaining.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`remaining` | number | The amount of space needed. |

**Returns:** boolean

True if it has enough data.

___

### length

▸ **length**(): number

Get the length of the storage.

**Returns:** number

The storage length.

___

### readByte

▸ **readByte**(`name`: string, `moveIndex?`: boolean): number

Read a byte from the stream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | string | - | The name of the data we are trying to read. |
`moveIndex` | boolean | true | Move the index pointer on. |

**Returns:** number

The value.

___

### readFixedHex

▸ **readFixedHex**(`name`: string, `length`: number, `moveIndex?`: boolean): string

Read fixed length as hex.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | string | - | The name of the data we are trying to read. |
`length` | number | - | The length of the data to read. |
`moveIndex` | boolean | true | Move the index pointer on. |

**Returns:** string

The hex formatted data.

___

### readString

▸ **readString**(`name`: string, `moveIndex?`: boolean): string

Read a string from the stream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | string | - | The name of the data we are trying to read. |
`moveIndex` | boolean | true | Move the index pointer on. |

**Returns:** string

The string.

___

### readUInt16

▸ **readUInt16**(`name`: string, `moveIndex?`: boolean): number

Read a UInt16 from the stream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | string | - | The name of the data we are trying to read. |
`moveIndex` | boolean | true | Move the index pointer on. |

**Returns:** number

The value.

___

### readUInt32

▸ **readUInt32**(`name`: string, `moveIndex?`: boolean): number

Read a UInt32 from the stream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | string | - | The name of the data we are trying to read. |
`moveIndex` | boolean | true | Move the index pointer on. |

**Returns:** number

The value.

___

### readUInt64

▸ **readUInt64**(`name`: string, `moveIndex?`: boolean): bigint

Read a UInt64 from the stream.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | string | - | The name of the data we are trying to read. |
`moveIndex` | boolean | true | Move the index pointer on. |

**Returns:** bigint

The value.

___

### unused

▸ **unused**(): number

How much unused data is there.

**Returns:** number

The amount of unused data.
