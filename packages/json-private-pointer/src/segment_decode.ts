import {DecodedSegment, Segment} from "./types";

export function segment_decode(segment: Segment): DecodedSegment {
    const [is_private, remainder] = segment.startsWith('~3')
        ? [true, segment.slice(2)]
        : [false, segment];

    const decoded = remainder
        .replace(/~1/g, '/')
        .replace(/~0/g, '~');

    return [is_private, decoded];
}
