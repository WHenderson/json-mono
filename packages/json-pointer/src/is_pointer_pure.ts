import {PurePointer} from "./types";
import {parse_index_string} from '@crikey/json';

/**
 * Returns true if value is an absolute or relative pointer.
 * Returns false on invalid or iref pointers.
 * @param value
 */
export function is_pointer_pure(value: any) : value is PurePointer {
    if (typeof value !== 'string')
        return false;

    const match = value.match(/^(?:(0|[1-9][0-9]*)(?:$|\/(?:[^~]|~0|~1)*$)|(?:$|\/(?:[^~]|~0|~1)*$))/);
    return !!match && (match[1] === undefined || parse_index_string(match[1]) !== undefined);
}
