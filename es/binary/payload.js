"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeIndexationPayload = exports.deserializeIndexationPayload = exports.serializeMilestonePayload = exports.deserializeMilestonePayload = exports.serializeTransactionPayload = exports.deserializeTransactionPayload = exports.serializePayload = exports.deserializePayload = exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH = void 0;
const common_1 = require("./common");
const transaction_1 = require("./transaction");
const unlockBlock_1 = require("./unlockBlock");
exports.MIN_PAYLOAD_LENGTH = common_1.TYPE_LENGTH;
exports.MIN_MILESTONE_PAYLOAD_LENGTH = (2 * common_1.UINT64_SIZE) + (2 * 64);
exports.MIN_INDEXATION_PAYLOAD_LENGTH = common_1.STRING_LENGTH + common_1.STRING_LENGTH;
exports.MIN_TRANSACTION_PAYLOAD_LENGTH = common_1.UINT32_SIZE;
/**
 * Deserialize the payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializePayload(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_PAYLOAD_LENGTH)) {
        throw new Error(`Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_PAYLOAD_LENGTH}`);
    }
    const payloadLength = readBuffer.readUInt32("payload.length");
    if (!readBuffer.hasRemaining(payloadLength)) {
        throw new Error(`Payload length ${payloadLength} exceeds the remaining data ${readBuffer.unused()}`);
    }
    let payload;
    if (payloadLength > 0) {
        const payloadType = readBuffer.readUInt32("payload.type");
        if (payloadType === 0) {
            payload = deserializeTransactionPayload(readBuffer);
        }
        else if (payloadType === 1) {
            payload = deserializeMilestonePayload(readBuffer);
        }
        else if (payloadType === 2) {
            payload = deserializeIndexationPayload(readBuffer);
        }
        else {
            throw new Error(`Unrecognized payload type ${payloadType}`);
        }
    }
    return payload;
}
exports.deserializePayload = deserializePayload;
/**
 * Serialize the payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializePayload(writeBuffer, object) {
    // Store the location for the payload length and write 0
    // we will rewind and fill in once the size of the payload is known
    const payloadLengthWriteIndex = writeBuffer.getWriteIndex();
    writeBuffer.writeUInt32("payload.length", 0);
    if (!object) {
        // No other data to write
    }
    else if (object.type === 0) {
        writeBuffer.writeUInt32("payload.type", object.type);
        serializeTransactionPayload(writeBuffer, object);
    }
    else if (object.type === 1) {
        writeBuffer.writeUInt32("payload.type", object.type);
        serializeMilestonePayload(writeBuffer, object);
    }
    else if (object.type === 2) {
        writeBuffer.writeUInt32("payload.type", object.type);
        serializeIndexationPayload(writeBuffer, object);
    }
    else {
        throw new Error(`Unrecognized transaction type ${object.type}`);
    }
    const endOfPayloadWriteIndex = writeBuffer.getWriteIndex();
    writeBuffer.setWriteIndex(payloadLengthWriteIndex);
    writeBuffer.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - common_1.UINT32_SIZE);
    writeBuffer.setWriteIndex(endOfPayloadWriteIndex);
}
exports.serializePayload = serializePayload;
/**
 * Deserialize the transaction payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeTransactionPayload(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_TRANSACTION_PAYLOAD_LENGTH)) {
        throw new Error(`Transaction Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_TRANSACTION_PAYLOAD_LENGTH}`);
    }
    const type = readBuffer.readUInt32("payloadTransaction.type");
    let essence;
    let unlockBlocks;
    if (type === 0) {
        essence = transaction_1.deserializeTransactionEssence(readBuffer);
        unlockBlocks = unlockBlock_1.deserializeUnlockBlocks(readBuffer);
    }
    else {
        throw new Error(`Unrecognized transaction type ${type}`);
    }
    return {
        type: 0,
        essence,
        unlockBlocks
    };
}
exports.deserializeTransactionPayload = deserializeTransactionPayload;
/**
 * Serialize the transaction payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeTransactionPayload(writeBuffer, object) {
    writeBuffer.writeUInt32("payloadTransaction.type", object.type);
    if (object.type === 0) {
        transaction_1.serializeTransactionEssence(writeBuffer, object.essence);
        unlockBlock_1.serializeUnlockBlocks(writeBuffer, object.unlockBlocks);
    }
    else {
        throw new Error(`Unrecognized transaction type ${object.type}`);
    }
}
exports.serializeTransactionPayload = serializeTransactionPayload;
/**
 * Deserialize the milestone payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeMilestonePayload(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_MILESTONE_PAYLOAD_LENGTH)) {
        throw new Error(`Milestone Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_MILESTONE_PAYLOAD_LENGTH}`);
    }
    const index = readBuffer.readUInt64("payloadMilestone.index");
    const timestamp = readBuffer.readUInt64("payloadMilestone.timestamp");
    const inclusionMerkleProof = readBuffer.readFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64);
    const signature = readBuffer.readFixedBufferHex("payloadMilestone.signature", 64);
    return {
        type: 1,
        index: Number(index),
        timestamp: Number(timestamp),
        inclusionMerkleProof,
        signature
    };
}
exports.deserializeMilestonePayload = deserializeMilestonePayload;
/**
 * Serialize the milestone payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeMilestonePayload(writeBuffer, object) {
    writeBuffer.writeUInt64("payloadMilestone.index", BigInt(object.index));
    writeBuffer.writeUInt64("payloadMilestone.dataLength", BigInt(object.timestamp));
    writeBuffer.writeFixedBufferHex("payloadMilestone.data", 64, object.inclusionMerkleProof);
    writeBuffer.writeFixedBufferHex("payloadMilestone.data", 64, object.signature);
}
exports.serializeMilestonePayload = serializeMilestonePayload;
/**
 * Deserialize the indexation payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
function deserializeIndexationPayload(readBuffer) {
    if (!readBuffer.hasRemaining(exports.MIN_INDEXATION_PAYLOAD_LENGTH)) {
        throw new Error(`Indexation Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_INDEXATION_PAYLOAD_LENGTH}`);
    }
    const index = readBuffer.readString("payloadIndexation.index");
    const dataLength = readBuffer.readUInt32("payloadIndexation.dataLength");
    const data = readBuffer.readFixedBufferHex("payloadIndexation.data", dataLength);
    return {
        type: 2,
        index,
        data
    };
}
exports.deserializeIndexationPayload = deserializeIndexationPayload;
/**
 * Serialize the indexation payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
function serializeIndexationPayload(writeBuffer, object) {
    writeBuffer.writeString("payloadIndexation.index", object.index);
    writeBuffer.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
    writeBuffer.writeFixedBufferHex("payloadIndexation.data", object.data.length / 2, object.data);
}
exports.serializeIndexationPayload = serializeIndexationPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvcGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSxxQ0FBZ0Y7QUFDaEYsK0NBQTJGO0FBQzNGLCtDQUErRTtBQUVsRSxRQUFBLGtCQUFrQixHQUFXLG9CQUFXLENBQUM7QUFDekMsUUFBQSw0QkFBNEIsR0FBVyxDQUFDLENBQUMsR0FBRyxvQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDcEUsUUFBQSw2QkFBNkIsR0FBVyxzQkFBYSxHQUFHLHNCQUFhLENBQUM7QUFDdEUsUUFBQSw4QkFBOEIsR0FBVyxvQkFBVyxDQUFDO0FBRWxFOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxVQUFzQjtJQUVyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQywwQkFBa0IsQ0FBQyxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsQ0FBQyxNQUFNLEVBQ2hELGdFQUFnRSwwQkFBa0IsRUFBRSxDQUFDLENBQUM7S0FDN0Y7SUFFRCxNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFOUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDekMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsYUFDOUIsK0JBQStCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDN0Q7SUFFRCxJQUFJLE9BQWlGLENBQUM7SUFFdEYsSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFO1FBQ25CLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFMUQsSUFBSSxXQUFXLEtBQUssQ0FBQyxFQUFFO1lBQ25CLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQyxV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