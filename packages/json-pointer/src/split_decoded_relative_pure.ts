import {Pointer, Segment} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded_relative_pure} from "./split_encoded_relative_pure";

export function split_decoded_relative_pure(pointer: Pointer): { relative: number, segments: Segment[] } {
    const split = split_encoded_relative_pure(pointer);

    return {
        ...split,
        segments: split.segments.map(segment => segment_decode(segment))
    }
}
