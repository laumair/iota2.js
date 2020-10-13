import { IEd25519Address } from "../models/IEd25519Address";
import { IEd25519Signature } from "../models/IEd25519Signature";
import { IIndexationPayload } from "../models/IIndexationPayload";
import { IMessage } from "../models/IMessage";
import { IMilestonePayload } from "../models/IMilestonePayload";
import { IReferenceUnlockBlock } from "../models/IReferenceUnlockBlock";
import { ISigLockedSingleOutput } from "../models/ISigLockedSingleOutput";
import { ISignatureUnlockBlock } from "../models/ISignatureUnlockBlock";
import { ITransactionPayload } from "../models/ITransactionPayload";
import { ITypeBase } from "../models/ITypeBase";
import { IUTXOInput } from "../models/IUTXOInput";

/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param message The message to log.
 */
export function logMessage(prefix: string, message: IMessage): void {
    console.log(`${prefix}\tVersion:`, message.version);
    console.log(`${prefix}\tParent 1 Message Id:`, message.parent1MessageId);
    console.log(`${prefix}\tParent 2 Message Id:`, message.parent2MessageId);
    logPayload(`${prefix}\t`, message.payload);
    if (message.nonce) {
        console.log(`${prefix}\tNonce:`, message.nonce);
    }
}

/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param unknownPayload The payload.
 */
export function logPayload(prefix: string, unknownPayload?: ITypeBase<unknown>): void {
    if (unknownPayload) {
        if (unknownPayload.type === 0) {
            const payload = unknownPayload as ITransactionPayload;
            console.log(`${prefix}Transaction Payload`);
            if (payload.essence.type === 0) {
                if (payload.essence.inputs) {
                    console.log(`${prefix}\tInputs:`, payload.essence.inputs.length);
                    for (const input of payload.essence.inputs) {
                        logInput(`${prefix}\t\t`, input);
                    }
                }
                if (payload.essence.outputs) {
                    console.log(`${prefix}\tOutputs:`, payload.essence.outputs.length);
                    for (const output of payload.essence.outputs) {
                        logOutput(`${prefix}\t\t`, output);
                    }
                }
                logPayload(`${prefix}\t`, payload.essence.payload);
            }
            if (payload.unlockBlocks) {
                console.log(`${prefix}\tUnlock Blocks:`, payload.unlockBlocks.length);
                for (const unlockBlock of payload.unlockBlocks) {
                    logUnlockBlock(`${prefix}\t\t`, unlockBlock);
                }
            }
        } else if (unknownPayload.type === 1) {
            const payload = unknownPayload as IMilestonePayload;
            console.log(`${prefix}Milestone Payload`);
            console.log(`${prefix}\tIndex:`, payload.index);
            console.log(`${prefix}\tTimestamp:`, payload.timestamp);
            console.log(`${prefix}\tInclusion Merkle Proof:`, payload.inclusionMerkleProof);
            console.log(`${prefix}\tSignature:`, payload.signature);
        } else if (unknownPayload.type === 2) {
            const payload = unknownPayload as IIndexationPayload;
            console.log(`${prefix}Indexation Payload`);
            console.log(`${prefix}\tIndex:`, payload.index);
            console.log(`${prefix}\tData:`, Buffer.from(payload.data, "hex").toString());
        }
    }
}

/**
 * Log an address to the console.
 * @param prefix The prefix for the output.
 * @param unknownAddress The address to log.
 */
export function logAddress(prefix: string, unknownAddress?: ITypeBase<unknown>): void {
    if (unknownAddress) {
        if (unknownAddress.type === 1) {
            const address = unknownAddress as IEd25519Address;
            console.log(`${prefix}Ed25519 Address`);
            console.log(`${prefix}\tAddress:`, address.address);
        }
    }
}

/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param unknownSignature The signature to log.
 */
export function logSignature(prefix: string, unknownSignature?: ITypeBase<unknown>): void {
    if (unknownSignature) {
        if (unknownSignature.type === 1) {
            const signature = unknownSignature as IEd25519Signature;
            console.log(`${prefix}Ed25519 Signature`);
            console.log(`${prefix}\tPublic Key:`, signature.publicKey);
            console.log(`${prefix}\tSignature:`, signature.signature);
        }
    }
}

/**
 * Log input to the console.
 * @param prefix The prefix for the output.
 * @param unknownInput The input to log.
 */
export function logInput(prefix: string, unknownInput?: ITypeBase<unknown>): void {
    if (unknownInput) {
        if (unknownInput.type === 0) {
            const input = unknownInput as IUTXOInput;
            console.log(`${prefix}UTXO Input`);
            console.log(`${prefix}\tTransaction Id:`, input.transactionId);
            console.log(`${prefix}\tTransaction Output Index:`, input.transactionOutputIndex);
        }
    }
}

/**
 * Log output to the console.
 * @param prefix The prefix for the output.
 * @param unknownOutput The output to log.
 */
export function logOutput(prefix: string, unknownOutput?: ITypeBase<unknown>): void {
    if (unknownOutput) {
        if (unknownOutput.type === 0) {
            const output = unknownOutput as ISigLockedSingleOutput;
            console.log(`${prefix}Signature Locked Single Output`);
            logAddress(`${prefix}\t\t`, output.address);
            console.log(`${prefix}\t\tAmount:`, output.amount);
        }
    }
}

/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unknownUnlockBlock The unlock block to log.
 */
export function logUnlockBlock(prefix: string, unknownUnlockBlock?: ITypeBase<unknown>): void {
    if (unknownUnlockBlock) {
        if (unknownUnlockBlock.type === 0) {
            const unlockBlock = unknownUnlockBlock as ISignatureUnlockBlock;
            console.log(`${prefix}\tSignature Unlock Block`);
            logSignature(`${prefix}\t\t\t`, unlockBlock.signature);
        } else if (unknownUnlockBlock.type === 1) {
            const unlockBlock = unknownUnlockBlock as IReferenceUnlockBlock;
            console.log(`${prefix}\tReference Unlock Block`);
            console.log(`${prefix}\t\tReference:`, unlockBlock.reference);
        }
    }
}
