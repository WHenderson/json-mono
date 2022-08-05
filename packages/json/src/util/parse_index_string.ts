/**
 * Parses the given encoded_index into an index, or undefined if it is invalid
 * @param index
 */
import {is_index_number} from "../guards";
import {IndexNumber} from "../types";

export function parse_index_string(encoded_index: string) : IndexNumber | undefined {
    if (!/^(0|[1-9][0-9]*)$/.test(encoded_index))
        return;

    const index = parseInt(encoded_index, 10);

    return is_index_number(index)
        ? index
        : undefined;
}
