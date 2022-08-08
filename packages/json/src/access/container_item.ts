import {is_array, is_object} from "../guards";
import {object_member} from "./object_member";
import {array_element} from "./array_element";
import {parse_index} from "../util";

/**
 * Returns the requested member or element
 * Note that key_or_index will be converted to/from string/number as required depending on the type of value
 * Note that only array elements are considered for arrays. Properties such as length will not be returned.
 *
 * @param value
 * @param key_or_index
 */
export function container_item<T>(value: Record<string, T> | T[], key_or_index: number | string): T | undefined {
    if (is_array(value)) {
        const index = parse_index(key_or_index);
        if (index === undefined)
            return undefined;
        
        return array_element(value, index);
    }
    else
    if (is_object(value)) {
        return object_member(value, `${key_or_index}`);
    }

    return undefined;
}
