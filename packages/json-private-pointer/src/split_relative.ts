import {DecodedSegment} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded_relative} from "./split_encoded_relative";

/**
 * Split a relative pointer into its components
 * @param pointer
 * @group Splitters
 */
export function split_relative(pointer: string): { relative: number, segments: DecodedSegment[] } {
    const split = split_encoded_relative(pointer);

    return {
        ...split,
        segments: split.segments.map(segment => segment_decode(segment))
    }
}
