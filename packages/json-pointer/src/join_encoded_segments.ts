import {AbsolutePointer, EncodedSegment, PurePointer} from "./types";
import {PointerEncodingError} from "./pointer-encoding-error";
import {is_relative_iref} from "./is_relative_iref";

export function join_encoded_segments(pure_pointer: AbsolutePointer, ...encoded_segments: EncodedSegment[]): AbsolutePointer;
export function join_encoded_segments(pure_pointer: PurePointer, ...encoded_segments: EncodedSegment[]): PurePointer;

export function join_encoded_segments(pure_pointer: PurePointer, ...encoded_segments: EncodedSegment[]): PurePointer {
    if (encoded_segments.length === 0)
        return pure_pointer;

    if (is_relative_iref(pure_pointer))
        throw new PointerEncodingError('Cannot join segments to an index reference');

    return <PurePointer>[pure_pointer, ...encoded_segments].join('/');
}



