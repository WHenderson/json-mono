import {Json, JsonContainer} from "../types";
import {is_primitive} from "./is_primitive";
import {is_array} from "./is_array";
import {is_object} from "./is_object";
import {is_number} from "./is_number";
import {is_finite_number} from "./is_finite_number";

/**
 * Returns true if value is a json object where every nested value is encodable
 * Note that object members may be undefined
 * @param value
 */
export function is_encodable_json_deep(value: any): value is Json {
    return _is_encodable_json_deep(value, []);
}

function _is_encodable_json_deep(value: any, stack: JsonContainer[]): value is Json {
    if (is_number(value))
        return is_finite_number(value);

    if (is_primitive(value))
        return true;

    if (stack.some(parent => parent === value))
        throw new Error('recursive structure detected');

    const stack_ = [...stack, value];

    if (is_array(value))
        return value.every(element => _is_encodable_json_deep(element, stack_));

    if (is_object(value))
        return Object.values(value).every(element => element === undefined || _is_encodable_json_deep(element, stack_));

    return false;
}
