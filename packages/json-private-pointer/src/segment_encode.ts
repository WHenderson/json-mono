import {DecodedSegment, EncodedSegment, Segment} from "./types";

/**
 * Encodes a segment
 * @param segment
 */
export function segment_encode(is_private: boolean, segment: Segment): EncodedSegment;

/**
 * Encodes a segment
 * @param segment
 */
export function segment_encode(segment: Segment | DecodedSegment): EncodedSegment;

export function segment_encode(is_private_or_segment: Segment | boolean | DecodedSegment, maybe_segment?: Segment): EncodedSegment {
    const [is_private, segment] = typeof is_private_or_segment === 'boolean'
        ? [is_private_or_segment, maybe_segment!]
        : Array.isArray(is_private_or_segment)
        ? is_private_or_segment
        : [false, is_private_or_segment];

    return <EncodedSegment>(
        (is_private ? '~3' : '') +
        segment
        .replace(/~/g, '~0')
        .replace(/\//g, '~1')
    );
}
