import { ISigLockedSingleOutput } from "../models/ISigLockedSingleOutput";
import { ITypeBase } from "../models/ITypeBase";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
import { deserializeAddress, MIN_ADDRESS_LENGTH, MIN_ED25519_ADDRESS_LENGTH, serializeAddress } from "./address";
import { BYTE_SIZE } from "./common";

export const MIN_OUTPUT_LENGTH: number = BYTE_SIZE;
export const MIN_SIG_LOCKED_OUTPUT_LENGTH: number = BYTE_SIZE + MIN_ADDRESS_LENGTH + MIN_ED25519_ADDRESS_LENGTH;

/**
 * Deserialize the outputs from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeOutputs(readBuffer: ReadBuffer): ISigLockedSingleOutput[] {
    const numOutputs = readBuffer.readUInt16("outputs.numOutputs");

    const inputs: ISigLockedSingleOutput[] = [];
    for (let i = 0; i < numOutputs; i++) {
        inputs.push(deserializeOutput(readBuffer));
    }

    return inputs;
}

/**
 * Serialize the outputs to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeOutputs(writeBuffer: WriteBuffer,
    objects: ISigLockedSingleOutput[]): void {
    writeBuffer.writeUInt16("outputs.numOutputs", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeOutput(writeBuffer, objects[i]);
    }
}

/**
 * Deserialize the output from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeOutput(readBuffer: ReadBuffer): ISigLockedSingleOutput {
    if (!readBuffer.hasRemaining(MIN_OUTPUT_LENGTH)) {
        throw new Error(`Output data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_OUTPUT_LENGTH}`);
    }

    const type = readBuffer.readByte("output.type");
    let input;

    if (type === 0) {
        input = deserializeSigLockedSingleOutput(readBuffer);
    } else {
        throw new Error(`Unrecognized output type ${type}`);
    }

    return input;
}

/**
 * Serialize the output to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeOutput(writeBuffer: WriteBuffer,
    object: ISigLockedSingleOutput): void {
    writeBuffer.writeByte("output.type", object.type);

    if (object.type === 0) {
        serializeSigLockedSingleOutput(writeBuffer, object);
    } else {
        throw new Error(`Unrecognized output type ${(object as ITypeBase<unknown>).type}`);
    }
}

/**
 * Deserialize the signature locked single output from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSigLockedSingleOutput(readBuffer: ReadBuffer): ISigLockedSingleOutput {
    if (!readBuffer.hasRemaining(MIN_SIG_LOCKED_OUTPUT_LENGTH)) {
        throw new Error(`Signature Locked Single Output data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_SIG_LOCKED_OUTPUT_LENGTH}`);
    }

    const address = deserializeAddress(readBuffer);
    const amount = readBuffer.readUInt64("address.amount");

    return {
        type: 0,
        address,
        amount: Number(amount)
    };
}


/**
 * Serialize the signature locked single output to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeSigLockedSingleOutput(writeBuffer: WriteBuffer,
    object: ISigLockedSingleOutput): void {
    serializeAddress(writeBuffer, object.address);
    writeBuffer.writeUInt64("address.amount", BigInt(object.amount));
}
