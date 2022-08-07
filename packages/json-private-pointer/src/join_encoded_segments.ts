import {Pointer, Segment} from "./types";

export function join_encoded_segments(pure_pointer: Pointer, ...encoded_segments: Segment[]): Pointer {
    if (encoded_segments.length === 0)
        return pure_pointer;

    return [pure_pointer, ...encoded_segments].join('/');
}



