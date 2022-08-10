import {AbsolutePointer, DecodedSegment, Pointer, RelativePointer, Segment} from "./types";
import {segment_encode} from "./segment_encode";
import {join_encoded_segments} from "./join_encoded_segments";


/**
 * Appends path segments onto an existing pointer
 * @param pure_pointer
 * @param segments
 */
export function join_segments(pure_pointer: AbsolutePointer, ...segments: (Segment | DecodedSegment)[]): AbsolutePointer;

/**
 * Appends path segments onto an existing pointer
 * @param pure_pointer
 * @param segments
 */
export function join_segments(pure_pointer: RelativePointer, ...segments: (Segment | DecodedSegment)[]): RelativePointer;

/**
 * Appends path segments onto an existing pointer
 * @param pure_pointer
 * @param segments
 */
export function join_segments(pure_pointer: string, ...segments: (Segment | DecodedSegment)[]): Pointer;


export function join_segments(pure_pointer: string, ...segments: (Segment | DecodedSegment)[]): Pointer {
    return join_encoded_segments(
        pure_pointer,
        ...segments.map(decoded_segment => segment_encode(decoded_segment))
    );
}



