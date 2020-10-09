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
    console.log(`${prefix}\tParent 1 Message Id:`, message.parent1MessageId);
    console.log(`${prefix}\tParent 2 Message Id:`, message.parent2MessageId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFBOzs7O0dBSUc7QUFDSCxTQUFnQixVQUFVLENBQUMsTUFBYyxFQUFFLE9BQWlCO0lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sd0JBQXdCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sd0JBQXdCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekUsVUFBVSxDQUFDLEdBQUcsTUFBTSxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkQ7QUFDTCxDQUFDO0FBUkQsZ0NBUUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLE1BQWMsRUFBRSxjQUFtQztJQUMxRSxJQUFJLGNBQWMsRUFBRTtRQUNoQixJQUFJLGNBQWMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE1BQU0sT0FBTyxHQUFHLGNBQXFDLENBQUM7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0scUJBQXFCLENBQUMsQ0FBQztZQUM1QyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1B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