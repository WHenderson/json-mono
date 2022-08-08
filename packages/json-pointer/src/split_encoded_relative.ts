import {PointerDecodingError} from "./pointer-decoding-error";
import {RelativeIRefPointer, RelativeOnlyPointer, RelativePurePointer, Segment} from "./types";
import {parse_index_string} from "@crikey/json";

export function split_encoded_relative(pointer: RelativeIRefPointer): { relative: number, is_iref: true };
export function split_encoded_relative(pointer: RelativeOnlyPointer | RelativePurePointer): { relative: number, segments: Segment[] };
export function split_encoded_relative(pointer: string): { relative: number, segments: Segment[] } | { relative: number, is_iref: true };

export function split_encoded_relative(pointer: string): { relative: number, segments: Segment[] } | { relative: number, is_iref: true } {
    const match = pointer.match(/^(0|[1-9][0-9]*)($|#$|\/(?:[^~]|~0|~1)*$)/);
    if (!match)
        throw new PointerDecodingError('invalid relative pointer');

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
