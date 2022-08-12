import {PathSegment} from "./types";
import {JsonContainer} from "../types";
import {is_index_number} from "../guards";

/**
 * If next is a number, returns an empty array. Otherwise, returns an empty object.
 * "Errs on the side of creating an object"
 * @param next
 * @group traverse
 */
export function creator_err_object(next: PathSegment): JsonContainer {
    return (is_index_number(next))
    ? []
    : {};
}
