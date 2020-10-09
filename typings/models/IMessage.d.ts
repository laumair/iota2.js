import { IIndexationPayload } from "./IIndexationPayload";
import { IMilestonePayload } from "./IMilestonePayload";
import { ITransactionPayload } from "./ITransactionPayload";
/**
 * Message layout.
 */
export interface IMessage {
    /**
     * The version of the message.
     */
    version: number;
    /**
     * The parent 1 message id.
     */
    parent1MessageId: string;
    /**
     * The parent 2 message id.
     */
    parent2MessageId: string;
    /**
     * The payload contents.
     */
    payload?: IIndexationPayload | IMilestonePayload | ITransactionPayload;
    /**
     * The nonce for the message.
     */
    nonce?: number;
}
