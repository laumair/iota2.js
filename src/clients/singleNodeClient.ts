import { ClientError } from "../api/clientError";
import { IAddress } from "../api/models/IAddress";
import { IAddressOutputs } from "../api/models/IAddressOutputs";
import { IChildren } from "../api/models/IChildren";
import { IClient } from "../api/models/IClient";
import { IInfo } from "../api/models/IInfo";
import { IMessageId } from "../api/models/IMessageId";
import { IMessageMetadata } from "../api/models/IMessageMetadata";
import { IMessages } from "../api/models/IMessages";
import { IMilestone } from "../api/models/IMilestone";
import { IOutput } from "../api/models/IOutput";
import { IPeer } from "../api/models/IPeer";
import { IResponse } from "../api/models/IResponse";
import { ITips } from "../api/models/ITips";
import { IMessage } from "../models/IMessage";


/**
 * Client for API communication.
 */
export class SingleNodeClient implements IClient {
    /**
     * The endpoint for the API.
     * @internal
     */
    private readonly _endpoint: string;

    /**
     * Create a new instance of client.
     * @param endpoint The endpoint.
     */
    constructor(endpoint: string) {
        if (!/^https?:\/\/\w+(\.\w+)*(:\d+)?(\/.*)?$/.test(endpoint)) {
            throw new Error("The endpoint is not in the correct format");
        }
        this._endpoint = endpoint.replace(/\/+$/, "");
    }

    /**
     * Get the health of the node.
     * @returns True if the node is healthy.
     */
    public async health(): Promise<boolean> {
        const status = await this.fetchStatus("/health");

        if (status === 200) {
            return true;
        } else if (status === 503) {
            return false;
        }

        throw new ClientError("Unexpected response code", "/health", status);
    }

    /**
     * Get the info about the node.
     * @returns The node information.
     */
    public async info(): Promise<IInfo> {
        return this.fetchJson<never, IInfo>("get", "/api/v1/info");
    }

    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    public async tips(): Promise<ITips> {
        return this.fetchJson<never, ITips>("get", "/api/v1/tips");
    }

    /**
     * Get the message data by id.
     * @param messageId The message to get the data for.
     * @returns The message data.
     */
    public async message(messageId: string): Promise<IMessage> {
        return this.fetchJson<never, IMessage>("get", `/api/v1/messages/${messageId}`);
    }

    /**
     * Get the message metadata by id.
     * @param messageId The message to get the metadata for.
     * @returns The message metadata.
     */
    public async messageMetadata(messageId: string): Promise<IMessageMetadata> {
        return this.fetchJson<never, IMessageMetadata>("get", `/api/v1/messages/${messageId}/metadata`);
    }

    /**
     * Get the message raw data by id.
     * @param messageId The message to get the data for.
     * @returns The message raw data.
     */
    public async messageRaw(messageId: string): Promise<Uint8Array> {
        return this.fetchBinary("get", `/api/v1/messages/${messageId}/raw`);
    }

    /**
     * Submit message.
     * @param message The message to submit.
     * @returns The messageId.
     */
    public async messageSubmit(message: IMessage): Promise<string> {
        const response = await this.fetchJson<IMessage, IMessageId>("post", "/api/v1/messages", message);

        return response.messageId;
    }

    /**
     * Submit message in raw format.
     * @param message The message to submit.
     * @returns The messageId.
     */
    public async messageSubmitRaw(message: Uint8Array): Promise<string> {
        const response = await this.fetchBinary<IMessageId>("post", "/api/v1/messages", message);

        return (response as IMessageId).messageId;
    }

    /**
     * Find messages by index.
     * @param indexationKey The index value.
     * @returns The messageId.
     */
    public async messagesFind(indexationKey: string): Promise<IMessages> {
        return this.fetchJson<unknown, IMessages>(
            "get",
            `/api/v1/messages?index=${encodeURIComponent(indexationKey)}`
        );
    }

    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    public async messageChildren(messageId: string): Promise<IChildren> {
        return this.fetchJson<unknown, IChildren>(
            "get",
            `/api/v1/messages/${messageId}/children`
        );
    }

    /**
     * Find an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    public async output(outputId: string): Promise<IOutput> {
        return this.fetchJson<unknown, IOutput>(
            "get",
            `/api/v1/outputs/${outputId}`
        );
    }

    /**
     * Get the address details.
     * @param address The address to get the details for.
     * @returns The address details.
     */
    public async address(address: string): Promise<IAddress> {
        return this.fetchJson<unknown, IAddress>(
            "get",
            `/api/v1/addresses/${address}`
        );
    }

    /**
     * Get the address outputs.
     * @param address The address to get the outputs for.
     * @returns The address outputs.
     */
    public async addressOutputs(address: string): Promise<IAddressOutputs> {
        return this.fetchJson<unknown, IAddressOutputs>(
            "get",
            `/api/v1/addresses/${address}/outputs`
        );
    }

    /**
     * Get the requested milestone.
     * @param index The index of the milestone to get.
     * @returns The milestone details.
     */
    public async milestone(index: number): Promise<IMilestone> {
        return this.fetchJson<unknown, IMilestone>(
            "get",
            `/api/v1/milestones/${index}`
        );
    }

    /**
     * Get the list of peers.
     * @returns The list of peers.
     */
    public async peers(): Promise<IPeer[]> {
        return this.fetchJson<unknown, IPeer[]>(
            "get",
            "/api/v1/peers"
        );
    }

    /**
     * Add a new peer.
     * @param multiAddress The address of the peer to add.
     * @param alias An optional alias for the peer.
     * @returns The details for the created peer.
     */
    public async peerAdd(multiAddress: string, alias?: string): Promise<IPeer> {
        return this.fetchJson<{
            multiAddress: string;
            alias?: string;
        }, IPeer>(
            "post",
            "/api/v1/peers",
            {
                multiAddress,
                alias
            }
        );
    }

    /**
     * Delete a peer.
     * @param peerId The peer to delete.
     * @returns Nothing.
     */
    public async peerDelete(peerId: string): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        return this.fetchJson<unknown, void>(
            "delete",
            `/api/v1/peers/${peerId}`
        );
    }

    /**
     * Get a peer.
     * @param peerId The peer to delete.
     * @returns The details for the created peer.
     */
    public async peer(peerId: string): Promise<IPeer> {
        return this.fetchJson<unknown, IPeer>(
            "get",
            `/api/v1/peers/${peerId}`
        );
    }

    /**
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     * @internal
     */
    private async fetchStatus(route: string): Promise<number> {
        const response = await fetch(
            `${this._endpoint}${route}`,
            {
                method: "get"
            }
        );

        return response.status;
    }

    /**
     * Perform a request in json format.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    private async fetchJson<T, U>(method: "get" | "post" | "delete", route: string, requestData?: T): Promise<U> {
        const response = await fetch(
            `${this._endpoint}${route}`,
            {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: requestData ? JSON.stringify(requestData) : undefined
            }
        );

        const responseData: IResponse<U> = await response.json();

        if (response.ok && !responseData.error) {
            return responseData.data;
        }

        throw new ClientError(
            responseData.error?.message ?? response.statusText,
            route,
            response.status,
            responseData.error?.code
        );
    }

    /**
     * Perform a request for binary data.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    private async fetchBinary<T>(
        method: "get" | "post",
        route: string,
        requestData?: Uint8Array): Promise<Uint8Array | T> {
        const response = await fetch(
            `${this._endpoint}${route}`,
            {
                method,
                headers: {
                    "Content-Type": "application/octet-stream"
                },
                body: requestData
            }
        );

        let responseData: IResponse<T> | undefined;
        if (response.ok) {
            if (method === "get") {
                return new Uint8Array(await response.arrayBuffer());
            }
            responseData = await response.json();

            if (!responseData?.error) {
                return responseData?.data as T;
            }
        }

        if (!responseData) {
            responseData = await response.json();
        }

        throw new ClientError(
            responseData?.error?.message ?? response.statusText,
            route,
            response.status,
            responseData?.error?.code
        );
    }
}
