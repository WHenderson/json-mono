import {Pointer, Segment} from "./types";
import {join_encoded_segments} from "./join_encoded_segments";

/**
 * Generates an absolute pointer
 * @param encoded_segments pre-encoded path segments
 * @group Creators
 */
export function absolute_encoded(...encoded_segments: Segment[]) : Pointer {
    return join_encoded_segments('', ...encoded_segments);
}
