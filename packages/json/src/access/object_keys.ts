import {JsonObject} from "../types";

/**
 * Returns all keys within value.
 *
 * @param value
 */
export function object_keys(value: JsonObject): string[] {
    return Object.getOwnPropertyNames(value);
}
