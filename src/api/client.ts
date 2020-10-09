import fetch from "cross-fetch";
import { IMessage } from "../models/IMessage";
import { ClientError } from "./clientError";
import { IAddress } from "./models/IAddress";
import { IAddressOutputs } from "./models/IAddressOutputs";
import { IChildren } from "./models/IChildren";
import { IInfo } from "./models/IInfo";
import { IMessageMetadata } from "./models/IMessageMetadata";
import { IMessages } from "./models/IMessages";
import { IMilestone } from "./models/IMilestone";
import { IOutput } from "./models/IOutput";
import { IResponse } from "./models/IResponse";
import { ITips } from "./models/ITips";

/**
 * Client for API communication.
 */
export class Client {
    /**
     * The endpoint for the API.
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
    public async messageRaw(messageId: string): Promise<Buffer> {
        return this.fetchBinary(`/api/v1/messages/${messageId}/raw`);
    }

    /**
     * Submit message.
     * @param message The message to submit.
     * @returns The messageId.
     */
    public async messageSubmit(message: IMessage): Promise<string> {
        const response = await this.fetchJson<IMessage, {
            messageId: string;
        }>("post", "/api/v1/messages", message);

        return response.messageId;
    }

    /**
     * Find messages by index.
     * @param index The index value.
     * @returns The messageId.
     */
    public async messagesFind(index: string): Promise<IMessages> {
        return this.fetchJson<unknown, IMessages>(
            "get",
            `/api/v1/messages?index=${encodeURIComponent(index)}`
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
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     * @private
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
     * @private
     */
    private async fetchJson<T, U>(method: "get" | "post", route: string, requestData?: T): Promise<U> {
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
     * @param route The route of the request.
     * @returns The response.
     * @private
     */
    private async fetchBinary(route: string): Promise<Buffer> {
        const response = await fetch(
            `${this._endpoint}${route}`,
            {
                method: "get",
                headers: {
                    "Content-Type": "application/octet-stream"
                }
            }
        );

        if (response.ok) {
            return Buffer.from(await response.arrayBuffer());
        }

        const responseData = await response.json();

        throw new ClientError(
            responseData.error?.message ?? response.statusText,
            route,
            response.status,
            responseData.error?.code
        );
    }
}
