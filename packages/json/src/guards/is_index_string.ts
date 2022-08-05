/**
 * Returns true if value is a valid index (safe integer >= 0)
 * @param value
 */
import {parse_index_string} from "../util";
import {IndexString} from "../types";

export function is_index_string(value: any): value is IndexString {
    return typeof value ==='string' && parse_index_string(value) !== undefined;
}
