import {JsonObject} from "../types";

/**
 * Returns true if value contains the given key with a defined value
 *
 * @param value
 * @param key
 */
export function object_has_defined_key(value: JsonObject, key: string): boolean {
    return ({}).hasOwnProperty.call(value, key) && value[key] !== undefined;
}
