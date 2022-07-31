import {JsonContainer} from "../types";

/**
 * Returns true if value is an object or array type
 * Note that this is not a deep check. Value may hold values which are not JSON compatible.
 *
 * @param value
 */
export function is_container(value: any): value is JsonContainer {
    return value !== null && typeof value === 'object';
}
