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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVlBOzs7O0dBSUc7QUFDSCxTQUFnQixVQUFVLENBQUMsTUFBYyxFQUFFLE9BQWlCO0lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sd0JBQXdCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sd0JBQXdCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekUsVUFBVSxDQUFDLEdBQUcsTUFBTSxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkQ7QUFDTCxDQUFDO0FBUkQsZ0NBUUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLE1BQWMsRUFBRSxjQUFtQztJQUMxRSxJQUFJLGNBQWMsRUFBRTtRQUNoQixJQUFJLGNBQWMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE1BQU0sT0FBTyxHQUFHLGNBQXFDLENBQUM7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0scUJBQXFCLENBQUMsQ0FBQztZQUM1QyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1B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