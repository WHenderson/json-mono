import {RelativePurePointer, root_pointer, Segment} from "./types";
import {join_encoded_segments} from "./join_encoded_segments";
import {is_index_number} from "@crikey/json";
import {PointerEncodingError} from "./pointer-encoding-error";

export function relative_encoded(relative: number, ...segments: Segment[]) : RelativePurePointer {
    if (!is_index_number(relative))
        throw new PointerEncodingError('Invalid relative index');

    return <RelativePurePointer>`${relative}${join_encoded_segments(root_pointer, ...segments)}`;
}
