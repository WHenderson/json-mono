import {Json, JsonToType, JsonTypeEnum} from "./index";
import {is_array, is_object} from "../guards";

/**
 * Returns the type of the given value
 * @param value
 */
export function get_type<T extends Json>(value : T) : JsonToType<T> {
    switch (value) {
        case undefined:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            break;
        case null:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return <any>JsonTypeEnum.NULL;
        default: {
            switch (typeof value) {
                case 'boolean':
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return <any>JsonTypeEnum.BOOLEAN;
                case 'number':
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return <any>JsonTypeEnum.NUMBER;
                case 'string':
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return <any>JsonTypeEnum.STRING;
                default: {
                    if (is_object(value))
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        return <any>JsonTypeEnum.OBJECT;
                    if (is_array(value))
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        return <any>JsonTypeEnum.ARRAY;
                }
            }
        }
    }

    throw new TypeError('unexpected type');
}
