import {DecodedSegment, Pointer} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded_relative} from "./split_encoded_relative";

export function split_decoded_relative(pointer: Pointer): { relative: number, segments: DecodedSegment[] } {
    const split = split_encoded_relative(pointer);

    return {
        ...split,
        segments: split.segments.map(segment => segment_decode(segment))
    }
}
