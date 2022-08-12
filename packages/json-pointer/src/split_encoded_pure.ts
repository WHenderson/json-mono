import {PointerDecodingError} from "./pointer-decoding-error";
import {AbsolutePointer, EncodedSegment, RelativeOnlyPointer, RelativePurePointer} from "./types";
import {parse_index_string} from "@crikey/json";

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 * @group Splitters
 */
export function split_encoded_pure(pointer: AbsolutePointer): { segments: EncodedSegment[] };

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 * @group Splitters
 */
export function split_encoded_pure(pointer: RelativeOnlyPointer | RelativePurePointer): { relative: number, segments: EncodedSegment[] };

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 * @group Splitters
 */
export function split_encoded_pure(pointer: string): { segments: EncodedSegment[] } | { relative: number, segments: EncodedSegment[] };

export function split_encoded_pure(pointer: string): { segments: EncodedSegment[] } | { relative: number, segments: EncodedSegment[] } {
    const match = pointer.match(/^(0|[1-9][0-9]*)?($|\/(?:[^~]|~0|~1)*$)/);
    if (!match)
        throw new PointerDecodingError('invalid pure pointer');

    const segments = <EncodedSegment[]>match[2].split('/').slice(1);

    if (match[1] === undefined)
        return { segments };

    const relative = parse_index_string(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid relative pointer');

    return { relative, segments }
}
