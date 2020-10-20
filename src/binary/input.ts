import { ITypeBase } from "../models/ITypeBase";
import { IUTXOInput } from "../models/IUTXOInput";
import { ReadStream } from "../utils/readStream";
import { WriteStream } from "../utils/writeStream";
import { SMALL_TYPE_LENGTH, TRANSACTION_ID_LENGTH, UINT16_SIZE } from "./common";

export const MIN_INPUT_LENGTH: number = SMALL_TYPE_LENGTH;
export const MIN_UTXO_INPUT_LENGTH: number = MIN_INPUT_LENGTH + TRANSACTION_ID_LENGTH + UINT16_SIZE;

/**
 * Deserialize the inputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeInputs(readStream: ReadStream): IUTXOInput[] {
    const numInputs = readStream.readUInt16("inputs.numInputs");

    const inputs: IUTXOInput[] = [];
    for (let i = 0; i < numInputs; i++) {
        inputs.push(deserializeInput(readStream));
    }

    return inputs;
}

/**
 * Serialize the inputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeInputs(writeStream: WriteStream,
    objects: IUTXOInput[]): void {
    writeStream.writeUInt16("inputs.numInputs", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeInput(writeStream, objects[i]);
    }
}

/**
 * Deserialize the input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeInput(readStream: ReadStream): IUTXOInput {
    if (!readStream.hasRemaining(MIN_INPUT_LENGTH)) {
        throw new Error(`Input data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_INPUT_LENGTH}`);
    }

    const type = readStream.readByte("input.type", false);
    let input;

    if (type === 0) {
        input = deserializeUTXOInput(readStream);
    } else {
        throw new Error(`Unrecognized input type ${type}`);
    }

    return input;
}

/**
 * Serialize the input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeInput(writeStream: WriteStream,
    object: IUTXOInput): void {
    if (object.type === 0) {
        serializeUTXOInput(writeStream, object);
    } else {
        throw new Error(`Unrecognized input type ${(object as ITypeBase<unknown>).type}`);
    }
}

/**
 * Deserialize the utxo input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUTXOInput(readStream: ReadStream): IUTXOInput {
    if (!readStream.hasRemaining(MIN_UTXO_INPUT_LENGTH)) {
        throw new Error(`UTXO Input data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_UTXO_INPUT_LENGTH}`);
    }

    const type = readStream.readByte("utxoInput.type");
    if (type !== 0) {
        throw new Error(`Type mismatch in utxoInput ${type}`);
    }

    const transactionId = readStream.readFixedHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH);
    const transactionOutputIndex = readStream.readUInt16("utxoInput.transactionOutputIndex");

    return {
        type,
        transactionId,
        transactionOutputIndex
    };
}

/**
 * Serialize the utxo input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeUTXOInput(writeStream: WriteStream,
    object: IUTXOInput): void {
    writeStream.writeByte("utxoInput.type", object.type);
    writeStream.writeFixedHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH, object.transactionId);
    writeStream.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
}
