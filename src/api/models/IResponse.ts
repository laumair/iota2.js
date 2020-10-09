/**
 * Base response data.
 */
export interface IResponse<T> {
    /**
     * The data in the response.
     */
    data: T;

    /**
     * Optional error in the response.
     */
    error: {
        /**
         * The code for the error response.
         */
        code: string;

        /**
         * A more descriptive version of the error.
         */
        message: string;
    };
}
