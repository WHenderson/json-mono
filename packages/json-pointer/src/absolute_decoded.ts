import {AbsolutePointer, root_pointer, Segment} from "./types";
import {join_decoded_segments} from "./join_decoded_segments";

/**
 * Generates an absolute pointer
 * @param segments
 */
export function absolute_decoded(...segments: Segment[]) : AbsolutePointer {
    return join_decoded_segments(root_pointer, ...segments);
}
