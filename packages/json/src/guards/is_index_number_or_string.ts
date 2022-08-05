/**
 * Returns true if value is a valid index (safe integer >= 0)
 * @param value
 */
import {parse_index_string} from "../util";
import {IndexNumber, IndexString} from "../types";

export function is_index_number_or_string(value: any): value is IndexNumber | IndexString {
    return (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0)
        || (typeof value ==='string' && parse_index_string(value) !== undefined);
}
