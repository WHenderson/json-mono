import {JsonPrimitive} from "../types";

/**
 * Returns true if value is a JSON type.
 * Note that this is not a deep check. Value may hold values which are not JSON compatible.
 *
 * @param value
 * @group guards
 */
export function is_json<T>(value: any | JsonPrimitive | T[] | Record<string, T>): value is JsonPrimitive | T[] | Record<string, T> {
    switch (typeof value) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'object':
            return true;
        default:
            return false;
    }
}
