/// <reference types="node" />
import { IMessage } from "../models/IMessage";
import { IAddress } from "./models/IAddress";
import { IAddressOutputs } from "./models/IAddressOutputs";
import { IChildren } from "./models/IChildren";
import { IInfo } from "./models/IInfo";
import { IMessageMetadata } from "./models/IMessageMetadata";
import { IMessages } from "./models/IMessages";
import { IMilestone } from "./models/IMilestone";
import { IOutput } from "./models/IOutput";
import { ITips } from "./models/ITips";
/**
 * Client for API communication.
 */
export declare class Client {
    /**
     * The endpoint for the API.
     */
    private readonly _endpoint;
    /**
     * Create a new instance of client.
     * @param endpoint The endpoint.
     */
    constructor(endpoint: string);
    /**
     * Get the health of the node.
     * @returns True if the node is healthy.
     */
    health(): Promise<boolean>;
    /**
     * Get the info about the node.
     * @returns The node information.
     */
    info(): Promise<IInfo>;
    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    tips(): Promise<ITips>;
    /**
     * Get the message data by id.
     * @param messageId The message to get the data for.
     * @returns The message data.
     */
    message(messageId: string): Promise<IMessage>;
    /**
     * Get the message metadata by id.
     * @param messageId The message to get the metadata for.
     * @returns The message metadata.
     */
    messageMetadata(messageId: string): Promise<IMessageMetadata>;
    /**
     * Get the message raw data by id.
     * @param messageId The message to get the data for.
     * @returns The message raw data.
     */
    messageRaw(messageId: string): Promise<Buffer>;
    /**
     * Submit message.
     * @param message The message to submit.
     * @returns The messageId.
     */
    messageSubmit(message: IMessage): Promise<string>;
    /**
     * Find messages by index.
     * @param index The index value.
     * @returns The messageId.
     */
    messagesFind(index: string): Promise<IMessages>;
    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    messageChildren(messageId: string): Promise<IChildren>;
    /**
     * Find an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    output(outputId: string): Promise<IOutput>;
    /**
     * Get the address details.
     * @param address The address to get the details for.
     * @returns The address details.
     */
    address(address: string): Promise<IAddress>;
    /**
     * Get the address outputs.
     * @param address The address to get the outputs for.
     * @returns The address outputs.
     */
    addressOutputs(address: string): Promise<IAddressOutputs>;
    /**
     * Get the requested milestone.
     * @param index The index of the milestone to get.
     * @returns The milestone details.
     */
    milestone(index: number): Promise<IMilestone>;
    /**
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     * @private
     */
    private fetchStatus;
    /**
     * Perform a request in json format.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @private
     */
    private fetchJson;
    /**
     * Perform a request for binary data.
     * @param route The route of the request.
     * @returns The response.
     * @private
     */
    private fetchBinary;
}
