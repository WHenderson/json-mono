import {PathSegment} from "./types";
import {JsonContainer} from "../types";
import {is_index_string} from "../guards";

export function creator_err_array(next: PathSegment): JsonContainer {
    return (typeof next === 'number' || next === '-' || next === 'length' || is_index_string(next))
    ? []
    : {};
}
