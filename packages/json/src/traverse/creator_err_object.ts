import {PathSegment} from "./types";
import {JsonContainer} from "../types";
import {is_index_number} from "../guards";

export function creator_err_object(next: PathSegment): JsonContainer {
    return (is_index_number(next))
    ? []
    : {};
}
