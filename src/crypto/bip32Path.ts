/**
 * Class to help with bip32 paths.
 */
export class Bip32Path {
    /**
     * The path.
     */
    private readonly _path: number[];

    /**
     * Create a new instance of Bip32Path.
     * @param initialPath Initial path to create.
     */
    constructor(initialPath?: string) {
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
    public toString(): string {
        return `m/${this._path.map(v => `${v}'`).join("/")}`;
    }

    /**
     * Push a new index on to the path.
     * @param index The index to add to the path.
     */
    public push(index: number): void {
        this._path.push(index);
    }

    /**
     * Pop an index from the path.
     * @returns The popped index
     */
    public pop(): number | undefined {
        return this._path.pop();
    }
}
