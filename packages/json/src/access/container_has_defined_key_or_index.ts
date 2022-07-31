import {is_array, is_index, is_object} from "../guards";
import {array_has_index} from "./array_has_index";
import {object_has_defined_key} from "./object_has_defined_key";

/**
 * Returns true if value has key or index
 * @param value
 * @param key_or_index
 */
export function container_has_defined_key_or_index<T>(value: Record<string, T> | T[], key_or_index: string | number): boolean {
    if (is_array(value)) {
        if (!is_index(key_or_index))
            return false;

        return array_has_index(value, key_or_index);
    }
    else
    if (is_object(value)) {
        return object_has_defined_key(value, `${key_or_index}`);
    }

    return false;
}
