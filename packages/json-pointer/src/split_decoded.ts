import {AbsolutePointer, RelativeIRefPointer, RelativeOnlyPointer, RelativePurePointer, Segment} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded} from "./split_encoded";

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 */
export function split_decoded(pointer: AbsolutePointer): { segments: Segment[] };

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 */
export function split_decoded(pointer: RelativeIRefPointer): { relative: number, is_iref: true };

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 */
export function split_decoded(pointer: RelativeOnlyPointer | RelativePurePointer): { relative: number, segments: Segment[] };

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 */
export function split_decoded(pointer: string): { segments: Segment[] } | { relative: number, segments: Segment[] } | { relative: number, is_iref: true }

export function split_decoded(pointer: string): { segments: Segment[] } | { relative: number, segments: Segment[] } | { relative: number, is_iref: true } {
    const split = split_encoded(pointer);

    if (!('segments' in split))
        return split;

    return {
        ...split,
        segments: split.segments.map(segment => segment_decode(segment))
    }
}
