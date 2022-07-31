import {JsonPrimitive} from "../types";
import {is_finite_number} from "./is_finite_number";

/**
 * Returns true if value is a primitive json type and is valid
 *
 * @param value
 */
export function is_encodable_primitive(value: any): value is JsonPrimitive {
    switch (typeof value) {
        case 'number':
            return is_finite_number(value);
        case 'boolean':
        case 'string':
            return true;
        default:
            return value === null;
    }
}
