import {Json} from "../types";
import {is_primitive} from "../guards/is_primitive";
import {is_array} from "../guards/is_array";

/**
 * Returns a deep clone of the given value
 * Note: Does not support recursive objects
 * @param value
 */
export function clone(value: Json): Json {
    if (is_primitive(value))
        return value;

    if (is_array(value))
        return value.map(element => clone(element));

    return Object.fromEntries(
        Object
            .entries(value)
            .map(([key, member]) => <[string, Json]>[key, clone(member)])
    );
}
