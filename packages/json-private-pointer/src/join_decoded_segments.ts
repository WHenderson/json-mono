import {DecodedSegment, Pointer, Segment} from "./types";
import {segment_encode} from "./segment_encode";
import {join_encoded_segments} from "./join_encoded_segments";

export function join_decoded_segments(pure_pointer: Pointer, ...decoded_segments: (Segment | DecodedSegment)[]): Pointer {
    return join_encoded_segments(
        pure_pointer,
        ...decoded_segments.map(decoded_segment => segment_encode(decoded_segment))
    );
}



