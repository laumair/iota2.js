import { Ed25519Address } from "../crypto/ed25519Address";
import { IEd25519Address } from "../models/IEd25519Address";
import { ReadStream } from "../utils/readStream";
import { WriteStream } from "../utils/writeStream";
import { SMALL_TYPE_LENGTH } from "./common";

export const MIN_ADDRESS_LENGTH: number = SMALL_TYPE_LENGTH;
export const MIN_ED25519_ADDRESS_LENGTH: number = MIN_ADDRESS_LENGTH + Ed25519Address.ADDRESS_LENGTH;

/**
 * Deserialize the address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAddress(readStream: ReadStream): IEd25519Address {
    if (!readStream.hasRemaining(MIN_ADDRESS_LENGTH)) {
        throw new Error(`Address data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_ADDRESS_LENGTH}`);
    }

    const type = readStream.readByte("address.type", false);
    let address;

    if (type === 1) {
        address = deserializeEd25519Address(readStream);
    } else {
        throw new Error(`Unrecognized address type ${type}`);
    }

    return address;
}

/**
 * Serialize the address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAddress(writeStream: WriteStream, object: IEd25519Address): void {
    if (object.type === 1) {
        serializeEd25519Address(writeStream, object);
    } else {
        throw new Error(`Unrecognized address type ${object.type}`);
    }
}

/**
 * Deserialize the Ed25519 address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeEd25519Address(readStream: ReadStream): IEd25519Address {
    if (!readStream.hasRemaining(MIN_ED25519_ADDRESS_LENGTH)) {
        throw new Error(`Ed25519 address data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_ED25519_ADDRESS_LENGTH}`);
    }

    const type = readStream.readByte("ed25519Address.type");
    if (type !== 1) {
        throw new Error(`Type mismatch in ed25519Address ${type}`);
    }

    const address = readStream.readFixedHex("ed25519Address.address", Ed25519Address.ADDRESS_LENGTH);

    return {
        type,
        address
    };
}

/**
 * Serialize the ed25519 address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeEd25519Address(writeStream: WriteStream, object: IEd25519Address): void {
    writeStream.writeByte("ed25519Address.type", object.type);
    writeStream.writeFixedHex("ed25519Address.address", Ed25519Address.ADDRESS_LENGTH, object.address);
}
