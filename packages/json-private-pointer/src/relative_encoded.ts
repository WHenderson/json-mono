import {Pointer, Segment} from "./types";
import {join_encoded_segments} from "./join_encoded_segments";
import {is_index_number} from "@crikey/json";
import {PointerEncodingError} from "@crikey/json-pointer";

export function relative_encoded(relative: number, ...segments: Segment[]) : Pointer {
    if (!is_index_number(relative))
        throw new PointerEncodingError('Invalid relative index');

    return `${relative}${join_encoded_segments('', ...segments)}`;
}
