import {PointerDecodingError} from "@crikey/json-pointer";
import {Pointer, Segment} from "./types";
import {is_absolute} from "./is_absolute";

export function split_encoded_absolute(pointer: Pointer): Segment[] {
    if (!is_absolute(pointer))
        throw new PointerDecodingError('invalid absolute pointer');

    return pointer.split('/').slice(1);
}
