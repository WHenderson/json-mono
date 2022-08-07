import {PointerDecodingError} from "@crikey/json-pointer";
import {Pointer, Segment} from "./types";
import {parse_index_string} from "@crikey/json";

export function split_encoded_relative(pointer: Pointer): { relative: number, segments: Segment[] } {
    const match = pointer.match(/^(0|[1-9][0-9]*)(?:$|\/(?:[^~:]|~0|~1|:0|:1)*$)/);
    if (!match)
        throw new PointerDecodingError('invalid relative pointer');

    const relative = parse_index_string(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid relative pointer');

    const remainder = match[2];
    if (remainder === '')
        return { relative, segments: [] };

    return { relative, segments: pointer.split('/').slice(1) }
}
