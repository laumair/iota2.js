**[@iota/iota2.js](../README.md)**

> [Globals](../README.md) / Ed25519Seed

# Class: Ed25519Seed

Class to help with seeds.

## Hierarchy

* **Ed25519Seed**

## Implements

* [ISeed](../interfaces/iseed.md)

## Index

### Methods

* [generateSeedFromPath](ed25519seed.md#generateseedfrompath)
* [keyPair](ed25519seed.md#keypair)
* [toBytes](ed25519seed.md#tobytes)
* [fromBytes](ed25519seed.md#frombytes)
* [random](ed25519seed.md#random)

## Methods

### generateSeedFromPath

▸ **generateSeedFromPath**(`path`: [Bip32Path](bip32path.md)): [ISeed](../interfaces/iseed.md)

*Implementation of [ISeed](../interfaces/iseed.md)*

Generate a new seed from the path.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | [Bip32Path](bip32path.md) | The path to generate the seed for. |

**Returns:** [ISeed](../interfaces/iseed.md)

The generated seed.

___

### keyPair

▸ **keyPair**(): [IKeyPair](../interfaces/ikeypair.md)

*Implementation of [ISeed](../interfaces/iseed.md)*

Get the key pair from the seed.

**Returns:** [IKeyPair](../interfaces/ikeypair.md)

The key pair.

___

### toBytes

▸ **toBytes**(): Uint8Array

*Implementation of [ISeed](../interfaces/iseed.md)*

Return the key as bytes.

**Returns:** Uint8Array

The key as bytes.

___

### fromBytes

▸ `Static`**fromBytes**(`bytes`: Uint8Array): [Ed25519Seed](ed25519seed.md)

Create a seed from the bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`bytes` | Uint8Array | The binary representation of the seed. |

**Returns:** [Ed25519Seed](ed25519seed.md)

The seed.

___

### random

▸ `Static`**random**(): [Ed25519Seed](ed25519seed.md)

Generate a new random seed.

**Returns:** [Ed25519Seed](ed25519seed.md)

The random seed.
