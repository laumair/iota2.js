import { Ed25519 } from "../crypto/ed25519";
import { IEd25519Signature } from "../models/IEd25519Signature";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
import { SMALL_TYPE_LENGTH } from "./common";

export const MIN_SIGNATURE_LENGTH: number = SMALL_TYPE_LENGTH;
export const MIN_ED25519_SIGNATURE_LENGTH: number =
    MIN_SIGNATURE_LENGTH + Ed25519.SIGNATURE_SIZE + Ed25519.PUBLIC_KEY_SIZE;

/**
 * Deserialize the signature from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSignature(readBuffer: ReadBuffer): IEd25519Signature {
    if (!readBuffer.hasRemaining(MIN_SIGNATURE_LENGTH)) {
        throw new Error(`Signature data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_SIGNATURE_LENGTH}`);
    }

    const type = readBuffer.readByte("signature.type", false);
    let input;

    if (type === 1) {
        input = deserializeEd25519Signature(readBuffer);
    } else {
        throw new Error(`Unrecognized signature type ${type}`);
    }

    return input;
}

/**
 * Serialize the signature to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeSignature(writeBuffer: WriteBuffer,
    object: IEd25519Signature): void {
    if (object.type === 1) {
        serializeEd25519Signature(writeBuffer, object);
    } else {
        throw new Error(`Unrecognized signature type ${object.type}`);
    }
}

/**
 * Deserialize the Ed25519 signature from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeEd25519Signature(readBuffer: ReadBuffer): IEd25519Signature {
    if (!readBuffer.hasRemaining(MIN_ED25519_SIGNATURE_LENGTH)) {
        throw new Error(`Ed25519 signature data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_ED25519_SIGNATURE_LENGTH}`);
    }

    const type = readBuffer.readByte("ed25519Signature.type");
    if (type !== 1) {
        throw new Error(`Type mismatch in ed25519Signature ${type}`);
    }

    const publicKey = readBuffer.readFixedBufferHex("ed25519Signature.publicKey", Ed25519.PUBLIC_KEY_SIZE);
    const signature = readBuffer.readFixedBufferHex("ed25519Signature.signature", Ed25519.SIGNATURE_SIZE);

    return {
        type,
        publicKey,
        signature
    };
}

/**
 * Serialize the Ed25519 signature to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeEd25519Signature(writeBuffer: WriteBuffer,
    object: IEd25519Signature): void {
    writeBuffer.writeByte("ed25519Signature.type", object.type);
    writeBuffer.writeFixedBufferHex("ed25519Signature.publicKey", Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
    writeBuffer.writeFixedBufferHex("ed25519Signature.signature", Ed25519.SIGNATURE_SIZE, object.signature);
}
