import {AbsolutePointer, Pointer, RelativePointer, Segment} from "./types";
import {is_pointer} from "./is_pointer";
import {PointerEncodingError} from "@crikey/json-pointer";

/**
 * Appends pre-encoded path segments onto an existing pointer
 * @param pure_pointer
 * @param encoded_segments pre-encoded path segments
 * @group Joiners
 */
export function join_encoded_segments(pure_pointer: AbsolutePointer, ...encoded_segments: Segment[]): AbsolutePointer;

/**
 * Appends pre-encoded path segments onto an existing pointer
 * @param pure_pointer
 * @param encoded_segments pre-encoded path segments
 * @group Joiners
 */
export function join_encoded_segments(pure_pointer: RelativePointer, ...encoded_segments: Segment[]): RelativePointer;

/**
 * Appends pre-encoded path segments onto an existing pointer
 * @param pure_pointer
 * @param encoded_segments pre-encoded path segments
 * @group Joiners
 */
export function join_encoded_segments(pure_pointer: string, ...encoded_segments: Segment[]): Pointer;

export function join_encoded_segments(pure_pointer: string, ...encoded_segments: Segment[]): Pointer {
    if (!is_pointer(pure_pointer))
        throw new PointerEncodingError('Invalid pointer');

    if (encoded_segments.length === 0)
        return pure_pointer;

    return <Pointer>[pure_pointer, ...encoded_segments].join('/');
}



