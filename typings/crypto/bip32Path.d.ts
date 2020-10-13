/**
 * Class to help with bip32 paths.
 */
export declare class Bip32Path {
    /**
     * The path.
     */
    private readonly _path;
    /**
     * Create a new instance of Bip32Path.
     * @param initialPath Initial path to create.
     */
    constructor(initialPath?: string);
    /**
     * Converts the path to a string.
     * @returns The path as a string.
     */
    toString(): string;
    /**
     * Push a new index on to the path.
     * @param index The index to add to the path.
     */
    push(index: number): void;
    /**
     * Pop an index from the path.
     * @returns The popped index
     */
    pop(): number | undefined;
}
