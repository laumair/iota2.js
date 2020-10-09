"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logSignature = exports.logAddress = exports.logPayload = exports.logMessage = void 0;
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param message The message to log.
 */
function logMessage(prefix, message) {
    console.log(`${prefix}\tVersion:`, message.version);
    console.log(`${prefix}\tParent 1:`, message.parent1);
    console.log(`${prefix}\tParent 2:`, message.parent2);
    logPayload(`${prefix}\t`, message.payload);
    if (message.nonce) {
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
                        if (input.type === 0) {
                            console.log(`${prefix}\tUTXO Input`);
                            console.log(`${prefix}\t\t\tTransaction Id:`, input.transactionId);
                            console.log(`${prefix}\t\t\tTransaction Output Index:`, input.transactionOutputIndex);
                        }
                    }
                }
                if (payload.essence.outputs) {
                    console.log(`${prefix}\tOutputs:`, payload.essence.outputs.length);
                    for (const output of payload.essence.outputs) {
                        if (output.type === 0) {
                            console.log(`${prefix}\tSignature Locked Single Output`);
                            logAddress(`${prefix}\t\t\t`, output.address);
                            console.log(`${prefix}\t\t\tAmount:`, output.amount);
                        }
                    }
                }
                logPayload(`${prefix}\t`, payload.essence.payload);
            }
            if (payload.unlockBlocks) {
                console.log(`${prefix}\tUnlock Blocks:`, payload.unlockBlocks.length);
                for (const unlockBlock of payload.unlockBlocks) {
                    if (unlockBlock.type === 0) {
                        console.log(`${prefix}\tSignature Unlock Block`);
                        logSignature(`${prefix}\t\t\t`, unlockBlock.signature);
                    }
                    else if (unlockBlock.type === 1) {
                        console.log(`${prefix}\tReference Unlock Block`);
                        console.log(`${prefix}\t\tReference:`, unlockBlock.reference);
                    }
                }
            }
        }
        else if (unknownPayload.type === 1) {
            const payload = unknownPayload;
            console.log(`${prefix}Milestone Payload`);
            console.log(`${prefix}\tIndex:`, payload.index);
            console.log(`${prefix}\tTimestamp:`, payload.timestamp);
            console.log(`${prefix}\tInclusion Merkle Proof:`, payload.inclusionMerkleProof);
            console.log(`${prefix}\tSignature:`, payload.signature);
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
            console.log(`${prefix}\tAddress:`, signature.address);
        }
    }
}
exports.logSignature = logSignature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFBOzs7O0dBSUc7QUFDSCxTQUFnQixVQUFVLENBQUMsTUFBYyxFQUFFLE9BQWlCO0lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sYUFBYSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxhQUFhLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELFVBQVUsQ0FBQyxHQUFHLE1BQU0sSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25EO0FBQ0wsQ0FBQztBQVJELGdDQVFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFVBQVUsQ0FBQyxNQUFjLEVBQUUsY0FBbUM7SUFDMUUsSUFBSSxjQUFjLEVBQUU7UUFDaEIsSUFBSSxjQUFjLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUMzQixNQUFNLE9BQU8sR0FBRyxjQUFxQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLHFCQUFxQixDQUFDLENBQUM7WUFDNUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7b0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLFdBQVcs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