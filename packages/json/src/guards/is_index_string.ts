import {parse_index_string} from "../util";
import {IndexString} from "../types";

/**
 * Returns true if value is the string representation of a valid index (safe integer >= 0)
 * @param value
 * @group guards
 */
export function is_index_string(value: any): value is IndexString {
    return typeof value ==='string' && parse_index_string(value) !== undefined;
}
