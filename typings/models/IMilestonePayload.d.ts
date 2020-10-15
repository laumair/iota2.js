import { ITypeBase } from "./ITypeBase";
/**
 * Milestone payload.
 */
export interface IMilestonePayload extends ITypeBase<1> {
    /**
     * The index name.
     */
    index: number;
    /**
     * The timestamp of the milestone.
     */
    timestamp: number;
    /**
     * The merkle proof inclusions.
     */
    inclusionMerkleProof: string;
    /**
     * The signatures.
     */
    signatures: string[];
}
