import {is_array, is_index_number, is_object} from "../guards";
import {object_member} from "./object_member";
import {array_element} from "./array_element";

/**
 * Returns the element or member of value identified by key_or_index
 *
 * @param value
 * @param key_or_index
 */
export function container_item<T>(value: Record<string, T> | T[], key_or_index: number | string): T | undefined {
    if (is_array(value)) {
        if (!is_index_number(key_or_index))
            return undefined;
        
        return array_element(value, key_or_index);
    }
    else
    if (is_object(value)) {
        return object_member(value, `${key_or_index}`);
    }

    return undefined;
}
