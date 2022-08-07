import {PathSegment} from "./types";
import {JsonContainer} from "../types";
import {is_index_number, is_index_string} from "../guards";

export function creator_throw_ambiguous(next: PathSegment): JsonContainer {
    if (is_index_number(next))
        return [];
    if (typeof next === 'number' || next === '-' || next === 'length' || is_index_string(next))
        throw new Error('Unable to infer parent type from key/index');
    return {};
}
