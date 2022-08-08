import {AbsolutePointer, EncodedSegment, root_pointer} from "./types";
import {join_encoded_segments} from "./join_encoded_segments";

export function absolute_encoded(...encoded_segments: EncodedSegment[]) : AbsolutePointer {
    return join_encoded_segments(root_pointer, ...encoded_segments);
}
