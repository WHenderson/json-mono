import {PointerDecodingError} from "./pointer-decoding-error";
import {EncodedSegment, RelativeOnlyPointer, RelativePurePointer} from "./types";
import {parse_index_string} from "@crikey/json";

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 */
export function split_encoded_relative_pure(pointer: RelativeOnlyPointer | RelativePurePointer): { relative: number, segments: EncodedSegment[] };

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 */
export function split_encoded_relative_pure(pointer: string): { relative: number, segments: EncodedSegment[] };

export function split_encoded_relative_pure(pointer: string): { relative: number, segments: EncodedSegment[] } {
    const match = pointer.match(/^(0|[1-9][0-9]*)($|\/(?:[^~]|~0|~1)*$)/);
    if (!match)
        throw new PointerDecodingError('invalid pure relative pointer');

    const relative = parse_index_string(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid pure relative pointer');

    return { relative, segments: <EncodedSegment[]>pointer.split('/').slice(1) };
}
