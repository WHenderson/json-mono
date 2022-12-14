import {RelativeOnlyPointer, RelativePurePointer, root_pointer, Segment} from "./types";
import {is_index_number} from "@crikey/json";
import {join_segments} from "./join_segments";
import {PointerEncodingError} from "./pointer-encoding-error";

/**
 * Generates a relative pointer
 * @param relative
 * @param segments
 * @group Creators
 */
export function relative(relative: number, ...segments: Segment[]) : RelativeOnlyPointer | RelativePurePointer {
    if (!is_index_number(relative))
        throw new PointerEncodingError('Invalid relative index');

    return <RelativePurePointer>`${relative}${join_segments(root_pointer, ...segments)}`;
}
