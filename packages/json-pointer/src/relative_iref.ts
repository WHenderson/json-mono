import {RelativeIRefPointer} from "./types";
import {is_index_number} from "@crikey/json";
import {PointerEncodingError} from "./pointer-encoding-error";

/**
 * Generates an index reference pointer
 * @param relative
 */
export function relative_iref(relative: number) : RelativeIRefPointer {
    if (!is_index_number(relative))
        throw new PointerEncodingError('Invalid relative index');

    return <RelativeIRefPointer>`${relative}#`;
}
