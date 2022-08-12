import {PointerDecodingError} from "./pointer-decoding-error";
import {EncodedSegment} from "./types";
import {is_absolute} from "./is_absolute";

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 * @group splitters
 */
export function split_encoded_absolute(pointer: string): EncodedSegment[] {
    if (!is_absolute(pointer))
        throw new PointerDecodingError('invalid absolute pointer');

    return <EncodedSegment[]>pointer.split('/').slice(1);
}
