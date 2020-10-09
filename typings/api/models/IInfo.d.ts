/**
 * Response from the /info endpoint.
 */
export interface IInfo {
    /**
     * The name of the node software.
     */
    name: string;
    /**
     * The version of the software running on the node.
     */
    version: string;
    /**
     * Is the node healthy.
     */
    isHealthy: boolean;
    /**
     * The public key of the coordinator.
     */
    coordinatorPublicKey: string;
    /**
     * The latest milestone message Id.
     */
    latestMilestoneMessageId: string;
    /**
     * The latest milestone message index;
     */
    latestMilestoneIndex: number;
    /**
     * The latest solid milestone message Id.
     */
    solidMilestoneMessageId: string;
    /**
     * The latest solid milestone message index;
     */
    solidMilestoneIndex: number;
    /**
     * The pruning index;
     */
    pruningIndex: number;
    /**
     * Features supported by the node.
     */
    features: string[];
}
