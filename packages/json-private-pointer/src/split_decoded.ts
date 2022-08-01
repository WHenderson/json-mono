import {DecodedSegment} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded} from "./split_encoded";

export function split_decoded(pointer: string): { segments: DecodedSegment[] } | { relative: number, segments: DecodedSegment[] } {
    const split = split_encoded(pointer);

    if (!('segments' in split))
        return split;

    return {
        ...split,
        segments: split.segments.map(segment => segment_decode(segment))
    }
}