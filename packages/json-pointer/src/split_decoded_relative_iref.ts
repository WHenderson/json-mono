import {RelativeIRefPointer} from "./types";
import {split_encoded_relative_iref} from "./split_encoded_relative_iref";

export function split_decoded_relative_iref(pointer: RelativeIRefPointer): number;
export function split_decoded_relative_iref(pointer: string): number;

export function split_decoded_relative_iref(pointer: string): number {
    return split_encoded_relative_iref(pointer);
}
