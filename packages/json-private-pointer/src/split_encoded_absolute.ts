import {PointerDecodingError} from "@crikey/json-pointer";
import {Segment} from "./types";
import {is_absolute} from "./is_absolute";

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 */
export function split_encoded_absolute(pointer: string): Segment[] {
    if (!is_absolute(pointer))
        throw new PointerDecodingError('invalid absolute pointer');

    return pointer.split('/').slice(1);
}
