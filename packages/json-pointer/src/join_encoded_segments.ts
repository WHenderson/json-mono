import {Pointer, Segment} from "./types";
import {PointerEncodingError} from "./pointer-encoding-error";
import {is_relative_iref} from "./is_relative_iref";

export function join_encoded_segments(pure_pointer: Pointer, ...encoded_segments: Segment[]): Pointer {
    if (encoded_segments.length === 0)
        return pure_pointer;

    if (is_relative_iref(pure_pointer))
        throw new PointerEncodingError('Cannot join segments to an index reference');

    return [pure_pointer, ...encoded_segments].join('/');
}



