import { IGossipMetrics } from "./IGossipMetrics";

/**
 * Peer details.
 */
export interface IPeer {
    /**
     * The id of the peer.
     */
    id: string;

    /**
     * The addresses of the peer.
     */
    multiAddresses: string[];

    /**
     * The alias of the peer.
     */
    alias?: string;

    /**
     * The relation of the peer.
     */
    relation: string;

    /**
     * Is it connected.
     */
    connected: boolean;

    /**
     * Gossip metrics for the peer.
     */
    gossipMetrics: IGossipMetrics;
}
