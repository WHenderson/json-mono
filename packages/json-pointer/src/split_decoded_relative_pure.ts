import {RelativeOnlyPointer, RelativePurePointer, Segment} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded_relative_pure} from "./split_encoded_relative_pure";

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 */
export function split_decoded_relative_pure(pointer: RelativeOnlyPointer | RelativePurePointer): { relative: number, segments: Segment[] };

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 */
export function split_decoded_relative_pure(pointer: string): { relative: number, segments: Segment[] };

export function split_decoded_relative_pure(pointer: string): { relative: number, segments: Segment[] } {
    const split = split_encoded_relative_pure(pointer);

    return {
        ...split,
        segments: split.segments.map(segment => segment_decode(segment))
    }
}
