"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bip32Path = void 0;
/**
 * Class to help with bip32 paths.
 */
class Bip32Path {
    /**
     * Create a new instance of Bip32Path.
     * @param initialPath Initial path to create.
     */
    constructor(initialPath) {
        this._path = [];
        if (initialPath) {
            if (!/^m((?:\/\d+')*)$/.test(initialPath)) {
                throw new Error("Bip32 Path is not in correct format");
            }
            this._path = initialPath
                .slice(2)
                .replace(/'/g, "")
                .split("/")
                .map(p => Number.parseInt(p, 10));
        }
    }
    /**
     * Converts the path to a string.
     * @returns The path as a string.
     */
    toString() {
        return `m/${this._path.map(v => `${v}'`).join("/")}`;
    }
    /**
     * Push a new index on to the path.
     * @param index The index to add to the path.
     */
    push(index) {
        this._path.push(index);
    }
    /**
     * Pop an index from the path.
     * @returns The popped index
     */
    pop() {
        return this._path.pop();
    }
}
exports.Bip32Path = Bip32Path;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlwMzJQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by9iaXAzMlBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7O0dBRUc7QUFDSCxNQUFhLFNBQVM7SUFNbEI7OztPQUdHO0lBQ0gsWUFBWSxXQUFvQjtRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLFdBQVcsRUFBRTtZQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQzthQUMxRDtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVztpQkFDbkIsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDUixPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztpQkFDakIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVE7UUFDWCxPQUFPLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLElBQUksQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxHQUFHO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDSjtBQS9DRCw4QkErQ0MifQ==