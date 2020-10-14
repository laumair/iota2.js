"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeIndexationPayload = exports.deserializeIndexationPayload = exports.serializeMilestonePayload = exports.deserializeMilestonePayload = exports.serializeTransactionPayload = exports.deserializeTransactionPayload = exports.serializePayload = exports.deserializePayload = exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH = void 0;
const common_1 = require("./common");
const transaction_1 = require("./transaction");
const unlockBlock_1 = require("./unlockBlock");
exports.MIN_PAYLOAD_LENGTH = common_1.TYPE_LENGTH;
exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + (2 * common_1.UINT64_SIZE) + (2 * 64);
exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + common_1.STRING_LENGTH + common_1.STRING_LENGTH;
exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + common_1.UINT32_SIZE;
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
        const payloadType = readBuffer.readUInt32("payload.type", false);
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
        serializeTransactionPayload(writeBuffer, object);
    }
    else if (object.type === 1) {
        serializeMilestonePayload(writeBuffer, object);
    }
    else if (object.type === 2) {
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
    if (type !== 0) {
        throw new Error(`Type mismatch in payloadTransaction ${type}`);
    }
    const essenceType = readBuffer.readUInt32("payloadTransaction.essenceType", false);
    let essence;
    let unlockBlocks;
    if (essenceType === 0) {
        essence = transaction_1.deserializeTransactionEssence(readBuffer);
        unlockBlocks = unlockBlock_1.deserializeUnlockBlocks(readBuffer);
    }
    else {
        throw new Error(`Unrecognized transaction essence type ${type}`);
    }
    return {
        type,
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
    writeBuffer.writeUInt32("payloadMilestone.type", object.type);
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
    const type = readBuffer.readUInt32("payloadMilestone.type");
    if (type !== 1) {
        throw new Error(`Type mismatch in payloadMilestone ${type}`);
    }
    const index = readBuffer.readUInt64("payloadMilestone.index");
    const timestamp = readBuffer.readUInt64("payloadMilestone.timestamp");
    const inclusionMerkleProof = readBuffer.readFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64);
    const signature = readBuffer.readFixedBufferHex("payloadMilestone.signature", 64);
    return {
        type,
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
    writeBuffer.writeUInt32("payloadMilestone.type", object.type);
    writeBuffer.writeUInt64("payloadMilestone.index", BigInt(object.index));
    writeBuffer.writeUInt64("payloadMilestone.timestamp", BigInt(object.timestamp));
    writeBuffer.writeFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64, object.inclusionMerkleProof);
    writeBuffer.writeFixedBufferHex("payloadMilestone.signature", 64, object.signature);
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
    const type = readBuffer.readUInt32("payloadIndexation.type");
    if (type !== 2) {
        throw new Error(`Type mismatch in payloadIndexation ${type}`);
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
    writeBuffer.writeUInt32("payloadIndexation.type", object.type);
    writeBuffer.writeString("payloadIndexation.index", object.index);
    writeBuffer.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
    writeBuffer.writeFixedBufferHex("payloadIndexation.data", object.data.length / 2, object.data);
}
exports.serializeIndexationPayload = serializeIndexationPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvcGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSxxQ0FBZ0Y7QUFDaEYsK0NBQTJGO0FBQzNGLCtDQUErRTtBQUVsRSxRQUFBLGtCQUFrQixHQUFXLG9CQUFXLENBQUM7QUFDekMsUUFBQSw0QkFBNEIsR0FBVywwQkFBa0IsR0FBRyxDQUFDLENBQUMsR0FBRyxvQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDekYsUUFBQSw2QkFBNkIsR0FBVywwQkFBa0IsR0FBRyxzQkFBYSxHQUFHLHNCQUFhLENBQUM7QUFDM0YsUUFBQSw4QkFBOEIsR0FBVywwQkFBa0IsR0FBRyxvQkFBVyxDQUFDO0FBRXZGOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxVQUFzQjtJQUVyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQywwQkFBa0IsQ0FBQyxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFVBQVUsQ0FBQyxNQUFNLEVBQ2hELGdFQUFnRSwwQkFBa0IsRUFBRSxDQUFDLENBQUM7S0FDN0Y7SUFFRCxNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFOUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDekMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsYUFDOUIsK0JBQStCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDN0Q7SUFFRCxJQUFJLE9BQWlGLENBQUM7SUFFdEYsSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFO1FBQ25CLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWpFLElBQUksV0FB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