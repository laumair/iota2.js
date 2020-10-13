import { ITransactionEssence } from "../models/ITransactionEssence";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
import { ARRAY_LENGTH, UINT32_SIZE } from "./common";
import { deserializeInputs, serializeInputs } from "./input";
import { deserializeOutputs, serializeOutputs } from "./output";
import { deserializePayload, serializePayload } from "./payload";

export const MIN_TRANSACTION_ESSENCE_LENGTH: number = (2 * ARRAY_LENGTH) + UINT32_SIZE;

/**
 * Deserialize the transaction essence from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTransactionEssence(readBuffer: ReadBuffer): ITransactionEssence {
    if (!readBuffer.hasRemaining(MIN_TRANSACTION_ESSENCE_LENGTH)) {
        throw new Error(`Transaction essence data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_TRANSACTION_ESSENCE_LENGTH}`);
    }

    const inputs = deserializeInputs(readBuffer);
    const outputs = deserializeOutputs(readBuffer);

    const payload = deserializePayload(readBuffer);
    if (payload && payload.type !== 2) {
        throw new Error("Transaction essence can only contain embedded Indexation Payload");
    }

    return {
        type: 0,
        inputs,
        outputs,
        payload
    };
}

/**
 * Serialize the transaction essence to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeTransactionEssence(writeBuffer: WriteBuffer,
    object: ITransactionEssence): void {
    serializeInputs(writeBuffer, object.inputs);
    serializeOutputs(writeBuffer, object.outputs);
    serializePayload(writeBuffer, object.payload);
}
