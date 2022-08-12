import {Json, JsonContainer, JsonPrimitive} from "../types";
import {is_primitive} from "./is_primitive";
import {is_array} from "./is_array";
import {is_object} from "./is_object";
import {is_number} from "./is_number";
import {is_finite_number} from "./is_finite_number";
import {is_undefined} from "./is_undefined";

/**
 * Returns true if value is a json object where every nested value is encodable
 * Note that object members may be undefined but array elements must all be defined
 * @param value
 * @group guards
 */
export function is_encodable_json_deep<T>(value: any | JsonPrimitive | T[] | Record<string, T>): value is JsonPrimitive | T[] | Record<string, T> {
    return _is_encodable_json_deep(value, []);
}

function _is_encodable_json_deep(value: any, stack: JsonContainer[]): value is Json {
    if (is_undefined(value))
        return false;

    if (is_number(value))
        return is_finite_number(value);

    if (is_primitive(value))
        return true;

    if (stack.some(parent => parent === value))
        return false; // Circular structures are not JSON compatible

    const stack_ = [...stack, value];

    if (is_array(value))
        return value.every(element => _is_encodable_json_deep(element, stack_));

    if (is_object(value))
        return Object.values(value).every(element => element === undefined || _is_encodable_json_deep(element, stack_));

    return false;
}
