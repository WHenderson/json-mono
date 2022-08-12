import {AbsolutePointer, DecodedSegment, root_pointer, Segment} from "./types";
import {join_segments} from "./join_segments";

/**
 * Generates an absolute pointer
 * @param segments
 * @group Creators
 */
export function absolute(...segments: (Segment | DecodedSegment)[]) : AbsolutePointer {
    return join_segments(root_pointer, ...segments);
}
