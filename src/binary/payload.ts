import { IIndexationPayload } from "../models/IIndexationPayload";
import { IMilestonePayload } from "../models/IMilestonePayload";
import { ITransactionPayload } from "../models/ITransactionPayload";
import { ITypeBase } from "../models/ITypeBase";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
import { BYTE_SIZE, STRING_LENGTH, TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE } from "./common";
import { deserializeTransactionEssence, serializeTransactionEssence } from "./transaction";
import { deserializeUnlockBlocks, serializeUnlockBlocks } from "./unlockBlock";

export const MIN_PAYLOAD_LENGTH: number = TYPE_LENGTH;
export const MIN_MILESTONE_PAYLOAD_LENGTH: number = MIN_PAYLOAD_LENGTH + (2 * UINT64_SIZE) + 64 + BYTE_SIZE;
export const MIN_INDEXATION_PAYLOAD_LENGTH: number = MIN_PAYLOAD_LENGTH + STRING_LENGTH + STRING_LENGTH;
export const MIN_TRANSACTION_PAYLOAD_LENGTH: number = MIN_PAYLOAD_LENGTH + UINT32_SIZE;

/**
 * Deserialize the payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializePayload(readBuffer: ReadBuffer):
    IIndexationPayload | IMilestonePayload | ITransactionPayload | undefined {
    if (!readBuffer.hasRemaining(MIN_PAYLOAD_LENGTH)) {
        throw new Error(`Payload data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_PAYLOAD_LENGTH}`);
    }

    const payloadLength = readBuffer.readUInt32("payload.length");

    if (!readBuffer.hasRemaining(payloadLength)) {
        throw new Error(`Payload length ${payloadLength
            } exceeds the remaining data ${readBuffer.unused()}`);
    }

    let payload: IIndexationPayload | IMilestonePayload | ITransactionPayload | undefined;

    if (payloadLength > 0) {
        const payloadType = readBuffer.readUInt32("payload.type", false);

        if (payloadType === 0) {
            payload = deserializeTransactionPayload(readBuffer);
        } else if (payloadType === 1) {
            payload = deserializeMilestonePayload(readBuffer);
        } else if (payloadType === 2) {
            payload = deserializeIndexationPayload(readBuffer);
        } else {
            throw new Error(`Unrecognized payload type ${payloadType}`);
        }
    }

    return payload;
}

/**
 * Serialize the payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializePayload(writeBuffer: WriteBuffer,
    object: IIndexationPayload | IMilestonePayload | ITransactionPayload | undefined): void {
    // Store the location for the payload length and write 0
    // we will rewind and fill in once the size of the payload is known
    const payloadLengthWriteIndex = writeBuffer.getWriteIndex();
    writeBuffer.writeUInt32("payload.length", 0);

    if (!object) {
        // No other data to write
    } else if (object.type === 0) {
        serializeTransactionPayload(writeBuffer, object);
    } else if (object.type === 1) {
        serializeMilestonePayload(writeBuffer, object);
    } else if (object.type === 2) {
        serializeIndexationPayload(writeBuffer, object);
    } else {
        throw new Error(`Unrecognized transaction type ${(object as ITypeBase<unknown>).type}`);
    }

    const endOfPayloadWriteIndex = writeBuffer.getWriteIndex();
    writeBuffer.setWriteIndex(payloadLengthWriteIndex);
    writeBuffer.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - UINT32_SIZE);
    writeBuffer.setWriteIndex(endOfPayloadWriteIndex);
}

/**
 * Deserialize the transaction payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTransactionPayload(readBuffer: ReadBuffer): ITransactionPayload {
    if (!readBuffer.hasRemaining(MIN_TRANSACTION_PAYLOAD_LENGTH)) {
        throw new Error(`Transaction Payload data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_TRANSACTION_PAYLOAD_LENGTH}`);
    }

    const type = readBuffer.readUInt32("payloadTransaction.type");
    if (type !== 0) {
        throw new Error(`Type mismatch in payloadTransaction ${type}`);
    }

    const essenceType = readBuffer.readUInt32("payloadTransaction.essenceType", false);
    let essence;
    let unlockBlocks;

    if (essenceType === 0) {
        essence = deserializeTransactionEssence(readBuffer);
        unlockBlocks = deserializeUnlockBlocks(readBuffer);
    } else {
        throw new Error(`Unrecognized transaction essence type ${type}`);
    }

    return {
        type,
        essence,
        unlockBlocks
    };
}

/**
 * Serialize the transaction payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeTransactionPayload(writeBuffer: WriteBuffer,
    object: ITransactionPayload): void {
    writeBuffer.writeUInt32("payloadMilestone.type", object.type);

    if (object.type === 0) {
        serializeTransactionEssence(writeBuffer, object.essence);
        serializeUnlockBlocks(writeBuffer, object.unlockBlocks);
    } else {
        throw new Error(`Unrecognized transaction type ${(object as ITypeBase<unknown>).type}`);
    }
}

/**
 * Deserialize the milestone payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeMilestonePayload(readBuffer: ReadBuffer): IMilestonePayload {
    if (!readBuffer.hasRemaining(MIN_MILESTONE_PAYLOAD_LENGTH)) {
        throw new Error(`Milestone Payload data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_MILESTONE_PAYLOAD_LENGTH}`);
    }

    const type = readBuffer.readUInt32("payloadMilestone.type");
    if (type !== 1) {
        throw new Error(`Type mismatch in payloadMilestone ${type}`);
    }
    const index = readBuffer.readUInt64("payloadMilestone.index");
    const timestamp = readBuffer.readUInt64("payloadMilestone.timestamp");
    const inclusionMerkleProof = readBuffer.readFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64);
    const signaturesCount = readBuffer.readByte("payloadMilestone.signaturesCount");
    const signatures = [];
    for (let i = 0; i < signaturesCount; i++) {
        signatures.push(readBuffer.readFixedBufferHex("payloadMilestone.signature", 64));
    }

    return {
        type,
        index: Number(index),
        timestamp: Number(timestamp),
        inclusionMerkleProof,
        signatures
    };
}

/**
 * Serialize the milestone payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeMilestonePayload(writeBuffer: WriteBuffer,
    object: IMilestonePayload): void {
    writeBuffer.writeUInt32("payloadMilestone.type", object.type);
    writeBuffer.writeUInt64("payloadMilestone.index", BigInt(object.index));
    writeBuffer.writeUInt64("payloadMilestone.timestamp", BigInt(object.timestamp));
    writeBuffer.writeFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64, object.inclusionMerkleProof);
    writeBuffer.writeByte("payloadMilestone.signaturesCount", object.signatures.length);
    for (let i = 0; i < object.signatures.length; i++) {
        writeBuffer.writeFixedBufferHex("payloadMilestone.signature", 64, object.signatures[i]);
    }
}

/**
 * Deserialize the indexation payload from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeIndexationPayload(readBuffer: ReadBuffer): IIndexationPayload {
    if (!readBuffer.hasRemaining(MIN_INDEXATION_PAYLOAD_LENGTH)) {
        throw new Error(`Indexation Payload data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_INDEXATION_PAYLOAD_LENGTH}`);
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

/**
 * Serialize the indexation payload essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeIndexationPayload(writeBuffer: WriteBuffer,
    object: IIndexationPayload): void {
    writeBuffer.writeUInt32("payloadIndexation.type", object.type);
    writeBuffer.writeString("payloadIndexation.index", object.index);
    writeBuffer.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
    writeBuffer.writeFixedBufferHex("payloadIndexation.data", object.data.length / 2, object.data);
}
