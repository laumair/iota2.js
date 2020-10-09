## Classes

<dl>
<dt><a href="#Client">Client</a></dt>
<dd><p>Client for API communication.</p>
</dd>
<dt><a href="#ClientError">ClientError</a></dt>
<dd><p>Class to handle http errors.</p>
</dd>
<dt><a href="#ED25519">ED25519</a></dt>
<dd><p>Class to help with ED25519 Signature scheme.</p>
</dd>
</dl>

## Functions

<dl>
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

<a name="ED25519"></a>

## ED25519
Class to help with ED25519 Signature scheme.

**Kind**: global class  

* [ED25519](#ED25519)
    * [.VERSION](#ED25519.VERSION)
    * [.PUBLIC_KEY_SIZE](#ED25519.PUBLIC_KEY_SIZE)
    * [.SIGNATURE_SIZE](#ED25519.SIGNATURE_SIZE)
    * [.keyPairFromSeed(seed)](#ED25519.keyPairFromSeed) ⇒
    * [.privateSign(keyPair, buffer)](#ED25519.privateSign) ⇒

<a name="ED25519.VERSION"></a>

### ED25519.VERSION
Version for signature scheme.

**Kind**: static property of [<code>ED25519</code>](#ED25519)  
<a name="ED25519.PUBLIC_KEY_SIZE"></a>

### ED25519.PUBLIC\_KEY\_SIZE
Public Key size.

**Kind**: static property of [<code>ED25519</code>](#ED25519)  
<a name="ED25519.SIGNATURE_SIZE"></a>

### ED25519.SIGNATURE\_SIZE
Signature size for signing scheme.

**Kind**: static property of [<code>ED25519</code>](#ED25519)  
<a name="ED25519.keyPairFromSeed"></a>

### ED25519.keyPairFromSeed(seed) ⇒
Generate a key pair from the seed.

**Kind**: static method of [<code>ED25519</code>](#ED25519)  
**Returns**: The key pair.  

| Param | Description |
| --- | --- |
| seed | The seed to generate the key pair from. |

<a name="ED25519.privateSign"></a>

### ED25519.privateSign(keyPair, buffer) ⇒
Privately sign the data.

**Kind**: static method of [<code>ED25519</code>](#ED25519)  
**Returns**: The signature.  

| Param | Description |
| --- | --- |
| keyPair | The key pair to sign with. |
| buffer | The data to sign. |

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

