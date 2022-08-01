import {Pointer} from "./types";
import {split_encoded_relative_iref} from "./split_encoded_relative_iref";

export function split_decoded_relative_iref(pointer: Pointer): number {
    return split_encoded_relative_iref(pointer);
}
