"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
/**
 * Class to handle http errors.
 */
class ClientError extends Error {
    /**
     * Create a new instance of ClientError.
     * @param message The message for the error.
     * @param route The route the request was made to.
     * @param httpStatus The http status code.
     * @param code The code in the payload.
     */
    constructor(message, route, httpStatus, code) {
        super(message);
        this.route = route;
        this.httpStatus = httpStatus;
        this.code = code;
    }
}
exports.ClientError = ClientError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50RXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2NsaWVudEVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0gsTUFBYSxXQUFZLFNBQVEsS0FBSztJQWdCbEM7Ozs7OztPQU1HO0lBQ0gsWUFBWSxPQUFlLEVBQUUsS0FBYSxFQUFFLFVBQWtCLEVBQUUsSUFBYTtRQUN6RSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUE3QkQsa0NBNkJDIn0=