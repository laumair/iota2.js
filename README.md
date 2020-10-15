# IOTA2.js

Experimental client library for Chrysalis Part 2 and beyond. Implemeted in TypeScript to strongly type the objects sent and received from the API.

## Installation

```shell
npm install obany/iota2.js
```

## Example

```js
const { SingleNodeClient } = require("@iota/iota2.js");

async function run() {
    const client = new SingleNodeClient("http://localhost:14265");

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

* getAddressBalances - Get the balance for a list of addresses.
* getAddresses - Given a seed, path, start index and count, generate the addresses.
* getAddressesKeyPairs - Given a seed, path, start index and count, generate the address key pairs.
* getAllUnspentAddresses - Given a seed, path, and start index find all the unspent addresses.
* getBalance - Given a seed, path, and start index calculate the balance for the seed.
* getUnspentAddress - Given a seed, path, and start index find the next unspent address.
* retrieveData - Given a message id return the index and data from it.
* send - Given a seed, path, destination address and amount make a single transfer.
* sendAdvanced - Given a seed, path, list of destinations make multiple transfers, can also include index data.
* sendData - Given index and data create a new data message.

## Models

You can see the model definitions for the request and receive objects in the [typings](./typings/api/models) folder.

## More Examples

Please find other examples in the [./examples](./examples) folder.
* Simple - Performs basic API operations.
* Transaction - Demonstrates how to send a transaction and call some of the other higher level functions.