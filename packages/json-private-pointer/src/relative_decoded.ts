import {Pointer, Segment} from "./types";
import {is_index_number} from "@crikey/json";
import {join_decoded_segments} from "./join_decoded_segments";
import {PointerEncodingError} from "@crikey/json-pointer";

export function relative_decoded(relative: number, ...segments: Segment[]) : Pointer {
    if (!is_index_number(relative))
        throw new PointerEncodingError('Invalid relative index');

    return `${relative}${join_decoded_segments('', ...segments)}`;
}