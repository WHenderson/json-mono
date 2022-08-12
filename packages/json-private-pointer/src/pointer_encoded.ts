import {AbsolutePointer, EncodedSegment, Pointer, RelativePointer} from "./types";
import {absolute_encoded} from "./absolute_encoded";
import {relative_encoded} from "./relative_encoded";

/**
 * Generates an absolute pointer
 * @param encoded_segments pre-encoded path segments
 * @group Creators
 */
export function pointer_encoded(...encoded_segments: EncodedSegment[]) : AbsolutePointer;

/**
 * Generates a relative pointer
 * @param relative
 * @param encoded_segments pre-encoded path segments
 * @group Creators
 */
export function pointer_encoded(relative: number, ...encoded_segments: EncodedSegment[]) : RelativePointer;

/**
 * Generates a pointer
 * @param relative
 * @param encoded_segments pre-encoded path segments
 * @group Creators
 */
export function pointer_encoded(relative: number | undefined, ...encoded_segments: EncodedSegment[]) : Pointer

export function pointer_encoded(relative_or_segment: number | undefined| EncodedSegment, ...encoded_segments: EncodedSegment[]) : Pointer {
    if (relative_or_segment === undefined)
        return absolute_encoded(...encoded_segments);
    else
    if (typeof relative_or_segment === 'number')
        return relative_encoded(relative_or_segment, ...encoded_segments);
    else
        return absolute_encoded(relative_or_segment, ...encoded_segments);
}
