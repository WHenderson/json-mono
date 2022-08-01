import {Segment} from "./types";

export function segment_encode(segment: Segment): Segment {
    return segment
        .replace(/~/g, '~0')
        .replace(/\//g, '~1');
}
