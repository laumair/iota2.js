## Members

<dl>
<dt><a href="#ClientError">ClientError</a></dt>
<dd><p>Class to handle http errors.</p>
</dd>
<dt><a href="#SingleNodeClient">SingleNodeClient</a></dt>
<dd><p>Client for API communication.</p>
</dd>
<dt><a href="#Bip32Path">Bip32Path</a></dt>
<dd><p>Class to help with bip32 paths.</p>
</dd>
<dt><a href="#Blake2b">Blake2b</a></dt>
<dd><p>Class to help with Blake2B Signature scheme.
TypeScript conversion from <a href="https://github.com/dcposch/blakejs">https://github.com/dcposch/blakejs</a></p>
</dd>
<dt><a href="#Ed25519">Ed25519</a></dt>
<dd><p>Class to help with Ed25519 Signature scheme.</p>
</dd>
<dt><a href="#Ed25519Seed">Ed25519Seed</a></dt>
<dd><p>Class to help with seeds.</p>
</dd>
<dt><a href="#HmacSha512">HmacSha512</a></dt>
<dd><p>Class to help with HmacSha512 scheme.
TypeScript conversion from <a href="https://github.com/emn178/js-sha512">https://github.com/emn178/js-sha512</a></p>
</dd>
<dt><a href="#Sha512">Sha512</a></dt>
<dd><p>Class to help with Sha512 scheme.
TypeScript conversion from <a href="https://github.com/emn178/js-sha512">https://github.com/emn178/js-sha512</a></p>
</dd>
<dt><a href="#Slip0010">Slip0010</a></dt>
<dd><p>Class to help with slip0010 key derivation.
<a href="https://github.com/satoshilabs/slips/blob/master/slip-0010.md">https://github.com/satoshilabs/slips/blob/master/slip-0010.md</a></p>
</dd>
<dt><a href="#ArrayHelper">ArrayHelper</a></dt>
<dd><p>Array helper methods.</p>
</dd>
<dt><a href="#Converter">Converter</a></dt>
<dd><p>Convert arrays to and from different formats.</p>
</dd>
<dt><a href="#ReadStream">ReadStream</a></dt>
<dd><p>Keep track of the read index within a stream.</p>
</dd>
<dt><a href="#WriteStream">WriteStream</a></dt>
<dd><p>Keep track of the write index within a stream.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#deserializeAddress">deserializeAddress(readStream)</a> ⇒</dt>
<dd><p>Deserialize the address from binary.</p>
</dd>
<dt><a href="#serializeAddress">serializeAddress(writeStream, object)</a></dt>
<dd><p>Serialize the address to binary.</p>
</dd>
<dt><a href="#deserializeEd25519Address">deserializeEd25519Address(readStream)</a> ⇒</dt>
<dd><p>Deserialize the Ed25519 address from binary.</p>
</dd>
<dt><a href="#serializeEd25519Address">serializeEd25519Address(writeStream, object)</a></dt>
<dd><p>Serialize the ed25519 address to binary.</p>
</dd>
<dt><a href="#isHex">isHex(value)</a> ⇒</dt>
<dd><p>Is the data hex format.</p>
</dd>
<dt><a href="#deserializeInputs">deserializeInputs(readStream)</a> ⇒</dt>
<dd><p>Deserialize the inputs from binary.</p>
</dd>
<dt><a href="#serializeInputs">serializeInputs(writeStream, objects)</a></dt>
<dd><p>Serialize the inputs to binary.</p>
</dd>
<dt><a href="#deserializeInput">deserializeInput(readStream)</a> ⇒</dt>
<dd><p>Deserialize the input from binary.</p>
</dd>
<dt><a href="#serializeInput">serializeInput(writeStream, object)</a></dt>
<dd><p>Serialize the input to binary.</p>
</dd>
<dt><a href="#deserializeUTXOInput">deserializeUTXOInput(readStream)</a> ⇒</dt>
<dd><p>Deserialize the utxo input from binary.</p>
</dd>
<dt><a href="#serializeUTXOInput">serializeUTXOInput(writeStream, object)</a></dt>
<dd><p>Serialize the utxo input to binary.</p>
</dd>
<dt><a href="#deserializeMessage">deserializeMessage(readStream)</a> ⇒</dt>
<dd><p>Deserialize the message from binary.</p>
</dd>
<dt><a href="#serializeMessage">serializeMessage(writeStream, object)</a></dt>
<dd><p>Serialize the message essence to binary.</p>
</dd>
<dt><a href="#deserializeOutputs">deserializeOutputs(readStream)</a> ⇒</dt>
<dd><p>Deserialize the outputs from binary.</p>
</dd>
<dt><a href="#serializeOutputs">serializeOutputs(writeStream, objects)</a></dt>
<dd><p>Serialize the outputs to binary.</p>
</dd>
<dt><a href="#deserializeOutput">deserializeOutput(readStream)</a> ⇒</dt>
<dd><p>Deserialize the output from binary.</p>
</dd>
<dt><a href="#serializeOutput">serializeOutput(writeStream, object)</a></dt>
<dd><p>Serialize the output to binary.</p>
</dd>
<dt><a href="#deserializeSigLockedSingleOutput">deserializeSigLockedSingleOutput(readStream)</a> ⇒</dt>
<dd><p>Deserialize the signature locked single output from binary.</p>
</dd>
<dt><a href="#serializeSigLockedSingleOutput">serializeSigLockedSingleOutput(writeStream, object)</a></dt>
<dd><p>Serialize the signature locked single output to binary.</p>
</dd>
<dt><a href="#deserializePayload">deserializePayload(readStream)</a> ⇒</dt>
<dd><p>Deserialize the payload from binary.</p>
</dd>
<dt><a href="#serializePayload">serializePayload(writeStream, object)</a></dt>
<dd><p>Serialize the payload essence to binary.</p>
</dd>
<dt><a href="#deserializeTransactionPayload">deserializeTransactionPayload(readStream)</a> ⇒</dt>
<dd><p>Deserialize the transaction payload from binary.</p>
</dd>
<dt><a href="#serializeTransactionPayload">serializeTransactionPayload(writeStream, object)</a></dt>
<dd><p>Serialize the transaction payload essence to binary.</p>
</dd>
<dt><a href="#deserializeMilestonePayload">deserializeMilestonePayload(readStream)</a> ⇒</dt>
<dd><p>Deserialize the milestone payload from binary.</p>
</dd>
<dt><a href="#serializeMilestonePayload">serializeMilestonePayload(writeStream, object)</a></dt>
<dd><p>Serialize the milestone payload essence to binary.</p>
</dd>
<dt><a href="#deserializeIndexationPayload">deserializeIndexationPayload(readStream)</a> ⇒</dt>
<dd><p>Deserialize the indexation payload from binary.</p>
</dd>
<dt><a href="#serializeIndexationPayload">serializeIndexationPayload(writeStream, object)</a></dt>
<dd><p>Serialize the indexation payload essence to binary.</p>
</dd>
<dt><a href="#deserializeSignature">deserializeSignature(readStream)</a> ⇒</dt>
<dd><p>Deserialize the signature from binary.</p>
</dd>
<dt><a href="#serializeSignature">serializeSignature(writeStream, object)</a></dt>
<dd><p>Serialize the signature to binary.</p>
</dd>
<dt><a href="#deserializeEd25519Signature">deserializeEd25519Signature(readStream)</a> ⇒</dt>
<dd><p>Deserialize the Ed25519 signature from binary.</p>
</dd>
<dt><a href="#serializeEd25519Signature">serializeEd25519Signature(writeStream, object)</a></dt>
<dd><p>Serialize the Ed25519 signature to binary.</p>
</dd>
<dt><a href="#deserializeTransactionEssence">deserializeTransactionEssence(readStream)</a> ⇒</dt>
<dd><p>Deserialize the transaction essence from binary.</p>
</dd>
<dt><a href="#serializeTransactionEssence">serializeTransactionEssence(writeStream, object)</a></dt>
<dd><p>Serialize the transaction essence to binary.</p>
</dd>
<dt><a href="#deserializeUnlockBlocks">deserializeUnlockBlocks(readStream)</a> ⇒</dt>
<dd><p>Deserialize the unlock blocks from binary.</p>
</dd>
<dt><a href="#serializeUnlockBlocks">serializeUnlockBlocks(writeStream, objects)</a></dt>
<dd><p>Serialize the unlock blocks to binary.</p>
</dd>
<dt><a href="#deserializeUnlockBlock">deserializeUnlockBlock(readStream)</a> ⇒</dt>
<dd><p>Deserialize the unlock block from binary.</p>
</dd>
<dt><a href="#serializeUnlockBlock">serializeUnlockBlock(writeStream, object)</a></dt>
<dd><p>Serialize the unlock block to binary.</p>
</dd>
<dt><a href="#deserializeSignatureUnlockBlock">deserializeSignatureUnlockBlock(readStream)</a> ⇒</dt>
<dd><p>Deserialize the signature unlock block from binary.</p>
</dd>
<dt><a href="#serializeSignatureUnlockBlock">serializeSignatureUnlockBlock(writeStream, object)</a></dt>
<dd><p>Serialize the signature unlock block to binary.</p>
</dd>
<dt><a href="#deserializeReferenceUnlockBlock">deserializeReferenceUnlockBlock(readStream)</a> ⇒</dt>
<dd><p>Deserialize the reference unlock block from binary.</p>
</dd>
<dt><a href="#serializeReferenceUnlockBlock">serializeReferenceUnlockBlock(writeStream, object)</a></dt>
<dd><p>Serialize the reference unlock block to binary.</p>
</dd>
<dt><a href="#getAddresses">getAddresses(seed, basePath, startIndex, count)</a> ⇒</dt>
<dd><p>Generate a list of address key pairs.</p>
</dd>
<dt><a href="#getAddressesKeyPairs">getAddressesKeyPairs(seed, basePath, startIndex, count)</a> ⇒</dt>
<dd><p>Generate a list of address key pairs.</p>
</dd>
<dt><a href="#getBalance">getBalance(client, seed, basePath, startIndex)</a> ⇒</dt>
<dd><p>Get the balance for a list of addresses.</p>
</dd>
<dt><a href="#getUnspentAddress">getUnspentAddress(client, seed, basePath, startIndex)</a> ⇒</dt>
<dd><p>Get the first unspent address.</p>
</dd>
<dt><a href="#getUnspentAddresses">getUnspentAddresses(client, seed, basePath, startIndex, countLimit)</a> ⇒</dt>
<dd><p>Get all the unspent addresses.</p>
</dd>
<dt><a href="#retrieveData">retrieveData(client, messageId)</a> ⇒</dt>
<dd><p>Retrieve a data message.</p>
</dd>
<dt><a href="#send">send(client, seed, basePath, address, amount, startIndex)</a> ⇒</dt>
<dd><p>Send a transfer from the balance on the seed.</p>
</dd>
<dt><a href="#sendAdvanced">sendAdvanced(client, seed, basePath, outputs, startIndex, indexationKey, indexationData)</a> ⇒</dt>
<dd><p>Send a transfer from the balance on the seed.</p>
</dd>
<dt><a href="#sendData">sendData(client, indexationKey, indexationData)</a> ⇒</dt>
<dd><p>Send a data message.</p>
</dd>
<dt><a href="#logger">logger(message, data)</a> ⇒</dt>
<dd><p>The logger used by the log methods.</p>
</dd>
<dt><a href="#setLogger">setLogger(log)</a></dt>
<dd><p>Set the logger for output.</p>
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

<a name="ClientError"></a>

## ClientError
Class to handle http errors.

**Kind**: global variable  
<a name="SingleNodeClient"></a>

## SingleNodeClient
Client for API communication.

**Kind**: global variable  
<a name="Bip32Path"></a>

## Bip32Path
Class to help with bip32 paths.

**Kind**: global variable  
<a name="Blake2b"></a>

## Blake2b
Class to help with Blake2B Signature scheme.TypeScript conversion from https://github.com/dcposch/blakejs

**Kind**: global variable  
<a name="Ed25519"></a>

## Ed25519
Class to help with Ed25519 Signature scheme.

**Kind**: global variable  
<a name="Ed25519Seed"></a>

## Ed25519Seed
Class to help with seeds.

**Kind**: global variable  
<a name="HmacSha512"></a>

## HmacSha512
Class to help with HmacSha512 scheme.TypeScript conversion from https://github.com/emn178/js-sha512

**Kind**: global variable  
<a name="Sha512"></a>

## Sha512
Class to help with Sha512 scheme.TypeScript conversion from https://github.com/emn178/js-sha512

**Kind**: global variable  
<a name="Slip0010"></a>

## Slip0010
Class to help with slip0010 key derivation.https://github.com/satoshilabs/slips/blob/master/slip-0010.md

**Kind**: global variable  
<a name="ArrayHelper"></a>

## ArrayHelper
Array helper methods.

**Kind**: global variable  
<a name="Converter"></a>

## Converter
Convert arrays to and from different formats.

**Kind**: global variable  
<a name="ReadStream"></a>

## ReadStream
Keep track of the read index within a stream.

**Kind**: global variable  
<a name="WriteStream"></a>

## WriteStream
Keep track of the write index within a stream.

**Kind**: global variable  
<a name="deserializeAddress"></a>

## deserializeAddress(readStream) ⇒
Deserialize the address from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeAddress"></a>

## serializeAddress(writeStream, object)
Serialize the address to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeEd25519Address"></a>

## deserializeEd25519Address(readStream) ⇒
Deserialize the Ed25519 address from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeEd25519Address"></a>

## serializeEd25519Address(writeStream, object)
Serialize the ed25519 address to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
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

## deserializeInputs(readStream) ⇒
Deserialize the inputs from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeInputs"></a>

## serializeInputs(writeStream, objects)
Serialize the inputs to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| objects | The objects to serialize. |

<a name="deserializeInput"></a>

## deserializeInput(readStream) ⇒
Deserialize the input from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeInput"></a>

## serializeInput(writeStream, object)
Serialize the input to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeUTXOInput"></a>

## deserializeUTXOInput(readStream) ⇒
Deserialize the utxo input from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeUTXOInput"></a>

## serializeUTXOInput(writeStream, object)
Serialize the utxo input to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeMessage"></a>

## deserializeMessage(readStream) ⇒
Deserialize the message from binary.

**Kind**: global function  
**Returns**: The deserialized message.  

| Param | Description |
| --- | --- |
| readStream | The message to deserialize. |

<a name="serializeMessage"></a>

## serializeMessage(writeStream, object)
Serialize the message essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeOutputs"></a>

## deserializeOutputs(readStream) ⇒
Deserialize the outputs from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeOutputs"></a>

## serializeOutputs(writeStream, objects)
Serialize the outputs to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| objects | The objects to serialize. |

<a name="deserializeOutput"></a>

## deserializeOutput(readStream) ⇒
Deserialize the output from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeOutput"></a>

## serializeOutput(writeStream, object)
Serialize the output to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeSigLockedSingleOutput"></a>

## deserializeSigLockedSingleOutput(readStream) ⇒
Deserialize the signature locked single output from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeSigLockedSingleOutput"></a>

## serializeSigLockedSingleOutput(writeStream, object)
Serialize the signature locked single output to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializePayload"></a>

## deserializePayload(readStream) ⇒
Deserialize the payload from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializePayload"></a>

## serializePayload(writeStream, object)
Serialize the payload essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeTransactionPayload"></a>

## deserializeTransactionPayload(readStream) ⇒
Deserialize the transaction payload from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeTransactionPayload"></a>

## serializeTransactionPayload(writeStream, object)
Serialize the transaction payload essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeMilestonePayload"></a>

## deserializeMilestonePayload(readStream) ⇒
Deserialize the milestone payload from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeMilestonePayload"></a>

## serializeMilestonePayload(writeStream, object)
Serialize the milestone payload essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeIndexationPayload"></a>

## deserializeIndexationPayload(readStream) ⇒
Deserialize the indexation payload from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeIndexationPayload"></a>

## serializeIndexationPayload(writeStream, object)
Serialize the indexation payload essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeSignature"></a>

## deserializeSignature(readStream) ⇒
Deserialize the signature from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeSignature"></a>

## serializeSignature(writeStream, object)
Serialize the signature to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeEd25519Signature"></a>

## deserializeEd25519Signature(readStream) ⇒
Deserialize the Ed25519 signature from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeEd25519Signature"></a>

## serializeEd25519Signature(writeStream, object)
Serialize the Ed25519 signature to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeTransactionEssence"></a>

## deserializeTransactionEssence(readStream) ⇒
Deserialize the transaction essence from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeTransactionEssence"></a>

## serializeTransactionEssence(writeStream, object)
Serialize the transaction essence to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeUnlockBlocks"></a>

## deserializeUnlockBlocks(readStream) ⇒
Deserialize the unlock blocks from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeUnlockBlocks"></a>

## serializeUnlockBlocks(writeStream, objects)
Serialize the unlock blocks to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| objects | The objects to serialize. |

<a name="deserializeUnlockBlock"></a>

## deserializeUnlockBlock(readStream) ⇒
Deserialize the unlock block from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeUnlockBlock"></a>

## serializeUnlockBlock(writeStream, object)
Serialize the unlock block to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeSignatureUnlockBlock"></a>

## deserializeSignatureUnlockBlock(readStream) ⇒
Deserialize the signature unlock block from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeSignatureUnlockBlock"></a>

## serializeSignatureUnlockBlock(writeStream, object)
Serialize the signature unlock block to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="deserializeReferenceUnlockBlock"></a>

## deserializeReferenceUnlockBlock(readStream) ⇒
Deserialize the reference unlock block from binary.

**Kind**: global function  
**Returns**: The deserialized object.  

| Param | Description |
| --- | --- |
| readStream | The stream to read the data from. |

<a name="serializeReferenceUnlockBlock"></a>

## serializeReferenceUnlockBlock(writeStream, object)
Serialize the reference unlock block to binary.

**Kind**: global function  

| Param | Description |
| --- | --- |
| writeStream | The stream to write the data to. |
| object | The object to serialize. |

<a name="getAddresses"></a>

## getAddresses(seed, basePath, startIndex, count) ⇒
Generate a list of address key pairs.

**Kind**: global function  
**Returns**: A list of the signature key pairs for the addresses.  

| Param | Description |
| --- | --- |
| seed | The seed. |
| basePath | The base path to start looking for addresses. |
| startIndex | The start index to generate from, defaults to 0. |
| count | The number of address seeds, defaults to DEFAULT_CHUNK_SIZE. |

<a name="getAddressesKeyPairs"></a>

## getAddressesKeyPairs(seed, basePath, startIndex, count) ⇒
Generate a list of address key pairs.

**Kind**: global function  
**Returns**: A list of the signature key pairs for the addresses.  

| Param | Description |
| --- | --- |
| seed | The seed. |
| basePath | The base path to start looking for addresses. |
| startIndex | The start index to generate from, defaults to 0. |
| count | The number of address seeds, defaults to DEFAULT_CHUNK_SIZE. |

<a name="getBalance"></a>

## getBalance(client, seed, basePath, startIndex) ⇒
Get the balance for a list of addresses.

**Kind**: global function  
**Returns**: The balance.  

| Param | Description |
| --- | --- |
| client | The client to send the transfer with. |
| seed | The seed. |
| basePath | The base path to start looking for addresses. |
| startIndex | The start index to generate from, defaults to 0. |

<a name="getUnspentAddress"></a>

## getUnspentAddress(client, seed, basePath, startIndex) ⇒
Get the first unspent address.

**Kind**: global function  
**Returns**: The first unspent address.  

| Param | Description |
| --- | --- |
| client | The client to send the transfer with. |
| seed | The seed to use for address generation. |
| basePath | The base path to start looking for addresses. |
| startIndex | Optional start index for the wallet count address, defaults to 0. |

<a name="getUnspentAddresses"></a>

## getUnspentAddresses(client, seed, basePath, startIndex, countLimit) ⇒
Get all the unspent addresses.

**Kind**: global function  
**Returns**: All the unspent addresses.  

| Param | Description |
| --- | --- |
| client | The client to send the transfer with. |
| seed | The seed to use for address generation. |
| basePath | The base path to start looking for addresses. |
| startIndex | Optional start index for the wallet count address, defaults to 0. |
| countLimit | Limit the number of items to find. |

<a name="retrieveData"></a>

## retrieveData(client, messageId) ⇒
Retrieve a data message.

**Kind**: global function  
**Returns**: The message index and data.  

| Param | Description |
| --- | --- |
| client | The client to send the transfer with. |
| messageId | The message id of the data to get. |

<a name="send"></a>

## send(client, seed, basePath, address, amount, startIndex) ⇒
Send a transfer from the balance on the seed.

**Kind**: global function  
**Returns**: The id of the message created and the contructed message.  

| Param | Description |
| --- | --- |
| client | The client to send the transfer with. |
| seed | The seed to use for address generation. |
| basePath | The base path to start looking for addresses. |
| address | The address to send the funds to. |
| amount | The amount to send. |
| startIndex | The start index for the wallet count address, defaults to 0. |

<a name="sendAdvanced"></a>

## sendAdvanced(client, seed, basePath, outputs, startIndex, indexationKey, indexationData) ⇒
Send a transfer from the balance on the seed.

**Kind**: global function  
**Returns**: The id of the message created and the remainder address if one was needed.  

| Param | Description |
| --- | --- |
| client | The client to send the transfer with. |
| seed | The seed to use for address generation. |
| basePath | The base path to start looking for addresses. |
| outputs | The outputs to send. |
| startIndex | Optional start index for the wallet count address, defaults to 0. |
| indexationKey | Optional indexation key. |
| indexationData | Optional index data. |

<a name="sendData"></a>

## sendData(client, indexationKey, indexationData) ⇒
Send a data message.

**Kind**: global function  
**Returns**: The id of the message created and the message.  

| Param | Description |
| --- | --- |
| client | The client to send the transfer with. |
| indexationKey | The index name. |
| indexationData | The index data. |

<a name="logger"></a>

## logger(message, data) ⇒
The logger used by the log methods.

**Kind**: global function  
**Returns**: Nothing.  

| Param | Description |
| --- | --- |
| message | The message to output. |
| data | The data to output. |

<a name="setLogger"></a>

## setLogger(log)
Set the logger for output.

**Kind**: global function  

| Param | Description |
| --- | --- |
| log | The logger. |

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

