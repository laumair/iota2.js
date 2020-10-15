"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUnlockBlock = exports.logOutput = exports.logInput = exports.logSignature = exports.logAddress = exports.logPayload = exports.logMessage = void 0;
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param message The message to log.
 */
function logMessage(prefix, message) {
    console.log(`${prefix}\tVersion:`, message.version);
    console.log(`${prefix}\tParent 1 Message Id:`, message.parent1MessageId);
    console.log(`${prefix}\tParent 2 Message Id:`, message.parent2MessageId);
    logPayload(`${prefix}\t`, message.payload);
    if (message.nonce !== undefined) {
        console.log(`${prefix}\tNonce:`, message.nonce);
    }
}
exports.logMessage = logMessage;
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param unknownPayload The payload.
 */
function logPayload(prefix, unknownPayload) {
    if (unknownPayload) {
        if (unknownPayload.type === 0) {
            const payload = unknownPayload;
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
        }
        else if (unknownPayload.type === 1) {
            const payload = unknownPayload;
            console.log(`${prefix}Milestone Payload`);
            console.log(`${prefix}\tIndex:`, payload.index);
            console.log(`${prefix}\tTimestamp:`, payload.timestamp);
            console.log(`${prefix}\tInclusion Merkle Proof:`, payload.inclusionMerkleProof);
            console.log(`${prefix}\tSignatures:`, payload.signatures);
        }
        else if (unknownPayload.type === 2) {
            const payload = unknownPayload;
            console.log(`${prefix}Indexation Payload`);
            console.log(`${prefix}\tIndex:`, payload.index);
            console.log(`${prefix}\tData:`, Buffer.from(payload.data, "hex").toString());
        }
    }
}
exports.logPayload = logPayload;
/**
 * Log an address to the console.
 * @param prefix The prefix for the output.
 * @param unknownAddress The address to log.
 */
function logAddress(prefix, unknownAddress) {
    if (unknownAddress) {
        if (unknownAddress.type === 1) {
            const address = unknownAddress;
            console.log(`${prefix}Ed25519 Address`);
            console.log(`${prefix}\tAddress:`, address.address);
        }
    }
}
exports.logAddress = logAddress;
/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param unknownSignature The signature to log.
 */
function logSignature(prefix, unknownSignature) {
    if (unknownSignature) {
        if (unknownSignature.type === 1) {
            const signature = unknownSignature;
            console.log(`${prefix}Ed25519 Signature`);
            console.log(`${prefix}\tPublic Key:`, signature.publicKey);
            console.log(`${prefix}\tSignature:`, signature.signature);
        }
    }
}
exports.logSignature = logSignature;
/**
 * Log input to the console.
 * @param prefix The prefix for the output.
 * @param unknownInput The input to log.
 */
function logInput(prefix, unknownInput) {
    if (unknownInput) {
        if (unknownInput.type === 0) {
            const input = unknownInput;
            console.log(`${prefix}UTXO Input`);
            console.log(`${prefix}\tTransaction Id:`, input.transactionId);
            console.log(`${prefix}\tTransaction Output Index:`, input.transactionOutputIndex);
        }
    }
}
exports.logInput = logInput;
/**
 * Log output to the console.
 * @param prefix The prefix for the output.
 * @param unknownOutput The output to log.
 */
function logOutput(prefix, unknownOutput) {
    if (unknownOutput) {
        if (unknownOutput.type === 0) {
            const output = unknownOutput;
            console.log(`${prefix}Signature Locked Single Output`);
            logAddress(`${prefix}\t\t`, output.address);
            console.log(`${prefix}\t\tAmount:`, output.amount);
        }
    }
}
exports.logOutput = logOutput;
/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unknownUnlockBlock The unlock block to log.
 */
function logUnlockBlock(prefix, unknownUnlockBlock) {
    if (unknownUnlockBlock) {
        if (unknownUnlockBlock.type === 0) {
            const unlockBlock = unknownUnlockBlock;
            console.log(`${prefix}\tSignature Unlock Block`);
            logSignature(`${prefix}\t\t\t`, unlockBlock.signature);
        }
        else if (unknownUnlockBlock.type === 1) {
            const unlockBlock = unknownUnlockBlock;
            console.log(`${prefix}\tReference Unlock Block`);
            console.log(`${prefix}\t\tReference:`, unlockBlock.reference);
        }
    }
}
exports.logUnlockBlock = logUnlockBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVlBOzs7O0dBSUc7QUFDSCxTQUFnQixVQUFVLENBQUMsTUFBYyxFQUFFLE9BQWlCO0lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sd0JBQXdCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sd0JBQXdCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekUsVUFBVSxDQUFDLEdBQUcsTUFBTSxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuRDtBQUNMLENBQUM7QUFSRCxnQ0FRQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixVQUFVLENBQUMsTUFBYyxFQUFFLGNBQW1DO0lBQzFFLElBQUksY0FBYyxFQUFFO1FBQ2hCLElBQUksY0FBYyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxPQUFPLEdBQUcsY0FBcUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxDQUFDO1lBQzVDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO29CQUN4QixPQUFPLENBQUMsR0FBRyxD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