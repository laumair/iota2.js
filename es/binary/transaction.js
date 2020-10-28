"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTransactionEssence = exports.deserializeTransactionEssence = exports.MIN_TRANSACTION_ESSENCE_LENGTH = void 0;
var common_1 = require("./common");
var input_1 = require("./input");
var output_1 = require("./output");
var payload_1 = require("./payload");
exports.MIN_TRANSACTION_ESSENCE_LENGTH = common_1.SMALL_TYPE_LENGTH + (2 * common_1.ARRAY_LENGTH) + common_1.UINT32_SIZE;
/**
 * Deserialize the transaction essence from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeTransactionEssence(readStream) {
    if (!readStream.hasRemaining(exports.MIN_TRANSACTION_ESSENCE_LENGTH)) {
        throw new Error("Transaction essence data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_TRANSACTION_ESSENCE_LENGTH);
    }
    var type = readStream.readByte("transactionEssence.type");
    if (type !== 0) {
        throw new Error("Type mismatch in transactionEssence " + type);
    }
    var inputs = input_1.deserializeInputs(readStream);
    var outputs = output_1.deserializeOutputs(readStream);
    var payload = payload_1.deserializePayload(readStream);
    if (payload && payload.type !== 2) {
        throw new Error("Transaction essence can only contain embedded Indexation Payload");
    }
    return {
        type: type,
        inputs: inputs,
        outputs: outputs,
        payload: payload
    };
}
exports.deserializeTransactionEssence = deserializeTransactionEssence;
/**
 * Serialize the transaction essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeTransactionEssence(writeStream, object) {
    writeStream.writeByte("transactionEssence.type", object.type);
    input_1.serializeInputs(writeStream, object.inputs);
    output_1.serializeOutputs(writeStream, object.outputs);
    payload_1.serializePayload(writeStream, object.payload);
}
exports.serializeTransactionEssence = serializeTransactionEssence;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L3RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLG1DQUF3RTtBQUN4RSxpQ0FBNkQ7QUFDN0QsbUNBQWdFO0FBQ2hFLHFDQUFpRTtBQUVwRCxRQUFBLDhCQUE4QixHQUFXLDBCQUFpQixHQUFHLENBQUMsQ0FBQyxHQUFHLHFCQUFZLENBQUMsR0FBRyxvQkFBVyxDQUFDO0FBRTNHOzs7O0dBSUc7QUFDSCxTQUFnQiw2QkFBNkIsQ0FBQyxVQUFzQjtJQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxzQ0FBOEIsQ0FBQyxFQUFFO1FBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQStCLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ0Usc0NBQWdDLENBQUMsQ0FBQztLQUN6RztJQUVELElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM1RCxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF1QyxJQUFNLENBQUMsQ0FBQztLQUNsRTtJQUVELElBQU0sTUFBTSxHQUFHLHlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLElBQU0sT0FBTyxHQUFHLDJCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLElBQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztLQUN2RjtJQUVELE9BQU87UUFDSCxJQUFJLE1BQUE7UUFDSixNQUFNLFFBQUE7UUFDTixPQUFPLFNBQUE7UUFDUCxPQUFPLFNBQUE7S0FDVixDQUFDO0FBQ04sQ0FBQztBQXpCRCxzRUF5QkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsMkJBQTJCLENBQUMsV0FBd0IsRUFDaEUsTUFBMkI7SUFDM0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsdUJBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLHlCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsMEJBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBTkQsa0VBTUMifQ==