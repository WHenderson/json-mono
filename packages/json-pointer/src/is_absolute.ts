import {Pointer} from "./types";

/**
 * Returns true if pointer is a string representing a JSON Pointer
 * @see [RFC6901 - JavaScript Object Notation (JSON) Pointer](https://datatracker.ietf.org/doc/html/rfc6901)
 * @param pointer
 */
export function is_absolute(pointer: any) : pointer is Pointer {
    if (typeof pointer !== 'string')
        return false;

    return /^(?:$|\/)/.test(pointer);
}
