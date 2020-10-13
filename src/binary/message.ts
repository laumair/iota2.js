import { IMessage } from "../models/IMessage";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
import { BYTE_SIZE, MESSAGE_ID_LENGTH, UINT64_SIZE } from "./common";
import { deserializePayload, MIN_PAYLOAD_LENGTH, serializePayload } from "./payload";

const MIN_MESSAGE_LENGTH: number = BYTE_SIZE +
    (2 * MESSAGE_ID_LENGTH) +
    MIN_PAYLOAD_LENGTH +
    UINT64_SIZE;

/**
 * Deserialize the message from binary.
 * @param readBuffer The message to deserialize.
 * @returns The deserialized message.
 */
export function deserializeMessage(readBuffer: ReadBuffer): IMessage {
    if (!readBuffer.hasRemaining(MIN_MESSAGE_LENGTH)) {
        throw new Error(`Message data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_MESSAGE_LENGTH}`);
    }

    const version = readBuffer.readByte("message.version");
    if (version !== 1) {
        throw new Error(`Unsupported message version number: ${version}`);
    }

    const parent1MessageId = readBuffer.readFixedBufferHex("message.parent1MessageId", MESSAGE_ID_LENGTH);
    const parent2MessageId = readBuffer.readFixedBufferHex("message.parent2MessageId", MESSAGE_ID_LENGTH);

    const payload = deserializePayload(readBuffer);

    const nonce = readBuffer.readFixedBufferHex("message.nonce", UINT64_SIZE);

    const unused = readBuffer.unused();
    if (unused !== 0) {
        throw new Error(`Message data length ${readBuffer.length()
            } has unused data ${unused}`);
    }

    return {
        version,
        payload,
        parent1MessageId,
        parent2MessageId,
        nonce
    };
}

/**
 * Serialize the message essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeMessage(writeBuffer: WriteBuffer,
    object: IMessage): void {
    writeBuffer.writeByte("message.version", object.version);

    writeBuffer.writeFixedBufferHex("message.parent1MessageId", MESSAGE_ID_LENGTH, object.parent1MessageId);
    writeBuffer.writeFixedBufferHex("message.parent2MessageId", MESSAGE_ID_LENGTH, object.parent2MessageId);

    serializePayload(writeBuffer, object.payload);

    writeBuffer.writeFixedBufferHex("message.nonce", UINT64_SIZE, object.nonce ?? "");
}
