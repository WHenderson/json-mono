/**
 * Parses the given encoded_index into an index, or undefined if it is invalid
 * @param index
 */
import {is_index_number} from "../guards";
import {IndexNumber} from "../types";

/**
 * Returns the numerical representation of encoded_index, or undefined.
 * @param encoded_index
 */
export function parse_index(encoded_index: any) : IndexNumber | undefined {
    if (typeof encoded_index === 'number') {
        if (is_index_number(encoded_index))
            return encoded_index;
        return undefined;
    }

    if (typeof encoded_index !== 'string')
        return undefined;

    if (!/^(0|[1-9][0-9]*)$/.test(encoded_index))
        return;

    const index = parseInt(encoded_index, 10);

    return is_index_number(index)
        ? index
        : undefined;
}
