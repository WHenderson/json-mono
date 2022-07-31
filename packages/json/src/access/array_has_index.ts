import {JsonArray} from "../types";

/**
 * Returns true if index is a valid index into value
 * Note: Checks that index is a valid index and within the length of value
 *
 * @param value
 * @param index
 */
export function array_has_index(value: JsonArray, index: number): boolean {
    return Number.isInteger(index) && index >= 0 && index < value.length;
}
