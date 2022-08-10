import {DecodedSegment, RelativePointer, root_pointer, Segment} from "./types";
import {is_index_number} from "@crikey/json";
import {join_segments} from "./join_segments";
import {PointerEncodingError} from "@crikey/json-pointer";

/**
 * Generates a relative pointer
 * @param relative
 * @param segments
 */
export function relative(relative: number, ...segments: (Segment | DecodedSegment)[]) : RelativePointer {
    if (!is_index_number(relative))
        throw new PointerEncodingError('Invalid relative index');

    return <RelativePointer>`${relative}${join_segments(root_pointer, ...segments)}`;
}
