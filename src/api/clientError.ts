/**
 * Class to handle http errors.
 */
export class ClientError extends Error {
    /**
     * The route the request was made to.
     */
    public route: string;

    /**
     * The HTTP status code returned.
     */
    public httpStatus: number;

    /**
     * The code return in the payload.
     */
    public code?: string;

    /**
     * Create a new instance of ClientError.
     * @param message The message for the error.
     * @param route The route the request was made to.
     * @param httpStatus The http status code.
     * @param code The code in the payload.
     */
    constructor(message: string, route: string, httpStatus: number, code?: string) {
        super(message);
        this.route = route;
        this.httpStatus = httpStatus;
        this.code = code;
    }
}
