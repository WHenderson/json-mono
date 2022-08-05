import {IndexNumber} from "../types";

/**
 * Returns true if value is a valid index (safe integer >= 0)
 * @param value
 */
export function is_index_number(value: any): value is IndexNumber {
    return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}
