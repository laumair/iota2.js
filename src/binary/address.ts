import { Ed25519 } from "../crypto/ed25519";
import { IEd25519Address } from "../models/IEd25519Address";
import { ReadBuffer } from "../utils/readBuffer";
import { WriteBuffer } from "../utils/writeBuffer";
import { SMALL_TYPE_LENGTH } from "./common";

export const MIN_ADDRESS_LENGTH: number = SMALL_TYPE_LENGTH;
export const MIN_ED25519_ADDRESS_LENGTH: number = MIN_ADDRESS_LENGTH + Ed25519.ADDRESS_LENGTH;

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

    const type = readBuffer.readByte("address.type", false);
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

    const type = readBuffer.readByte("ed25519Address.type");
    if (type !== 1) {
        throw new Error(`Type mismatch in ed25519Address ${type}`);
    }

    const address = readBuffer.readFixedBufferHex("ed25519Address.address", Ed25519.ADDRESS_LENGTH);

    return {
        type,
        address
    };
}

/**
 * Serialize the ed25519 address to binary.
 * @param writeBuffer The buffer to write the data to.
 * @param object The object to serialize.
 */
export function serializeEd25519Address(writeBuffer: WriteBuffer, object: IEd25519Address): void {
    writeBuffer.writeByte("ed25519Address.type", object.type);
    writeBuffer.writeFixedBufferHex("ed25519Address.address", Ed25519.ADDRESS_LENGTH, object.address);
}
