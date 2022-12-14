import {EncodedSegment, Segment} from "./types";

/**
 * Encodes a segment
 * @param segment
 * @group Encoding
 */
export function segment_encode(segment: Segment): EncodedSegment {
    return <EncodedSegment>segment
        .replace(/~/g, '~0')
        .replace(/\//g, '~1');
}
