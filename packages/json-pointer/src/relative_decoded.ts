import {RelativeOnlyPointer, RelativePurePointer, root_pointer, Segment} from "./types";
import {is_index_number} from "@crikey/json";
import {PointerEncodingError} from "./pointer-encoding-error";
import {join_decoded_segments} from "./join_decoded_segments";

/**
 * Generates a relative pointer
 * @param relative
 * @param segments
 */
export function relative_decoded(relative: number, ...segments: Segment[]) : RelativeOnlyPointer | RelativePurePointer {
    if (!is_index_number(relative))
        throw new PointerEncodingError('Invalid relative index');

    return <RelativePurePointer>`${relative}${join_decoded_segments(root_pointer, ...segments)}`;
}
