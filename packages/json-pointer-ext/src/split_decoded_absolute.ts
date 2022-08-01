import {DecodedSegment, Pointer} from "./types";
import {segment_decode} from "./segment_decode";
import {split_encoded_absolute} from "./split_encoded_absolute";

export function split_decoded_absolute(pointer: Pointer): DecodedSegment[] {
    return split_encoded_absolute(pointer).map(segment => segment_decode(segment));
}
