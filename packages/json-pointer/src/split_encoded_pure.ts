import {PointerDecodingError} from "./pointer-decoding-error";
import {Segment} from "./types";
import {parse_index_string} from "@crikey/json";

export function split_encoded_pure(pointer: string): { segments: Segment[] } | { relative: number, segments: Segment[] } {
    const match = pointer.match(/^(0|[1-9][0-9]*)?($|\/(?:[^~]|~0|~1)*$)/);
    if (!match)
        throw new PointerDecodingError('invalid pure pointer');

    const segments = match[2].split('/').slice(1);

    if (match[1] === undefined)
        return { segments };

    const relative = parse_index_string(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid relative pointer');

    return { relative, segments }
}
