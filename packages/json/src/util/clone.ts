import {Json, JsonContainerish, Jsonish, JsonPrimitive} from "../types";
import {is_array, is_primitive} from "../guards";

/**
 * Returns a deep clone of the given value Json or Jsonish value
 * @param value
 */
export function clone<T>(value: undefined | JsonPrimitive | T[] | Record<string, T>): undefined | JsonPrimitive | T[] | Record<string, T>;


export function clone(value: Jsonish): Jsonish {
    return _clone(value, []);
}

export function _clone(value: Jsonish, stack: JsonContainerish[]): Jsonish {
    if (value === undefined || is_primitive(value))
        return value;

    if (stack.some(parent => parent === value))
        throw new Error('recursive structure detected');

    const stack_ = [...stack, value];

    if (is_array(value))
        return value.map(element => _clone(element, stack_));

    return Object.fromEntries(
        Object
            .entries(value)
            .map(([key, member]) => <[string, Json]>[key, _clone(member, stack_)])
    );
}
