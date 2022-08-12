import {Pointer} from "./types";
import {parse_index_string} from "@crikey/json";

/**
 * Returns true if value is a pointer
 * @param value
 * @group Guards
 */
export function is_pointer(value: any): value is Pointer {
    if (typeof value !== 'string')
        return false;

    const match = value.match(/^(0|[1-9][0-9]*)?(?:$|\/(?:[^~:]|~0|~1|:0|:1)*$)/);
    return !!match && (match[1] === undefined || parse_index_string(match[1]) !== undefined);
}
