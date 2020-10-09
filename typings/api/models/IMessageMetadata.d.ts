/**
 * Response from the /tips endpoint.
 */
export interface IMessageMetadata {
    /**
     * The message id.
     */
    messageId: string;
    /**
     * The message id of parent 1.
     */
    parent1MessageId: string;
    /**
     * The message id of parent 2.
     */
    parent2MessageId: string;
    /**
     * Is the message solid.
     */
    isSolid?: boolean;
    /**
     * Should the message be promoted.
     */
    shouldPromote?: boolean;
    /**
     * Should the message be reattached.
     */
    shouldReattach?: boolean;
}
