import {AbsolutePointer, EncodedSegment, PurePointer, RelativeOnlyPointer, RelativePurePointer} from "./types";
import {PointerEncodingError} from "./pointer-encoding-error";
import {is_pointer_pure} from "./is_pointer_pure";

/**
 * Appends pre-encoded path segments onto an existing pointer
 * @param pure_pointer
 * @param encoded_segments pre-encoded path segments
 */
export function join_encoded_segments(pure_pointer: AbsolutePointer, ...encoded_segments: EncodedSegment[]): AbsolutePointer;

/**
 * Appends pre-encoded path segments onto an existing pointer
 * @param pure_pointer
 */
export function join_encoded_segments(pure_pointer: RelativeOnlyPointer): RelativeOnlyPointer;

/**
 * Appends pre-encoded path segments onto an existing pointer
 * @param pure_pointer
 * @param encoded_segments pre-encoded path segments
 */
export function join_encoded_segments(pure_pointer: RelativePurePointer | RelativeOnlyPointer, ...encoded_segments: EncodedSegment[]): RelativePurePointer | RelativeOnlyPointer;

/**
 * Appends pre-encoded path segments onto an existing pointer
 * @param pure_pointer
 * @param encoded_segments pre-encoded path segments
 */
export function join_encoded_segments(pure_pointer: string, ...encoded_segments: EncodedSegment[]): PurePointer;

export function join_encoded_segments(pure_pointer: string, ...encoded_segments: EncodedSegment[]): PurePointer {
    if (!is_pointer_pure(pure_pointer))
        throw new PointerEncodingError('Cannot join segments to an index reference');

    if (encoded_segments.length === 0)
        return pure_pointer;

    return <PurePointer>[pure_pointer, ...encoded_segments].join('/');
}



