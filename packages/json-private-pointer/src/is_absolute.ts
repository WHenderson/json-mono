import {AbsolutePointer} from "./types";

/**
 * Returns true if value is a string representing a private pointer
 * @param value
 */
export function is_absolute(value: any): value is AbsolutePointer {
    if (typeof value !== 'string')
        return false;

    return /^(?:$|\/(?:[^~:]|~0|~1|:0|:1)*$)/.test(value);
}
