import { ITypeBase } from "../models/ITypeBase";
import { IUTXOInput } from "../models/IUTXOInput";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
import { SMALL_TYPE_LENGTH, TRANSACTION_ID_LENGTH, UINT16_SIZE } from "./common";

export const MIN_INPUT_LENGTH: number = SMALL_TYPE_LENGTH;
export const MIN_UTXO_INPUT_LENGTH: number = MIN_INPUT_LENGTH + TRANSACTION_ID_LENGTH + UINT16_SIZE;

/**
 * Deserialize the inputs from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeInputs(readBuffer: ReadBuffer): IUTXOInput[] {
    const numInputs = readBuffer.readUInt16("inputs.numInputs");

    const inputs: IUTXOInput[] = [];
    for (let i = 0; i < numInputs; i++) {
        inputs.push(deserializeInput(readBuffer));
    }

    return inputs;
}

/**
 * Serialize the inputs to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeInputs(writeBuffer: WriteBuffer,
    objects: IUTXOInput[]): void {
    writeBuffer.writeUInt16("inputs.numInputs", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeInput(writeBuffer, objects[i]);
    }
}

/**
 * Deserialize the input from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeInput(readBuffer: ReadBuffer): IUTXOInput {
    if (!readBuffer.hasRemaining(MIN_INPUT_LENGTH)) {
        throw new Error(`Input data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_INPUT_LENGTH}`);
    }

    const type = readBuffer.readByte("input.type", false);
    let input;

    if (type === 0) {
        input = deserializeUTXOInput(readBuffer);
    } else {
        throw new Error(`Unrecognized input type ${type}`);
    }

    return input;
}

/**
 * Serialize the input to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeInput(writeBuffer: WriteBuffer,
    object: IUTXOInput): void {
    if (object.type === 0) {
        serializeUTXOInput(writeBuffer, object);
    } else {
        throw new Error(`Unrecognized input type ${(object as ITypeBase<unknown>).type}`);
    }
}

/**
 * Deserialize the utxo input from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUTXOInput(readBuffer: ReadBuffer): IUTXOInput {
    if (!readBuffer.hasRemaining(MIN_UTXO_INPUT_LENGTH)) {
        throw new Error(`UTXO Input data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_UTXO_INPUT_LENGTH}`);
    }

    const type = readBuffer.readByte("utxoInput.type");
    if (type !== 0) {
        throw new Error(`Type mismatch in utxoInput ${type}`);
    }

    const transactionId = readBuffer.readFixedBufferHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH);
    const transactionOutputIndex = readBuffer.readUInt16("utxoInput.transactionOutputIndex");

    return {
        type,
        transactionId,
        transactionOutputIndex
    };
}

/**
 * Serialize the utxo input to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeUTXOInput(writeBuffer: WriteBuffer,
    object: IUTXOInput): void {
    writeBuffer.writeByte("utxoInput.type", object.type);
    writeBuffer.writeFixedBufferHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH, object.transactionId);
    writeBuffer.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
}
