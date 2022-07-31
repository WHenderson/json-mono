import {JsonPrimitive} from "../types";

/**
 * Returns true if value is a primitive json type
 *
 * @param value
 */
export function is_primitive(value: any): value is JsonPrimitive {
    switch (typeof value) {
        case 'boolean':
        case 'number':
        case 'string':
            return true;
        default:
            return value === null;
    }
}
