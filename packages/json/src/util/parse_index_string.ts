import {is_index_number} from "../guards";
import {IndexNumber} from "../types";

/**
 * Returns the given encoded_index parsed into a numerical index, or undefined if the string does not represent a valid index
 * @param encoded_index
 * @group util
 */
export function parse_index_string(encoded_index: string) : IndexNumber | undefined {
    if (!/^(0|[1-9][0-9]*)$/.test(encoded_index))
        return;

    const index = parseInt(encoded_index, 10);

    return is_index_number(index)
        ? index
        : undefined;
}
