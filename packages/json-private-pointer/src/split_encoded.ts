import {PointerDecodingError} from "@crikey/json-pointer";
import {AbsolutePointer, EncodedSegment, RelativePointer} from "./types";
import {parse_index_string} from "@crikey/json";

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 * @group Splitters
 */
export function split_encoded(pointer: AbsolutePointer): { segments: EncodedSegment[] };

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 * @group Splitters
 */
export function split_encoded(pointer: RelativePointer): { relative: number, segments: EncodedSegment[] };

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 * @group Splitters
 */
export function split_encoded(pointer: string): { segments: EncodedSegment[] } | { relative: number, segments: EncodedSegment[] };


export function split_encoded(pointer: string): { segments: EncodedSegment[] } | { relative: number, segments: EncodedSegment[] } {
    const match = pointer.match(/^(0|[1-9][0-9]*)?($|\/(?:[^~:]|~0|~1|:0|:1)*$)/);
    if (!match)
        throw new PointerDecodingError('invalid pointer');

    if (match[1] === undefined)
        return { segments: <EncodedSegment[]>match[2].split('/').slice(1) }

    const relative = parse_index_string(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid relative pointer');

    return { relative, segments: <EncodedSegment[]>match[2].split('/').slice(1) };
}
