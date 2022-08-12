import {JsonToType, JsonTypeEnum} from "../types";
import {is_array, is_object} from "../guards";

/**
 * Returns the type of the given value
 * @param value
 * @group util
 */
export function get_type<T>(value: T) : JsonToType<T>;

export function get_type(value : any) : JsonTypeEnum {
    switch (value) {
        case undefined:
            return JsonTypeEnum.UNDEFINED;
        case null:
            return JsonTypeEnum.NULL;
        default: {
            switch (typeof value) {
                case 'boolean':
                    return JsonTypeEnum.BOOLEAN;
                case 'number':
                    return JsonTypeEnum.NUMBER;
                case 'string':
                    return JsonTypeEnum.STRING;
                default: {
                    if (is_object(value))
                        return JsonTypeEnum.OBJECT;
                    if (is_array(value))
                        return JsonTypeEnum.ARRAY;
                }
            }
        }
    }

    throw new TypeError('unexpected type');
}
