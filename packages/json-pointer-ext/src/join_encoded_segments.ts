import {Pointer, Segment} from "./types";
import {PointerEncodingError} from "@crikey/json-pointer";

export function join_encoded_segments(pure_pointer: Pointer, ...encoded_segments: Segment[]): Pointer {
    if (encoded_segments.length === 0)
        return pure_pointer;

    if (pure_pointer.endsWith('#'))
        throw new PointerEncodingError('Cannot join segments to an index reference');

    return [pure_pointer, ...encoded_segments].join('/');
}



