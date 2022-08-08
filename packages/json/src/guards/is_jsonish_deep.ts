import {Json, JsonContainer, JsonPrimitive} from "../types";
import {is_primitive} from "./is_primitive";
import {is_array} from "./is_array";
import {is_object} from "./is_object";

/**
 * Returns true if value, and any deeply contained values, are jsonish types.
 * Note that this does not guarantee that all values are encodable.
 *
 * @param value
 */
export function is_jsonish_deep<T>(value: any | undefined | JsonPrimitive | T[] | Record<string, T>): value is undefined | JsonPrimitive | T[] | Record<string, T> {
    return _is_jsonish_deep(value, []);
}

function _is_jsonish_deep(value: any, stack: JsonContainer[]): value is Json {
    if (is_primitive(value))
        return true;

    if (stack.some(parent => parent === value))
        throw new Error('recursive structure detected');

    const stack_ = [...stack, value];

    if (is_array(value))
        return value.every(element => _is_jsonish_deep(element, stack_));

    if (is_object(value))
        return Object.values(value).every(element => _is_jsonish_deep(element, stack_));

    return false;
}
