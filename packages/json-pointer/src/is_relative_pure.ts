import {RelativeOnlyPointer, RelativePurePointer} from "./types";
import {parse_index_string} from "@crikey/json";

/**
 * Returns true if value is a string representing a Relative JSON Pointer
 * @see [Relative JSON Pointers](https://tools.ietf.org/id/draft-handrews-relative-json-pointer-00.html#rfc.section.3)
 * @param value
 * @group guards
 */
export function is_relative_pure(value: any) : value is RelativeOnlyPointer | RelativePurePointer {
    if (typeof value !== 'string')
        return false;

    const match = value.match(/^(0|[1-9][0-9]*)(?:$|\/(?:[^~]|~0|~1)*$)/);
    return !!match && parse_index_string(match[1]) !== undefined;
}
