import {AbsolutePointer, root_pointer, Segment} from "./types";
import {join_decoded_segments} from "./join_decoded_segments";

export function absolute_decoded(...encoded_segments: Segment[]) : AbsolutePointer {
    return join_decoded_segments(root_pointer, ...encoded_segments);
}
