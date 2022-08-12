import {AbsolutePointer, Pointer, PurePointer, RelativeOnlyPointer, RelativePurePointer, Segment} from "./types";
import {segment_encode} from "./segment_encode";
import {join_encoded_segments} from "./join_encoded_segments";

/**
 * Appends path segments onto an existing pointer
 * @param pure_pointer
 * @param segments
 * @group joiners
 */
export function join_segments(pure_pointer: AbsolutePointer, ...segments: Segment[]): AbsolutePointer;

/**
 * Appends path segments onto an existing pointer
 * @param pure_pointer
 * @group joiners
 */
export function join_segments(pure_pointer: RelativeOnlyPointer): RelativeOnlyPointer;

/**
 * Appends path segments onto an existing pointer
 * @param pure_pointer
 * @param segments
 * @group joiners
 */
export function join_segments(pure_pointer: RelativeOnlyPointer | RelativePurePointer, ...segments: Segment[]): RelativeOnlyPointer | RelativePurePointer;

/**
 * Appends path segments onto an existing pointer
 * @param pure_pointer
 * @param segments
 * @group joiners
 */
export function join_segments(pure_pointer: string, ...segments: Segment[]): PurePointer;

export function join_segments(pure_pointer: string, ...segments: Segment[]): Pointer {
    return join_encoded_segments(
        pure_pointer,
        ...segments.map(decoded_segment => segment_encode(decoded_segment))
    );
}



