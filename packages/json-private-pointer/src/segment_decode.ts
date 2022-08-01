import {DecodedSegment, Segment} from "./types";

export function segment_decode(segment: Segment): DecodedSegment {
    const decoded = segment
        .replace(/:0/g, ':')
        .replace(/~1/g, '/')
        .replace(/~0/g, '~');

    return decoded.startsWith(':1')
        ? [true, decoded.slice(2)]
        : [false, decoded]
}
