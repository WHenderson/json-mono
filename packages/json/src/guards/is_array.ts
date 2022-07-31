import {JsonArray} from "../types";

/**
 * Returns true if value is an array
 * Note that this is not a deep check. Value may hold values which are not JSON compatible.
 *
 * @param value
 */
export function is_array(value: any): value is JsonArray {
    return Array.isArray(value);
}
