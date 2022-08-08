import {PointerDecodingError} from "./pointer-decoding-error";
import {AbsolutePointer, Segment} from "./types";
import {is_absolute} from "./is_absolute";

export function split_encoded_absolute(pointer: AbsolutePointer): Segment[];
export function split_encoded_absolute(pointer: string): Segment[];

export function split_encoded_absolute(pointer: string): Segment[] {
    if (!is_absolute(pointer))
        throw new PointerDecodingError('invalid absolute pointer');

    return pointer.split('/').slice(1);
}
