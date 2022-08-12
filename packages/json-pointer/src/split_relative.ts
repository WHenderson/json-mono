import {RelativeIRefPointer, RelativeOnlyPointer, RelativePurePointer, Segment} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded_relative} from "./split_encoded_relative";

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 * @group splitters
 */
export function split_relative(pointer: RelativeIRefPointer): { relative: number, is_iref: true };

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 * @group splitters
 */
export function split_relative(pointer: RelativeOnlyPointer | RelativePurePointer): { relative: number, segments: Segment[] };

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 * @group splitters
 */
export function split_relative(pointer: string): { relative: number, segments: Segment[] } | { relative: number, is_iref: true };

export function split_relative(pointer: string): { relative: number, segments: Segment[] } | { relative: number, is_iref: true } {
    const split = split_encoded_relative(pointer);

    if (!('segments' in split))
        return split;

    return {
        ...split,
        segments: split.segments.map(segment => segment_decode(segment))
    }
}
