import {DecodedSegment} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded_absolute} from "./split_encoded_absolute";

/**
 * Split an absolute pointer into segments
 * @param pointer
 * @group Splitters
 */
export function split_absolute(pointer: string): DecodedSegment[] {
    return split_encoded_absolute(pointer).map(segment => segment_decode(segment));
}
