import {PointerDecodingError} from "./pointer-decoding-error";
import {Segment} from "./types";
import {parse_index_string} from "@crikey/json";

export function split_encoded(pointer: string): { segments: Segment[] } | { relative: number, segments: Segment[] } | { relative: number, is_iref: true } {
    const match = pointer.match(/^(?:(0|[1-9][0-9]*)($|#$|\/(?:[^~]|~0|~1)*$)|($|\/(?:[^~]|~0|~1)*$))/);
    if (!match)
        throw new PointerDecodingError('invalid pointer');

    if (match[3] === '')
        return { segments: [] }
    if (match[3] !== undefined)
        return { segments: match[3].split('/').slice(1) }

    const relative = parse_index_string(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid relative pointer');

    const remainder = match[2];
    if (remainder === '')
        return { relative, segments: [] };
    if (remainder === '#')
        return { relative, is_iref: true };

    return { relative, segments: pointer.split('/').slice(1) }
}
