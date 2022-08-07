import {Pointer} from "./types";
import {is_index_number} from "@crikey/json";
import {PointerEncodingError} from "./pointer-encoding-error";

export function relative_iref(relative: number) : Pointer {
    if (!is_index_number(relative))
        throw new PointerEncodingError('Invalid relative index');

    return `${relative}#`;
}
