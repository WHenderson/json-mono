import {Json, JsonContainer} from "../types";
import {is_primitive} from "./is_primitive";
import {is_array} from "./is_array";
import {is_object} from "./is_object";

/**
 * Returns true if value, and any deeply contained values, are json types.
 * Note that this does not guarantee that all values are encodable.
 * Note that object members cannot be undefined
 *
 * @param value
 */
export function is_pure_json_deep(value: any): value is Json {
    return _is_pure_json_deep(value, []);
}

function _is_pure_json_deep(value: any, stack: JsonContainer[]): value is Json {
    if (is_primitive(value))
        return true;

    if (stack.some(parent => parent === value))
        return false; // recursive structure

    const stack_ = [...stack, value];

    if (is_array(value))
        return value.every(element => _is_pure_json_deep(element, stack_));

    if (is_object(value))
        return Object.values(value).every(element => _is_pure_json_deep(element, stack_));

    return false;
}
