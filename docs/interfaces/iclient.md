**[@iota/iota2.js](../README.md)**

> [Globals](../README.md) / IClient

# Interface: IClient

Client interface definition for API communication.

## Hierarchy

* **IClient**

## Implemented by

* [SingleNodeClient](../classes/singlenodeclient.md)

## Index

### Methods

* [address](iclient.md#address)
* [addressOutputs](iclient.md#addressoutputs)
* [health](iclient.md#health)
* [info](iclient.md#info)
* [message](iclient.md#message)
* [messageChildren](iclient.md#messagechildren)
* [messageMetadata](iclient.md#messagemetadata)
* [messageRaw](iclient.md#messageraw)
* [messageSubmit](iclient.md#messagesubmit)
* [messageSubmitRaw](iclient.md#messagesubmitraw)
* [messagesFind](iclient.md#messagesfind)
* [milestone](iclient.md#milestone)
* [output](iclient.md#output)
* [tips](iclient.md#tips)

## Methods

### address

▸ **address**(`address`: string): Promise\<[IAddress](iaddress.md)>

Get the address details.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`address` | string | The address to get the details for. |

**Returns:** Promise\<[IAddress](iaddress.md)>

The address details.

___

### addressOutputs

▸ **addressOutputs**(`address`: string): Promise\<[IAddressOutputs](iaddressoutputs.md)>

Get the address outputs.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`address` | string | The address to get the outputs for. |

**Returns:** Promise\<[IAddressOutputs](iaddressoutputs.md)>

The address outputs.

___

### health

▸ **health**(): Promise\<boolean>

Get the health of the node.

**Returns:** Promise\<boolean>

True if the node is healthy.

___

### info

▸ **info**(): Promise\<[IInfo](iinfo.md)>

Get the info about the node.

**Returns:** Promise\<[IInfo](iinfo.md)>

The node information.

___

### message

▸ **message**(`messageId`: string): Promise\<[IMessage](imessage.md)>

Get the message data by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to get the data for. |

**Returns:** Promise\<[IMessage](imessage.md)>

The message data.

___

### messageChildren

▸ **messageChildren**(`messageId`: string): Promise\<[IChildren](ichildren.md)>

Get the children of a message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The id of the message to get the children for. |

**Returns:** Promise\<[IChildren](ichildren.md)>

The messages children.

___

### messageMetadata

▸ **messageMetadata**(`messageId`: string): Promise\<[IMessageMetadata](imessagemetadata.md)>

Get the message metadata by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to get the metadata for. |

**Returns:** Promise\<[IMessageMetadata](imessagemetadata.md)>

The message metadata.

___

### messageRaw

▸ **messageRaw**(`messageId`: string): Promise\<Uint8Array>

Get the message raw data by id.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messageId` | string | The message to get the data for. |

**Returns:** Promise\<Uint8Array>

The message raw data.

___

### messageSubmit

▸ **messageSubmit**(`message`: [IMessage](imessage.md)): Promise\<string>

Submit message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | [IMessage](imessage.md) | The message to submit. |

**Returns:** Promise\<string>

The messageId.

___

### messageSubmitRaw

▸ **messageSubmitRaw**(`message`: Uint8Array): Promise\<string>

Submit message in raw format.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | Uint8Array | The message to submit. |

**Returns:** Promise\<string>

The messageId.

___

### messagesFind

▸ **messagesFind**(`idnexationKey`: string): Promise\<[IMessages](imessages.md)>

Find messages by index.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`idnexationKey` | string | The index value. |

**Returns:** Promise\<[IMessages](imessages.md)>

The messageId.

___

### milestone

▸ **milestone**(`index`: number): Promise\<[IMilestone](imilestone.md)>

Get the requested milestone.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | The index of the milestone to get. |

**Returns:** Promise\<[IMilestone](imilestone.md)>

The milestone details.

___

### output

▸ **output**(`outputId`: string): Promise\<[IOutput](ioutput.md)>

Find an output by its identifier.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`outputId` | string | The id of the output to get. |

**Returns:** Promise\<[IOutput](ioutput.md)>

The output details.

___

### tips

▸ **tips**(): Promise\<[ITips](itips.md)>

Get the tips from the node.

**Returns:** Promise\<[ITips](itips.md)>

The tips.
