import {JsonObject} from "../types";

/**
 * Returns true if value is an object (and not an array)
 * Note that this is not a deep check. Value may hold values which are not JSON compatible.
 *
 * @param value
 */
export function is_object(value: any): value is JsonObject {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}
