/**
 * Parses the given encoded_index into an index, or undefined if it is invalid
 * @param index
 */
import {is_index} from "../guards";

export function parse_index(encoded_index: string) : number | undefined {
    if (!/^(0|[1-9][0-9]*)$/.test(encoded_index))
        return;

    const index = parseInt(encoded_index, 10);

    return is_index(index)
        ? index
        : undefined;
}
