import {RelativeIRefPointer} from "./types";
import {split_encoded_relative_iref} from "./split_encoded_relative_iref";

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 * @group Splitters
 */
export function split_relative_iref(pointer: RelativeIRefPointer): number;

/**
 * Splits a pointer into its constituent parts, decoding any path segments
 * @param pointer
 * @group Splitters
 */
export function split_relative_iref(pointer: string): number;

export function split_relative_iref(pointer: string): number {
    return split_encoded_relative_iref(pointer);
}
