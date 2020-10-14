# IOTA2.js

Experimental client library for Chrysalis Part 2 and beyond. Implemeted in TypeScript to strongly type the objects sent and received from the API.

## Installation

```shell
npm install obany/iota2.js
```

## Example

```js
const { Client } = require("@iota/iota2.js");

async function run() {
    const client = new Client("http://localhost:14265");

    const info = await client.info();
    console.log("Node Info");
    console.log("\tName:", info.name);
    console.log("\tVersion:", info.version);
    console.log("\tIs Healthy:", info.isHealthy);
    console.log("\tCoordinator Public Key:", info.coordinatorPublicKey);
    console.log("\tLatest Milestone Message Id:", info.latestMilestoneMessageId);
    console.log("\tLatest Milestone Index:", info.latestMilestoneIndex);
    console.log("\tSolid Milestone Message Id:", info.solidMilestoneMessageId);
    console.log("\tSolid Milestone Index:", info.solidMilestoneIndex);
    console.log("\tPruning Index:", info.pruningIndex);
    console.log("\tFeatures:", info.features);
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
```

## API Endpoints

These methods are also implemented.

* health()
* info()
* tips()
* messageSubmit(message)
* message(messageId)
* messageMetadata(messageId)
* messageRaw(messageId)
* messageChildren(messageId)
* messagesFind(index)
* output(outputId)
* address(address)
* addressOutputs(address)
* milestone(index)

## High level operations

There are also high level operations:

* sendTransfer
* sendData

## Models

You can see the model definitions for the request and receive objects in the [typings](./typings/api/models) folder.

## More Examples

Please find other examples in the [./examples](./examples) folder.
* Simple - Performs basic API operations.
* Transaction - Demonstrates how to send a transaction.