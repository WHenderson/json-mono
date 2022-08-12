import {EncodedSegment, Segment} from "./types";

/**
 * Decodes an encoded segment
 * @param segment
 * @group encoding
 */
export function segment_decode(segment: EncodedSegment): Segment {
    return segment
        .replace(/~1/g, '/')
        .replace(/~0/g, '~');
}
