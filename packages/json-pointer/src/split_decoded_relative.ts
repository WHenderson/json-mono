import {Pointer, Segment} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded_relative} from "./split_encoded_relative";

export function split_decoded_relative(pointer: Pointer): { relative: number, segments: Segment[] } | { relative: number, is_iref: true } {
    const split = split_encoded_relative(pointer);

    if (!('segments' in split))
        return split;

    return {
        ...split,
        segments: split.segments.map(segment => segment_decode(segment))
    }
}
