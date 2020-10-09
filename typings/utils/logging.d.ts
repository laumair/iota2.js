import { IMessage } from "../api/models/IMessage";
import { ITypeBase } from "../api/models/ITypeBase";
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param message The message to log.
 */
export declare function logMessage(prefix: string, message: IMessage): void;
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param unknownPayload The payload.
 */
export declare function logPayload(prefix: string, unknownPayload?: ITypeBase<unknown>): void;
/**
 * Log an address to the console.
 * @param prefix The prefix for the output.
 * @param unknownAddress The address to log.
 */
export declare function logAddress(prefix: string, unknownAddress?: ITypeBase<unknown>): void;
/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param unknownSignature The signature to log.
 */
export declare function logSignature(prefix: string, unknownSignature?: ITypeBase<unknown>): void;
