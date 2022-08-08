import {PointerDecodingError} from "./pointer-decoding-error";
import {AbsolutePointer, EncodedSegment} from "./types";
import {is_absolute} from "./is_absolute";

export function split_encoded_absolute(pointer: AbsolutePointer): EncodedSegment[];
export function split_encoded_absolute(pointer: string): EncodedSegment[];

export function split_encoded_absolute(pointer: string): EncodedSegment[] {
    if (!is_absolute(pointer))
        throw new PointerDecodingError('invalid absolute pointer');

    return <EncodedSegment[]>pointer.split('/').slice(1);
}
