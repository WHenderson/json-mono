import {PointerDecodingError} from "./pointer-decoding-error";
import {RelativeOnlyPointer, RelativePurePointer, Segment} from "./types";
import {parse_index_string} from "@crikey/json";

export function split_encoded_relative_pure(pointer: RelativeOnlyPointer | RelativePurePointer): { relative: number, segments: Segment[] };
export function split_encoded_relative_pure(pointer: string): { relative: number, segments: Segment[] };

export function split_encoded_relative_pure(pointer: string): { relative: number, segments: Segment[] } {
    const match = pointer.match(/^(0|[1-9][0-9]*)($|\/(?:[^~]|~0|~1)*$)/);
    if (!match)
        throw new PointerDecodingError('invalid pure relative pointer');

    const relative = parse_index_string(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid pure relative pointer');

    return { relative, segments: pointer.split('/').slice(1) };
}
