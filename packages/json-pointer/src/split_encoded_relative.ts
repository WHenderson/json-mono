import {PointerDecodingError} from "./pointer-decoding-error";
import {Pointer, Segment} from "./types";
import {parse_index} from "@crikey/json";

export function split_encoded_relative(pointer: Pointer): { relative: number, segments: Segment[] } | { relative: number, is_iref: true } {
    const match = pointer.match(/^(0|[1-9][0-9]*)($|#$|\/(?:[^~]|~0|~1)*$)/);
    if (!match)
        throw new PointerDecodingError('invalid relative pointer');

    const relative = parse_index(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid relative pointer');

    const remainder = match[2];
    if (remainder === '')
        return { relative, segments: [] };
    if (remainder === '#')
        return { relative, is_iref: true };

    return { relative, segments: pointer.split('/').slice(1) }
}
