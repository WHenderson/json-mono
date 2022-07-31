import {JsonObject} from "../types";

/**
 * Returns true if value contains the given key
 *
 * @param value
 * @param key
 */
export function object_has_key(value: JsonObject, key: string): boolean {
    return ({}).hasOwnProperty.call(value, key);
}
