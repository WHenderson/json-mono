import {AbsolutePointer, Segment} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded_absolute} from "./split_encoded_absolute";

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 */
export function split_decoded_absolute(pointer: AbsolutePointer): Segment[];

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 */
export function split_decoded_absolute(pointer: string): Segment[];

export function split_decoded_absolute(pointer: string): Segment[] {
    return split_encoded_absolute(pointer).map(segment => segment_decode(segment));
}
