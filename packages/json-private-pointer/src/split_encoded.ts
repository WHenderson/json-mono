import {PointerDecodingError} from "@crikey/json-pointer";
import {Segment} from "./types";
import {parse_index_string} from "@crikey/json";

export function split_encoded(pointer: string): { segments: Segment[] } | { relative: number, segments: Segment[] } {
    const match = pointer.match(/^(0|[1-9][0-9]*)?($|\/(?:[^~:]|~0|~1|:0|:1)*$)/);
    if (!match)
        throw new PointerDecodingError('invalid pointer');

    if (match[1] === undefined)
        return { segments: match[2].split('/').slice(1) }

    const relative = parse_index_string(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid relative pointer');

    return { relative, segments: match[2].split('/').slice(1) };
}
