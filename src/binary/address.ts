import { ED25519 } from "../crypto/ed25519";
import { IEd25519Address } from "../models/IEd25519Address";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
import { BYTE_SIZE } from "./common";

export const MIN_ADDRESS_LENGTH: number = BYTE_SIZE;
export const MIN_ED25519_ADDRESS_LENGTH: number = ED25519.ADDRESS_LENGTH;

/**
 * Deserialize the address from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAddress(readBuffer: ReadBuffer): IEd25519Address {
    if (!readBuffer.hasRemaining(MIN_ADDRESS_LENGTH)) {
        throw new Error(`Address data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_ADDRESS_LENGTH}`);
    }

    const type = readBuffer.readByte("address.type");
    let address;

    if (type === 1) {
        address = deserializeEd25519Address(readBuffer);
    } else {
        throw new Error(`Unrecognized address type ${type}`);
    }

    return address;
}

/**
 * Serialize the address to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeAddress(writeBuffer: WriteBuffer, object: IEd25519Address): void {
    writeBuffer.writeByte("address.type", object.type);

    if (object.type === 1) {
        serializeEd25519Address(writeBuffer, object);
    } else {
        throw new Error(`Unrecognized address type ${object.type}`);
    }
}

/**
 * Deserialize the Ed25519 address from binary.
 * @param readBuffer The buffer to read the data from.
 * @returns The deserialized object.
 */
export function deserializeEd25519Address(readBuffer: ReadBuffer): IEd25519Address {
    if (!readBuffer.hasRemaining(MIN_ED25519_ADDRESS_LENGTH)) {
        throw new Error(`Ed25519 address data is ${readBuffer.length()
            } in length which is less than the minimimum size required of ${MIN_ED25519_ADDRESS_LENGTH}`);
    }

    const address = readBuffer.readFixedBufferHex("ed25519Address.address", ED25519.ADDRESS_LENGTH);

    return {
        type: 1,
        address
    };
}

/**
 * Serialize the ed25519 address to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeEd25519Address(writeBuffer: WriteBuffer, object: IEd25519Address): void {
    writeBuffer.writeFixedBufferHex("ed25519Address.address", ED25519.ADDRESS_LENGTH, object.address);
}
