import {AbsolutePointer} from "./types";

/**
 * Returns true if value is a string representing a JSON Pointer
 * @see [RFC6901 - JavaScript Object Notation (JSON) Pointer](https://datatracker.ietf.org/doc/html/rfc6901)
 * @param value
 * @group Guards
 */
export function is_absolute(value: any): value is AbsolutePointer {
    if (typeof value !== 'string')
        return false;

    return /^(?:$|\/(?:[^~]|~0|~1)*$)/.test(value);
}
