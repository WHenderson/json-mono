import {PointerDecodingError} from "./pointer-decoding-error";
import {Pointer} from "./types";
import {parse_index_string} from "@crikey/json";

export function split_encoded_relative_iref(pointer: Pointer): number {
    const match = pointer.match(/^(0|[1-9][0-9]*)#$/);
    if (!match)
        throw new PointerDecodingError('invalid iref relative pointer');

    const relative = parse_index_string(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid iref relative pointer');

    return relative;
}
