import {JsonContainer} from "../types";
import {is_array} from "../guards/is_array";
import {is_object} from "../guards/is_object";
import {array_has_index} from "./array_has_index";
import {object_has_key} from "./object_has_key";
import {is_index} from "../guards";

/**
 * Returns true if value has key or index
 * @param value
 * @param key_or_index
 */
export function container_has_key_or_index(value: JsonContainer, key_or_index: string | number): boolean {
    if (is_array(value)) {
        if (!is_index(key_or_index))
            return false;

        return array_has_index(value, key_or_index);
    }
    else
    if (is_object(value)) {
        return object_has_key(value, `${key_or_index}`);
    }

    return false;
}
