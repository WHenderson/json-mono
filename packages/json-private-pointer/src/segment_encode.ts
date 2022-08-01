import {DecodedSegment, Segment} from "./types";

export function segment_encode(is_private: boolean, segment: Segment): Segment;
export function segment_encode(segment: Segment | DecodedSegment): Segment;

export function segment_encode(is_private_or_segment: Segment | boolean | DecodedSegment, maybe_segment?: Segment): Segment {
    const [is_private, segment] = typeof is_private_or_segment === 'boolean'
        ? [is_private_or_segment, maybe_segment!]
        : Array.isArray(is_private_or_segment)
        ? is_private_or_segment
        : [false, is_private_or_segment];

    return (is_private ? ':1' : '') + segment
        .replace(/~/g, '~0')
        .replace(/\//g, '~1')
        .replace(/:/g, ':0')
}
