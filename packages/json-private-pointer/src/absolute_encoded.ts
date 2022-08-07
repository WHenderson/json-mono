import {Pointer, Segment} from "./types";
import {join_encoded_segments} from "./join_encoded_segments";

export function absolute_encoded(...encoded_segments: Segment[]) : Pointer {
    return join_encoded_segments('', ...encoded_segments);
}
