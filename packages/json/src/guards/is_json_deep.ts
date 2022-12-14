import {Json, JsonContainer, JsonPrimitive} from "../types";
import {is_primitive} from "./is_primitive";
import {is_array} from "./is_array";
import {is_object} from "./is_object";

/**
 * Returns true if value, and any deeply contained values, are json types.
 * Note that this does not guarantee that all values are encodable.
 * Note that object members may be undefined
 *
 * @param value
 * @group guards
 */
export function is_json_deep<T>(value: any | JsonPrimitive | T[] | Record<string, T>): value is JsonPrimitive | T[] | Record<string, T> {
    return _is_json_deep(value, []);
}

function _is_json_deep(value: any, stack: JsonContainer[]): value is Json {
    if (is_primitive(value))
        return true;

    if (stack.some(parent => parent === value))
        return false; // Circular structures are not JSON compatible

    const stack_ = [...stack, value];

    if (is_array(value))
        return value.every(element => _is_json_deep(element, stack_));

    if (is_object(value))
        return Object.values(value).every(element => element === undefined || _is_json_deep(element, stack_));

    return false;
}
