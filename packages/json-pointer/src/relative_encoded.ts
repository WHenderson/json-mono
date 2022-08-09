import {EncodedSegment, RelativeOnlyPointer, RelativePurePointer, root_pointer} from "./types";
import {join_encoded_segments} from "./join_encoded_segments";
import {is_index_number} from "@crikey/json";
import {PointerEncodingError} from "./pointer-encoding-error";

/**
 * Generates a relative pointer
 * @param relative
 * @param encoded_segments pre-encoded path segments
 */
export function relative_encoded(relative: number, ...encoded_segments: EncodedSegment[]) : RelativeOnlyPointer | RelativePurePointer {
    if (!is_index_number(relative))
        throw new PointerEncodingError('Invalid relative index');

    return <RelativePurePointer>`${relative}${join_encoded_segments(root_pointer, ...encoded_segments)}`;
}
