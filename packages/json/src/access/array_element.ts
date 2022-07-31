import {array_has_index} from "./array_has_index";

/**
 * Returns the index item of value
 * @param value
 * @param index
 */
export function array_element<T>(value: T[], index: number): T | undefined {
    if (!array_has_index(value, index))
        return undefined;

    return value[index];
}
