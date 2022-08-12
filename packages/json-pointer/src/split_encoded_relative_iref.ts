import {PointerDecodingError} from "./pointer-decoding-error";
import {RelativeIRefPointer} from "./types";
import {parse_index_string} from "@crikey/json";

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 * @group Splitters
 */
export function split_encoded_relative_iref(pointer: RelativeIRefPointer): number;

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 * @group Splitters
 */
export function split_encoded_relative_iref(pointer: string): number;

export function split_encoded_relative_iref(pointer: string): number {
    const match = pointer.match(/^(0|[1-9][0-9]*)#$/);
    if (!match)
        throw new PointerDecodingError('invalid iref relative pointer');

    const relative = parse_index_string(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid iref relative pointer');

    return relative;
}
