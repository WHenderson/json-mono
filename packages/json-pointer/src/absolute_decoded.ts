import {Pointer, Segment} from "./types";
import {join_decoded_segments} from "./join_decoded_segments";

export function absolute_decoded(...encoded_segments: Segment[]) : Pointer {
    return join_decoded_segments('', ...encoded_segments);
}
