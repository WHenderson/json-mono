import {Json, JsonContainer} from "../types";
import {is_array} from "../guards/is_array";
import {is_object} from "../guards/is_object";
import {object_member} from "./object_member";
import {array_element} from "./array_element";
import {is_index} from "../guards";

/**
 * Returns the element or member of value identified by key_or_index
 *
 * @param value
 * @param key_or_index
 */
export function container_item(value: JsonContainer, key_or_index: number | string): Json | undefined {
    if (is_array(value)) {
        if (!is_index(key_or_index))
            return undefined;
        
        return array_element(value, key_or_index);
    }
    else
    if (is_object(value)) {
        return object_member(value, `${key_or_index}`);
    }

    return undefined;
}
