/* eslint-disable no-bitwise */
/**
 * Array helper methods.
 */
export class ArrayHelper {
    /**
     * Ar the two array equals.
     * @param array1 The first array.
     * @param array2 The second arry.
     * @returns True if the arrays are equal.
     */
    public static equal(
        array1: ArrayLike<unknown> | undefined,
        array2: ArrayLike<unknown> | undefined): boolean {
        if (!array1 || !array2 || array1.length !== array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }

        return true;
    }
}
