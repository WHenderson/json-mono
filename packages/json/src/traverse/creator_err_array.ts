import {PathSegment} from "./types";
import {JsonContainer} from "../types";
import {is_index_number_or_string} from "../guards";

/**
 * Returns an array if next is a number, '-'. 'length', valid index or the string representation of a valid index. Otherwise, returns an empty object.
 * "Errs on the side of creating an array"
 * @param next
 * @group traverse
 */
export function creator_err_array(next: PathSegment): JsonContainer {
    return (next === '-' || next === 'length' || is_index_number_or_string(next))
    ? []
    : {};
}
