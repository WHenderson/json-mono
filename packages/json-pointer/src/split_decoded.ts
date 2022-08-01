import {Segment} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded} from "./split_encoded";

export function split_decoded(pointer: string): { segments: Segment[] } | { relative: number, segments: Segment[] } | { relative: number, is_iref: true } {
    const split = split_encoded(pointer);

    if (!('segments' in split))
        return split;

    return {
        ...split,
        segments: split.segments.map(segment => segment_decode(segment))
    }
}
