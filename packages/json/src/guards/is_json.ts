import {Json} from "../types";

/**
 * Returns true if value is a JSON type.
 * Note that this is not a deep check. Value may hold values which are not JSON compatible.
 *
 * @param value
 */
export function is_json(value: any): value is Json {
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
