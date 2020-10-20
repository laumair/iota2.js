import { IIndexationPayload } from "../models/IIndexationPayload";
import { IMilestonePayload } from "../models/IMilestonePayload";
import { ITransactionPayload } from "../models/ITransactionPayload";
import { ITypeBase } from "../models/ITypeBase";
import { ReadStream } from "../utils/readStream";
import { WriteStream } from "../utils/writeStream";
import { BYTE_SIZE, STRING_LENGTH, TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE } from "./common";
import { deserializeTransactionEssence, serializeTransactionEssence } from "./transaction";
import { deserializeUnlockBlocks, serializeUnlockBlocks } from "./unlockBlock";

export const MIN_PAYLOAD_LENGTH: number = TYPE_LENGTH;
export const MIN_MILESTONE_PAYLOAD_LENGTH: number = MIN_PAYLOAD_LENGTH + (2 * UINT64_SIZE) + 64 + BYTE_SIZE;
export const MIN_INDEXATION_PAYLOAD_LENGTH: number = MIN_PAYLOAD_LENGTH + STRING_LENGTH + STRING_LENGTH;
export const MIN_TRANSACTION_PAYLOAD_LENGTH: number = MIN_PAYLOAD_LENGTH + UINT32_SIZE;

/**
 * Deserialize the payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializePayload(readStream: ReadStream):
    IIndexationPayload | IMilestonePayload | ITransactionPayload | undefined {
    if (!readStream.hasRemaining(MIN_PAYLOAD_LENGTH)) {
        throw new Error(`Payload data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_PAYLOAD_LENGTH}`);
    }

    const payloadLength = readStream.readUInt32("payload.length");

    if (!readStream.hasRemaining(payloadLength)) {
        throw new Error(`Payload length ${payloadLength
            } exceeds the remaining data ${readStream.unused()}`);
    }

    let payload: IIndexationPayload | IMilestonePayload | ITransactionPayload | undefined;

    if (payloadLength > 0) {
        const payloadType = readStream.readUInt32("payload.type", false);

        if (payloadType === 0) {
            payload = deserializeTransactionPayload(readStream);
        } else if (payloadType === 1) {
            payload = deserializeMilestonePayload(readStream);
        } else if (payloadType === 2) {
            payload = deserializeIndexationPayload(readStream);
        } else {
            throw new Error(`Unrecognized payload type ${payloadType}`);
        }
    }

    return payload;
}

/**
 * Serialize the payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializePayload(writeStream: WriteStream,
    object: IIndexationPayload | IMilestonePayload | ITransactionPayload | undefined): void {
    // Store the location for the payload length and write 0
    // we will rewind and fill in once the size of the payload is known
    const payloadLengthWriteIndex = writeStream.getWriteIndex();
    writeStream.writeUInt32("payload.length", 0);

    if (!object) {
        // No other data to write
    } else if (object.type === 0) {
        serializeTransactionPayload(writeStream, object);
    } else if (object.type === 1) {
        serializeMilestonePayload(writeStream, object);
    } else if (object.type === 2) {
        serializeIndexationPayload(writeStream, object);
    } else {
        throw new Error(`Unrecognized transaction type ${(object as ITypeBase<unknown>).type}`);
    }

    const endOfPayloadWriteIndex = writeStream.getWriteIndex();
    writeStream.setWriteIndex(payloadLengthWriteIndex);
    writeStream.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - UINT32_SIZE);
    writeStream.setWriteIndex(endOfPayloadWriteIndex);
}

/**
 * Deserialize the transaction payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTransactionPayload(readStream: ReadStream): ITransactionPayload {
    if (!readStream.hasRemaining(MIN_TRANSACTION_PAYLOAD_LENGTH)) {
        throw new Error(`Transaction Payload data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_TRANSACTION_PAYLOAD_LENGTH}`);
    }

    const type = readStream.readUInt32("payloadTransaction.type");
    if (type !== 0) {
        throw new Error(`Type mismatch in payloadTransaction ${type}`);
    }

    const essenceType = readStream.readUInt32("payloadTransaction.essenceType", false);
    let essence;
    let unlockBlocks;

    if (essenceType === 0) {
        essence = deserializeTransactionEssence(readStream);
        unlockBlocks = deserializeUnlockBlocks(readStream);
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
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTransactionPayload(writeStream: WriteStream,
    object: ITransactionPayload): void {
    writeStream.writeUInt32("payloadMilestone.type", object.type);

    if (object.type === 0) {
        serializeTransactionEssence(writeStream, object.essence);
        serializeUnlockBlocks(writeStream, object.unlockBlocks);
    } else {
        throw new Error(`Unrecognized transaction type ${(object as ITypeBase<unknown>).type}`);
    }
}

/**
 * Deserialize the milestone payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeMilestonePayload(readStream: ReadStream): IMilestonePayload {
    if (!readStream.hasRemaining(MIN_MILESTONE_PAYLOAD_LENGTH)) {
        throw new Error(`Milestone Payload data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_MILESTONE_PAYLOAD_LENGTH}`);
    }

    const type = readStream.readUInt32("payloadMilestone.type");
    if (type !== 1) {
        throw new Error(`Type mismatch in payloadMilestone ${type}`);
    }
    const index = readStream.readUInt64("payloadMilestone.index");
    const timestamp = readStream.readUInt64("payloadMilestone.timestamp");
    const inclusionMerkleProof = readStream.readFixedHex("payloadMilestone.inclusionMerkleProof", 64);
    const signaturesCount = readStream.readByte("payloadMilestone.signaturesCount");
    const signatures = [];
    for (let i = 0; i < signaturesCount; i++) {
        signatures.push(readStream.readFixedHex("payloadMilestone.signature", 64));
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
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeMilestonePayload(writeStream: WriteStream,
    object: IMilestonePayload): void {
    writeStream.writeUInt32("payloadMilestone.type", object.type);
    writeStream.writeUInt64("payloadMilestone.index", BigInt(object.index));
    writeStream.writeUInt64("payloadMilestone.timestamp", BigInt(object.timestamp));
    writeStream.writeFixedHex("payloadMilestone.inclusionMerkleProof", 64, object.inclusionMerkleProof);
    writeStream.writeByte("payloadMilestone.signaturesCount", object.signatures.length);
    for (let i = 0; i < object.signatures.length; i++) {
        writeStream.writeFixedHex("payloadMilestone.signature", 64, object.signatures[i]);
    }
}

/**
 * Deserialize the indexation payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeIndexationPayload(readStream: ReadStream): IIndexationPayload {
    if (!readStream.hasRemaining(MIN_INDEXATION_PAYLOAD_LENGTH)) {
        throw new Error(`Indexation Payload data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_INDEXATION_PAYLOAD_LENGTH}`);
    }

    const type = readStream.readUInt32("payloadIndexation.type");
    if (type !== 2) {
        throw new Error(`Type mismatch in payloadIndexation ${type}`);
    }
    const index = readStream.readString("payloadIndexation.index");
    const dataLength = readStream.readUInt32("payloadIndexation.dataLength");
    const data = readStream.readFixedHex("payloadIndexation.data", dataLength);

    return {
        type: 2,
        index,
        data
    };
}

/**
 * Serialize the indexation payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeIndexationPayload(writeStream: WriteStream,
    object: IIndexationPayload): void {
    writeStream.writeUInt32("payloadIndexation.type", object.type);
    writeStream.writeString("payloadIndexation.index", object.index);
    writeStream.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
    writeStream.writeFixedHex("payloadIndexation.data", object.data.length / 2, object.data);
}
