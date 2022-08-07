import {Pointer} from "./types";
import {PointerEncodingError} from "./pointer-encoding-error";
import {is_relative_only} from "./is_relative_only";

export function join_iref(relative_pointer: Pointer): Pointer {
    if (!is_relative_only(relative_pointer))
        throw new PointerEncodingError('Expected only relative');

    return `${relative_pointer}#`;
}



