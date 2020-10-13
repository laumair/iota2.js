## Classes

<dl>
<dt><a href="#Client">Client</a></dt>
<dd><p>Client for API communication.</p>
</dd>
<dt><a href="#ClientError">ClientError</a></dt>
<dd><p>Class to handle http errors.</p>
</dd>
<dt><a href="#Bip32Path">Bip32Path</a></dt>
<dd><p>Class to help with bip32 paths.</p>
</dd>
<dt><a href="#Blake2b">Blake2b</a></dt>
<dd><p>Class to help with Blake2B Signature scheme.</p>
</dd>
<dt><a href="#Ed25519">Ed25519</a></dt>
<dd><p>Class to help with Ed25519 Signature scheme.</p>
</dd>
<dt><a href="#Ed25519Seed">Ed25519Seed</a></dt>
<dd><p>Class to help with seeds.</p>
</dd>
<dt><a href="#ReadBuffer">ReadBuffer</a></dt>
<dd><p>Keep track of the read index within a buffer.</p>
</dd>
<dt><a href="#WriteBuffer">WriteBuffer</a></dt>
<dd><p>Keep track of the write index within a buffer.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#deserializeAddress">deserializeAddress(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the address from binary.</p>
</dd>
<dt><a href="#serializeAddress">serializeAddress(writeBuffer, object)</a></dt>
<dd><p>Serialize the address to binary.</p>
</dd>
<dt><a href="#deserializeEd25519Address">deserializeEd25519Address(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the Ed25519 address from binary.</p>
</dd>
<dt><a href="#serializeEd25519Address">serializeEd25519Address(writeBuffer, object)</a></dt>
<dd><p>Serialize the ed25519 address to binary.</p>
</dd>
<dt><a href="#isHex">isHex(value)</a> ⇒</dt>
<dd><p>Is the data hex format.</p>
</dd>
<dt><a href="#deserializeInputs">deserializeInputs(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the inputs from binary.</p>
</dd>
<dt><a href="#serializeInputs">serializeInputs(writeBuffer, objects)</a></dt>
<dd><p>Serialize the inputs to binary.</p>
</dd>
<dt><a href="#deserializeInput">deserializeInput(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the input from binary.</p>
</dd>
<dt><a href="#serializeInput">serializeInput(writeBuffer, object)</a></dt>
<dd><p>Serialize the input to binary.</p>
</dd>
<dt><a href="#deserializeUTXOInput">deserializeUTXOInput(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the utxo input from binary.</p>
</dd>
<dt><a href="#serializeUTXOInput">serializeUTXOInput(writeBuffer, object)</a></dt>
<dd><p>Serialize the utxo input to binary.</p>
</dd>
<dt><a href="#deserializeMessage">deserializeMessage(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the message from binary.</p>
</dd>
<dt><a href="#serializeMessage">serializeMessage(writeBuffer, object)</a></dt>
<dd><p>Serialize the message essence to binary.</p>
</dd>
<dt><a href="#deserializeOutputs">deserializeOutputs(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the outputs from binary.</p>
</dd>
<dt><a href="#serializeOutputs">serializeOutputs(writeBuffer, objects)</a></dt>
<dd><p>Serialize the outputs to binary.</p>
</dd>
<dt><a href="#deserializeOutput">deserializeOutput(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the output from binary.</p>
</dd>
<dt><a href="#serializeOutput">serializeOutput(writeBuffer, object)</a></dt>
<dd><p>Serialize the output to binary.</p>
</dd>
<dt><a href="#deserializeSigLockedSingleOutput">deserializeSigLockedSingleOutput(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the signature locked single output from binary.</p>
</dd>
<dt><a href="#serializeSigLockedSingleOutput">serializeSigLockedSingleOutput(writeBuffer, object)</a></dt>
<dd><p>Serialize the signature locked single output to binary.</p>
</dd>
<dt><a href="#deserializePayload">deserializePayload(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the payload from binary.</p>
</dd>
<dt><a href="#serializePayload">serializePayload(writeBuffer, object)</a></dt>
<dd><p>Serialize the payload essence to binary.</p>
</dd>
<dt><a href="#deserializeTransactionPayload">deserializeTransactionPayload(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the transaction payload from binary.</p>
</dd>
<dt><a href="#serializeTransactionPayload">serializeTransactionPayload(writeBuffer, object)</a></dt>
<dd><p>Serialize the transaction payload essence to binary.</p>
</dd>
<dt><a href="#deserializeMilestonePayload">deserializeMilestonePayload(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the milestone payload from binary.</p>
</dd>
<dt><a href="#serializeMilestonePayload">serializeMilestonePayload(writeBuffer, object)</a></dt>
<dd><p>Serialize the milestone payload essence to binary.</p>
</dd>
<dt><a href="#deserializeIndexationPayload">deserializeIndexationPayload(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the indexation payload from binary.</p>
</dd>
<dt><a href="#serializeIndexationPayload">serializeIndexationPayload(writeBuffer, object)</a></dt>
<dd><p>Serialize the indexation payload essence to binary.</p>
</dd>
<dt><a href="#deserializeSignature">deserializeSignature(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the signature from binary.</p>
</dd>
<dt><a href="#serializeSignature">serializeSignature(writeBuffer, object)</a></dt>
<dd><p>Serialize the signature to binary.</p>
</dd>
<dt><a href="#deserializeEd25519Signature">deserializeEd25519Signature(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the Ed25519 signature from binary.</p>
</dd>
<dt><a href="#serializeEd25519Signature">serializeEd25519Signature(writeBuffer, object)</a></dt>
<dd><p>Serialize the Ed25519 signature to binary.</p>
</dd>
<dt><a href="#deserializeTransactionEssence">deserializeTransactionEssence(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the transaction essence from binary.</p>
</dd>
<dt><a href="#serializeTransactionEssence">serializeTransactionEssence(writeBuffer, object)</a></dt>
<dd><p>Serialize the transaction essence to binary.</p>
</dd>
<dt><a href="#deserializeUnlockBlocks">deserializeUnlockBlocks(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the unlock blocks from binary.</p>
</dd>
<dt><a href="#serializeUnlockBlocks">serializeUnlockBlocks(writeBuffer, objects)</a></dt>
<dd><p>Serialize the unlock blocks to binary.</p>
</dd>
<dt><a href="#deserializeUnlockBlock">deserializeUnlockBlock(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the unlock block from binary.</p>
</dd>
<dt><a href="#serializeUnlockBlock">serializeUnlockBlock(writeBuffer, object)</a></dt>
<dd><p>Serialize the unlock block to binary.</p>
</dd>
<dt><a href="#deserializeSignatureUnlockBlock">deserializeSignatureUnlockBlock(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the signature unlock block from binary.</p>
</dd>
<dt><a href="#serializeSignatureUnlockBlock">serializeSignatureUnlockBlock(writeBuffer, object)</a></dt>
<dd><p>Serialize the signature unlock block to binary.</p>
</dd>
<dt><a href="#deserializeReferenceUnlockBlock">deserializeReferenceUnlockBlock(readBuffer)</a> ⇒</dt>
<dd><p>Deserialize the reference unlock block from binary.</p>
</dd>
<dt><a href="#serializeReferenceUnlockBlock">serializeReferenceUnlockBlock(writeBuffer, object)</a></dt>
<dd><p>Serialize the reference unlock block to binary.</p>
</dd>
<dt><a href="#logMessage">logMessage(prefix, message)</a></dt>
<dd><p>Log a message to the console.</p>
</dd>
<dt><a href="#logPayload">logPayload(prefix, unknownPayload)</a></dt>
<dd><p>Log a message to the console.</p>
</dd>
<dt><a href="#logAddress">logAddress(prefix, unknownAddress)</a></dt>
<dd><p>Log an address to the console.</p>
</dd>
<dt><a href="#logSignature">logSignature(prefix, unknownSignature)</a></dt>
<dd><p>Log signature to the console.</p>
</dd>
<dt><a href="#logInput">logInput(prefix, unknownInput)</a></dt>
<dd><p>Log input to the console.</p>
</dd>
<dt><a href="#logOutput">logOutput(prefix, unknownOutput)</a></dt>
<dd><p>Log output to the console.</p>
</dd>
<dt><a href="#logUnlockBlock">logUnlockBlock(prefix, unknownUnlockBlock)</a></dt>
<dd><p>Log unlock block to the console.</p>
</dd>
</dl>

<a name="Client"></a>

## Client
Client for API communication.

**Kind**: global class  

* [Client](#Client)
    * [new Client(endpoint)](#new_Client_new)
    * [.health()](#Client+health) ⇒
    * [.info()](#Client+info) ⇒
    * [.tips()](#Client+tips) ⇒
    * [.message(messageId)](#Client+message) ⇒
    * [.messageMetadata(messageId)](#Client+messageMetadata) ⇒
    * [.messageRaw(messageId)](#Client+messageRaw) ⇒
    * [.messageSubmit(message)](#Client+messageSubmit) ⇒
    * [.messageSubmitRaw(message)](#Client+messageSubmitRaw) ⇒
    * [.messagesFind(index)](#Client+messagesFind) ⇒
    * [.messageChildren(messageId)](#Client+messageChildren) ⇒
    * [.output(outputId)](#Client+output) ⇒
    * [.address(address)](#Client+address) ⇒
    * [.addressOutputs(address)](#Client+addressOutputs) ⇒
    * [.milestone(index)](#Client+milestone) ⇒

<a name="new_Client_new"></a>

### new Client(endpoint)
Create a new instance of client.


| Param | Description |
| --- | --- |
| endpoint | The endpoint. |

<a name="Client+health"></a>

### client.health() ⇒
Get the health of the node.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: True if the node is healthy.  
<a name="Client+info"></a>

### client.info() ⇒
Get the info about the node.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The node information.  
<a name="Client+tips"></a>

### client.tips() ⇒
Get the tips from the node.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The tips.  
<a name="Client+message"></a>

### client.message(messageId) ⇒
Get the message data by id.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The message data.  

| Param | Description |
| --- | --- |
| messageId | The message to get the data for. |

<a name="Client+messageMetadata"></a>

### client.messageMetadata(messageId) ⇒
Get the message metadata by id.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The message metadata.  

| Param | Description |
| --- | --- |
| messageId | The message to get the metadata for. |

<a name="Client+messageRaw"></a>

### client.messageRaw(messageId) ⇒
Get the message raw data by id.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The message raw data.  

| Param | Description |
| --- | --- |
| messageId | The message to get the data for. |

<a name="Client+messageSubmit"></a>

### client.messageSubmit(message) ⇒
Submit message.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The messageId.  

| Param | Description |
| --- | --- |
| message | The message to submit. |

<a name="Client+messageSubmitRaw"></a>

### client.messageSubmitRaw(message) ⇒
Submit message in raw format.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The messageId.  

| Param | Description |
| --- | --- |
| message | The message to submit. |

<a name="Client+messagesFind"></a>

### client.messagesFind(index) ⇒
Find messages by index.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The messageId.  

| Param | Description |
| --- | --- |
| index | The index value. |

<a name="Client+messageChildren"></a>

### client.messageChildren(messageId) ⇒
Get the children of a message.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The messages children.  

| Param | Description |
| --- | --- |
| messageId | The id of the message to get the children for. |

<a name="Client+output"></a>

### client.output(outputId) ⇒
Find an output by its identifier.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The output details.  

| Param | Description |
| --- | --- |
| outputId | The id of the output to get. |

<a name="Client+address"></a>

### client.address(address) ⇒
Get the address details.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The address details.  

| Param | Description |
| --- | --- |
| address | The address to get the details for. |

<a name="Client+addressOutputs"></a>

### client.addressOutputs(address) ⇒
Get the address outputs.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The address outputs.  

| Param | Description |
| --- | --- |
| address | The address to get the outputs for. |

<a name="Client+milestone"></a>

### client.milestone(index) ⇒
Get the requested milestone.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: The milestone details.  

| Param | Description |
| --- | --- |
| index | The index of the milestone to get. |

<a name="ClientError"></a>

## ClientError
Class to handle http errors.

**Kind**: global class  
<a name="new_ClientError_new"></a>

### new ClientError(message, route, httpStatus, code)
Create a new instance of ClientError.


| Param | Description |
| --- | --- |
| message | The message for the error. |
| route | The route the request was made to. |
| httpStatus | The http status code. |
| code | The code in the payload. |

<a name="Bip32Path"></a>

## Bip32Path
Class to help with bip32 paths.

**Kind**: global class  

* [Bip32Path](#Bip32Path)
    * [new Bip32Path(initialPath)](#new_Bip32Path_new)
    * [.toString()](#Bip32Path+toString) ⇒
    * [.push(index)](#Bip32Path+push)
    * [.pop()](#Bip32Path+pop) ⇒

<a name="new_Bip32Path_new"></a>

### new Bip32Path(initialPath)
Create a new instance of Bip32Path.


| Param | Description |
| --- | --- |
| initialPath | Initial path to create. |

<a name="Bip32Path+toString"></a>

### bip32Path.toString() ⇒
Converts the path to a string.

**Kind**: instance method of [<code>Bip32Path</code>](#Bip32Path)  
**Returns**: The path as a string.  
<a name="Bip32Path+push"></a>

### bip32Path.push(index)
Push a new index on to the path.

**Kind**: instance method of [<code>Bip32Path</code>](#Bip32Path)  

| Param | Description |
| --- | --- |
| index | The index to add to the path. |

<a name="Bip32Path+pop"></a>

### bip32Path.pop() ⇒
Pop an index from the path.

**Kind**: instance method of [<code>Bip32Path</code>](#Bip32Path)  
**Returns**: The popped index  
<a name="Blake2b"></a>

## Blake2b
Class to help with Blake2B Signature scheme.

**Kind**: global class  

* [Blake2b](#Blake2b)
    * [.SIZE_256](#Blake2b.SIZE_256)
    * [.sum256(data)](#Blake2b.sum256) ⇒

<a name="Blake2b.SIZE_256"></a>

### Blake2b.SIZE\_256
Blake2b 256.

**Kind**: static property of [<code>Blake2b</code>](#Blake2b)  
<a name="Blake2b.sum256"></a>

### Blake2b.sum256(data) ⇒
Perform Sum 256 on the data.

**Kind**: static method of [<code>Blake2b</code>](#Blake2b)  
**Returns**: The sum 256 of the data.  

| Param | Description |
| --- | --- |
| data | The data to operate on. |

<a name="Ed25519"></a>

## Ed25519
Class to help with Ed25519 Signature scheme.

**Kind**: global class  

* [Ed25519](#Ed25519)
    * [.VERSION](#Ed25519.VERSION)
    * [.PUBLIC_KEY_SIZE](#Ed25519.PUBLIC_KEY_SIZE)
    * [.SIGNATURE_SIZE](#Ed25519.SIGNATURE_SIZE)
    * [.ADDRESS_LENGTH](#Ed25519.ADDRESS_LENGTH)
    * [.signData(privateKey, data)](#Ed25519.signData) ⇒
    * [.verifyData(publicKey, signature, data)](#Ed25519.verifyData) ⇒
    * [.signAddress(publicKey)](#Ed25519.signAddress) ⇒
    * [.verifyAddress(publicKey, address)](#Ed25519.verifyAddress) ⇒

<a name="Ed25519.VERSION"></a>

### Ed25519.VERSION
Version for signature scheme.

**Kind**: static property of [<code>Ed25519</code>](#Ed25519)  
<a name="Ed25519.PUBLIC_KEY_SIZE"></a>

### Ed25519.PUBLIC\_KEY\_SIZE
Public Key size.

**Kind**: static property of [<code>Ed25519</code>](#Ed25519)  
<a name="Ed25519.SIGNATURE_SIZE"></a>

### Ed25519.SIGNATURE\_SIZE
Signature size for signing scheme.

**Kind**: static property of [<code>Ed25519</code>](#Ed25519)  
<a name="Ed25519.ADDRESS_LENGTH"></a>

### Ed25519.ADDRESS\_LENGTH
Address size.

**Kind**: static property of [<code>Ed25519</code>](#Ed25519)  
<a name="Ed25519.signData"></a>

### Ed25519.signData(privateKey, data) ⇒
Privately sign the data.

**Kind**: static method of [<code>Ed25519</code>](#Ed25519)  
**Returns**: The signature.  

| Param | Description |
| --- | --- |
| privateKey | The private key to sign with. |
| data | The data to sign. |

<a name="Ed25519.verifyData"></a>

### Ed25519.verifyData(publicKey, signature, data) ⇒
Use the public key and signature to validate the data.

**Kind**: static method of [<code>Ed25519</code>](#Ed25519)  
**Returns**: True if the data and address is verified.  

| Param | Description |
| --- | --- |
| publicKey | The public key to verify with. |
| signature | The signature to verify. |
| data | The data to verify. |

<a name="Ed25519.signAddress"></a>

### Ed25519.signAddress(publicKey) ⇒
Convert the public key to an address.

**Kind**: static method of [<code>Ed25519</code>](#Ed25519)  
**Returns**: The address.  

| Param | Description |
| --- | --- |
| publicKey | The public key to convert. |

<a name="Ed25519.verifyAddress"></a>

### Ed25519.verifyAddress(publicKey, address) ⇒
Use the public key to validate the address.

**Kind**: static method of [<code>Ed25519</code>](#Ed25519)  
**Returns**: True if the data and address is verified.  

| Param | Description |
| --- | --- |
| publicKey | The public key to verify with. |
| address | The address to verify. |

<a name="Ed25519Seed"></a>

## Ed25519Seed
Class to help with seeds.

**Kind**: global class  

* [Ed25519Seed](#Ed25519Seed)
    * _instance_
        * [._secretKey](#Ed25519Seed+_secretKey)
        * [.generateKeyPair()](#Ed25519Seed+generateKeyPair) ⇒
        * [.generateSubseed(path)](#Ed25519Seed+generateSubseed) ⇒
        * [.toBytes()](#Ed25519Seed+toBytes) ⇒
        * [.toString()](#Ed25519Seed+toString) ⇒
    * _static_
        * [.SEED_SIZE_BYTES](#Ed25519Seed.SEED_SIZE_BYTES)
        * [.fromBytes(buffer)](#Ed25519Seed.fromBytes) ⇒
        * [.fromString(hex)](#Ed25519Seed.fromString) ⇒
        * [.random()](#Ed25519Seed.random) ⇒

<a name="Ed25519Seed+_secretKey"></a>

### ed25519Seed.\_secretKey
The secret key for the seed.

**Kind**: instance property of [<code>Ed25519Seed</code>](#Ed25519Seed)  
<a name="Ed25519Seed+generateKeyPair"></a>

### ed25519Seed.generateKeyPair() ⇒
Generate a key pair from the seed.

**Kind**: instance method of [<code>Ed25519Seed</code>](#Ed25519Seed)  
**Returns**: The key pair.  
<a name="Ed25519Seed+generateSubseed"></a>

### ed25519Seed.generateSubseed(path) ⇒
Generate the subseeed from bip32 path.

**Kind**: instance method of [<code>Ed25519Seed</code>](#Ed25519Seed)  
**Returns**: The private key.  

| Param | Description |
| --- | --- |
| path | The path of the subseed to generate. |

<a name="Ed25519Seed+toBytes"></a>

### ed25519Seed.toBytes() ⇒
Return the key as bytes.

**Kind**: instance method of [<code>Ed25519Seed</code>](#Ed25519Seed)  
**Returns**: The key as bytes.  
<a name="Ed25519Seed+toString"></a>

### ed25519Seed.toString() ⇒
Return the key as string.

**Kind**: instance method of [<code>Ed25519Seed</code>](#Ed25519Seed)  
**Returns**: The key as string.  
<a name="Ed25519Seed.SEED_SIZE_BYTES"></a>

### Ed25519Seed.SEED\_SIZE\_BYTES
SeedSize is the size, in bytes, of private key seeds.

**Kind**: static property of [<code>Ed25519Seed</code>](#Ed25519Seed)  
<a name="Ed25519Seed.fromBytes"></a>

### Ed25519Seed.fromBytes(buffer) ⇒
Create a seed from the bytes.

**Kind**: static method of [<code>Ed25519Seed</code>](#Ed25519Seed)  
**Returns**: The seed.  

| Param | Description |
| --- | --- |
| buffer | The binary representation of the seed. |

<a name="Ed25519Seed.fromString"></a>

### Ed25519Seed.fromString(hex) ⇒
Create a seed from the hex string.

**Kind**: static method of [<code>Ed25519Seed</code>](#Ed25519Seed)  
**Returns**: The seed.  

| Param | Description |
| --- | --- |
| hex | The hex representation of the seed. |

<a name="Ed25519Seed.random"></a>

### Ed25519Seed.random() ⇒
Generate a new random seed.

**Kind**: static method of [<code>Ed25519Seed</code>](#Ed25519Seed)  
**Returns**: The random seed.  
<a name="ReadBuffer"></a>

## ReadBuffer
Keep track of the read index within a buffer.

**Kind**: global class  

* [ReadBuffer](#ReadBuffer)
    * [new ReadBuffer(buffer, readStartIndex)](#new_ReadBuffer_new)
    * [.length()](#ReadBuffer+length) ⇒
    * [.hasRemaining(remaining)](#ReadBuffer+hasRemaining) ⇒
    * [.unused()](#ReadBuffer+unused) ⇒
    * [.readFixedBufferHex(name, length)](#ReadBuffer+readFixedBufferHex) ⇒
    * [.readByte(name)](#ReadBuffer+readByte) ⇒
    * [.readUInt16(name)](#ReadBuffer+readUInt16) ⇒
    * [.readUInt32(name)](#ReadBuffer+readUInt32) ⇒
    * [.readUInt64(name)](#ReadBuffer+readUInt64) ⇒
    * [.readString(name)](#ReadBuffer+readString) ⇒

<a name="new_ReadBuffer_new"></a>

### new ReadBuffer(buffer, readStartIndex)
Create a new instance of ReadBuffer.


| Param | Default | Description |
| --- | --- | --- |
| buffer |  | The buffer to access. |
| readStartIndex | <code>0</code> | The index to start the reading from. |

<a name="ReadBuffer+length"></a>

### readBuffer.length() ⇒
Get the length of the buffer.

**Kind**: instance method of [<code>ReadBuffer</code>](#ReadBuffer)  
**Returns**: The buffer length.  
<a name="ReadBuffer+hasRemaining"></a>

### readBuffer.hasRemaining(remaining) ⇒
Does the buffer have enough data remaining.

**Kind**: instance method of [<code>ReadBuffer</code>](#ReadBuffer)  
**Returns**: True if it has enough data.  

| Param | Description |
| --- | --- |
| remaining | The amount of space needed. |

<a name="ReadBuffer+unused"></a>

### readBuffer.unused() ⇒
How much unused data is there.

**Kind**: instance method of [<code>ReadBuffer</code>](#ReadBuffer)  
**Returns**: The amount of unused data.  
<a name="ReadBuffer+readFixedBufferHex"></a>

### readBuffer.readFixedBufferHex(name, length) ⇒
Read fixed length buffer.

**Kind**: instance method of [<code>ReadBuffer</code>](#ReadBuffer)  
**Returns**: The buffer.  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to read. |
| length | The length of the data to read. |

<a name="ReadBuffer+readByte"></a>

### readBuffer.readByte(name) ⇒
Read a byte from the buffer.

**Kind**: instance method of [<code>ReadBuffer</code>](#ReadBuffer)  
**Returns**: The value.  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to read. |

<a name="ReadBuffer+readUInt16"></a>

### readBuffer.readUInt16(name) ⇒
Read a UInt16 from the buffer.

**Kind**: instance method of [<code>ReadBuffer</code>](#ReadBuffer)  
**Returns**: The value.  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to read. |

<a name="ReadBuffer+readUInt32"></a>

### readBuffer.readUInt32(name) ⇒
Read a UInt32 from the buffer.

**Kind**: instance method of [<code>ReadBuffer</code>](#ReadBuffer)  
**Returns**: The value.  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to read. |

<a name="ReadBuffer+readUInt64"></a>

### readBuffer.readUInt64(name) ⇒
Read a UInt64 from the buffer.

**Kind**: instance method of [<code>ReadBuffer</code>](#ReadBuffer)  
**Returns**: The value.  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to read. |

<a name="ReadBuffer+readString"></a>

### readBuffer.readString(name) ⇒
Read a string from the buffer.

**Kind**: instance method of [<code>ReadBuffer</code>](#ReadBuffer)  
**Returns**: The string.  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to read. |

<a name="WriteBuffer"></a>

## WriteBuffer
Keep track of the write index within a buffer.

**Kind**: global class  

* [WriteBuffer](#WriteBuffer)
    * [new WriteBuffer()](#new_WriteBuffer_new)
    * _instance_
        * [.length()](#WriteBuffer+length) ⇒
        * [.unused()](#WriteBuffer+unused) ⇒
        * [.finalBuffer()](#WriteBuffer+finalBuffer) ⇒
        * [.getWriteIndex()](#WriteBuffer+getWriteIndex) ⇒
        * [.setWriteIndex(writeIndex)](#WriteBuffer+setWriteIndex)
        * [.writeFixedBufferHex(name, length, val)](#WriteBuffer+writeFixedBufferHex)
        * [.writeByte(name, val)](#WriteBuffer+writeByte)
        * [.writeUInt16(name, val)](#WriteBuffer+writeUInt16)
        * [.writeUInt32(name, val)](#WriteBuffer+writeUInt32)
        * [.writeUInt64(name, val)](#WriteBuffer+writeUInt64)
        * [.writeString(name, val)](#WriteBuffer+writeString) ⇒
        * [.expand(additional)](#WriteBuffer+expand)
    * _static_
        * [.CHUNK_SIZE](#WriteBuffer.CHUNK_SIZE)

<a name="new_WriteBuffer_new"></a>

### new WriteBuffer()
Create a new instance of ReadBuffer.

<a name="WriteBuffer+length"></a>

### writeBuffer.length() ⇒
Get the length of the buffer.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  
**Returns**: The buffer length.  
<a name="WriteBuffer+unused"></a>

### writeBuffer.unused() ⇒
How much unused data is there.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  
**Returns**: The amount of unused data.  
<a name="WriteBuffer+finalBuffer"></a>

### writeBuffer.finalBuffer() ⇒
Get the final buffer.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  
**Returns**: The final buffer.  
<a name="WriteBuffer+getWriteIndex"></a>

### writeBuffer.getWriteIndex() ⇒
Get the current write index.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  
**Returns**: The current write index.  
<a name="WriteBuffer+setWriteIndex"></a>

### writeBuffer.setWriteIndex(writeIndex)
Set the current write index.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  

| Param | Description |
| --- | --- |
| writeIndex | The current write index. |

<a name="WriteBuffer+writeFixedBufferHex"></a>

### writeBuffer.writeFixedBufferHex(name, length, val)
Write fixed length buffer.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to write. |
| length | The length of the data to write. |
| val | The data to write. |

<a name="WriteBuffer+writeByte"></a>

### writeBuffer.writeByte(name, val)
Write a byte to the buffer.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to write. |
| val | The data to write. |

<a name="WriteBuffer+writeUInt16"></a>

### writeBuffer.writeUInt16(name, val)
Write a UInt16 to the buffer.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to write. |
| val | The data to write. |

<a name="WriteBuffer+writeUInt32"></a>

### writeBuffer.writeUInt32(name, val)
Write a UInt32 to the buffer.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to write. |
| val | The data to write. |

<a name="WriteBuffer+writeUInt64"></a>

### writeBuffer.writeUInt64(name, val)
Write a UInt64 to the buffer.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to write. |
| val | The data to write. |

<a name="WriteBuffer+writeString"></a>

### writeBuffer.writeString(name, val) ⇒
Write a string to the buffer.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  
**Returns**: The string.  

| Param | Description |
| --- | --- |
| name | The name of the data we are trying to write. |
| val | The data to write. |

<a name="WriteBuffer+expand"></a>

### writeBuffer.expand(additional)
Expand the buffer if there is not enough spave.

**Kind**: instance method of [<code>WriteBuffer</code>](#WriteBuffer)  

| Param | Description |
| --- | --- |
| additional | The amount of space needed. |

<a name="WriteBuffer.CHUNK_SIZE"></a>

### WriteBuffer.CHUNK\_SIZE
Chunk size to expand the buffer.

**Kind**: static property of [<code>WriteBuffer</code>](#WriteBuffer)  
<a name="deserializeAddress"></a>

## deserializeAddress(readBuffer) ⇒
Deserialize the address from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeAddress"></a>

## serializeAddress(writeBuffer, object)
Serialize the address to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeEd25519Address"></a>

## deserializeEd25519Address(readBuffer) ⇒
Deserialize the Ed25519 address from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeEd25519Address"></a>

## serializeEd25519Address(writeBuffer, object)
Serialize the ed25519 address to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="isHex"></a>

## isHex(value) ⇒
Is the data hex format.

**Kind**: global function  
**Returns**: true if the string is hex.  

| Param | Description |
| --- | --- |
| value | The value to test. |

<a name="deserializeInputs"></a>

## deserializeInputs(readBuffer) ⇒
Deserialize the inputs from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeInputs"></a>

## serializeInputs(writeBuffer, objects)
Serialize the inputs to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| objects | The objects to serialize. |

<a name="deserializeInput"></a>

## deserializeInput(readBuffer) ⇒
Deserialize the input from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeInput"></a>

## serializeInput(writeBuffer, object)
Serialize the input to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeUTXOInput"></a>

## deserializeUTXOInput(readBuffer) ⇒
Deserialize the utxo input from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeUTXOInput"></a>

## serializeUTXOInput(writeBuffer, object)
Serialize the utxo input to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeMessage"></a>

## deserializeMessage(readBuffer) ⇒
Deserialize the message from binary.

**Kind**: global function  
**Returns**: The deserialized message.  

| Param | Description |
| --- | --- |
| readBuffer | The message to deserialize. |

<a name="serializeMessage"></a>

## serializeMessage(writeBuffer, object)
Serialize the message essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeOutputs"></a>

## deserializeOutputs(readBuffer) ⇒
Deserialize the outputs from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeOutputs"></a>

## serializeOutputs(writeBuffer, objects)
Serialize the outputs to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| objects | The objects to serialize. |

<a name="deserializeOutput"></a>

## deserializeOutput(readBuffer) ⇒
Deserialize the output from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeOutput"></a>

## serializeOutput(writeBuffer, object)
Serialize the output to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeSigLockedSingleOutput"></a>

## deserializeSigLockedSingleOutput(readBuffer) ⇒
Deserialize the signature locked single output from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeSigLockedSingleOutput"></a>

## serializeSigLockedSingleOutput(writeBuffer, object)
Serialize the signature locked single output to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializePayload"></a>

## deserializePayload(readBuffer) ⇒
Deserialize the payload from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializePayload"></a>

## serializePayload(writeBuffer, object)
Serialize the payload essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeTransactionPayload"></a>

## deserializeTransactionPayload(readBuffer) ⇒
Deserialize the transaction payload from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeTransactionPayload"></a>

## serializeTransactionPayload(writeBuffer, object)
Serialize the transaction payload essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeMilestonePayload"></a>

## deserializeMilestonePayload(readBuffer) ⇒
Deserialize the milestone payload from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeMilestonePayload"></a>

## serializeMilestonePayload(writeBuffer, object)
Serialize the milestone payload essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeIndexationPayload"></a>

## deserializeIndexationPayload(readBuffer) ⇒
Deserialize the indexation payload from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeIndexationPayload"></a>

## serializeIndexationPayload(writeBuffer, object)
Serialize the indexation payload essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeSignature"></a>

## deserializeSignature(readBuffer) ⇒
Deserialize the signature from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeSignature"></a>

## serializeSignature(writeBuffer, object)
Serialize the signature to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeEd25519Signature"></a>

## deserializeEd25519Signature(readBuffer) ⇒
Deserialize the Ed25519 signature from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeEd25519Signature"></a>

## serializeEd25519Signature(writeBuffer, object)
Serialize the Ed25519 signature to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeTransactionEssence"></a>

## deserializeTransactionEssence(readBuffer) ⇒
Deserialize the transaction essence from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeTransactionEssence"></a>

## serializeTransactionEssence(writeBuffer, object)
Serialize the transaction essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeUnlockBlocks"></a>

## deserializeUnlockBlocks(readBuffer) ⇒
Deserialize the unlock blocks from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeUnlockBlocks"></a>

## serializeUnlockBlocks(writeBuffer, objects)
Serialize the unlock blocks to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| objects | The objects to serialize. |

<a name="deserializeUnlockBlock"></a>

## deserializeUnlockBlock(readBuffer) ⇒
Deserialize the unlock block from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeUnlockBlock"></a>

## serializeUnlockBlock(writeBuffer, object)
Serialize the unlock block to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeSignatureUnlockBlock"></a>

## deserializeSignatureUnlockBlock(readBuffer) ⇒
Deserialize the signature unlock block from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeSignatureUnlockBlock"></a>

## serializeSignatureUnlockBlock(writeBuffer, object)
Serialize the signature unlock block to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="deserializeReferenceUnlockBlock"></a>

## deserializeReferenceUnlockBlock(readBuffer) ⇒
Deserialize the reference unlock block from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readBuffer | The buffer to read the data from. |

<a name="serializeReferenceUnlockBlock"></a>

## serializeReferenceUnlockBlock(writeBuffer, object)
Serialize the reference unlock block to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeBuffer | The buffer to write the data to. |
| object | The object to serialize. |

<a name="logMessage"></a>

## logMessage(prefix, message)
Log a message to the console.

**Kind**: global function  

| Param | Description |
| --- | --- |
| prefix | The prefix for the output. |
| message | The message to log. |

<a name="logPayload"></a>

## logPayload(prefix, unknownPayload)
Log a message to the console.

**Kind**: global function  

| Param | Description |
| --- | --- |
| prefix | The prefix for the output. |
| unknownPayload | The payload. |

<a name="logAddress"></a>

## logAddress(prefix, unknownAddress)
Log an address to the console.

**Kind**: global function  

| Param | Description |
| --- | --- |
| prefix | The prefix for the output. |
| unknownAddress | The address to log. |

<a name="logSignature"></a>

## logSignature(prefix, unknownSignature)
Log signature to the console.

**Kind**: global function  

| Param | Description |
| --- | --- |
| prefix | The prefix for the output. |
| unknownSignature | The signature to log. |

<a name="logInput"></a>

## logInput(prefix, unknownInput)
Log input to the console.

**Kind**: global function  

| Param | Description |
| --- | --- |
| prefix | The prefix for the output. |
| unknownInput | The input to log. |

<a name="logOutput"></a>

## logOutput(prefix, unknownOutput)
Log output to the console.

**Kind**: global function  

| Param | Description |
| --- | --- |
| prefix | The prefix for the output. |
| unknownOutput | The output to log. |

<a name="logUnlockBlock"></a>

## logUnlockBlock(prefix, unknownUnlockBlock)
Log unlock block to the console.

**Kind**: global function  

| Param | Description |
| --- | --- |
| prefix | The prefix for the output. |
| unknownUnlockBlock | The unlock block to log. |

