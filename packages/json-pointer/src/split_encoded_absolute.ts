import {PointerDecodingError} from "./pointer-decoding-error";
import {Pointer, Segment} from "./types";

export function split_encoded_absolute(pointer: Pointer): Segment[] {
    const segments = pointer.split('/');
    if (segments[0] !== '')
        throw new PointerDecodingError('invalid absolute pointer');

    return segments.slice(1);
}
