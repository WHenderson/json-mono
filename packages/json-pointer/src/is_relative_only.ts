import {RelativeOnlyPointer} from "./types";
import {parse_index_string} from "@crikey/json";

/**
 * Returns true if pointer is a string representing a Relative JSON Pointer
 * @see [Relative JSON Pointers](https://tools.ietf.org/id/draft-handrews-relative-json-pointer-00.html#rfc.section.3)
 * @param pointer
 */
export function is_relative_only(pointer: any) : pointer is RelativeOnlyPointer {
    if (typeof pointer !== 'string')
        return false;

    const match = pointer.match(/^(0|[1-9][0-9]*)$/);
    return !!match && parse_index_string(match[1]) !== undefined;
}