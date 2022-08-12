import {RelativePointer, Segment} from "./types";
import {join_encoded_segments} from "./join_encoded_segments";
import {is_index_number} from "@crikey/json";
import {PointerEncodingError} from "@crikey/json-pointer";

/**
 * Generates a relative pointer
 * @param relative
 * @param encoded_segments pre-encoded path segments
 * @group Creators
 */
export function relative_encoded(relative: number, ...encoded_segments: Segment[]) : RelativePointer {
    if (!is_index_number(relative))
        throw new PointerEncodingError('Invalid relative index');

    return <RelativePointer>`${relative}${join_encoded_segments('', ...encoded_segments)}`;
}
