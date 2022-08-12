import {AbsolutePointer, root_pointer, Segment} from "./types";
import {join_segments} from "./join_segments";

/**
 * Generates an absolute pointer
 * @param segments
 * @group Creators
 */
export function absolute(...segments: Segment[]) : AbsolutePointer {
    return join_segments(root_pointer, ...segments);
}
