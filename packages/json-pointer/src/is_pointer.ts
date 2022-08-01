import {Pointer} from "./types";
import {parse_index} from '@crikey/json';

export function is_pointer(pointer: any) : pointer is Pointer {
    if (typeof pointer !== 'string')
        return false;

    const match = pointer.match(/^(?:(0|[1-9][0-9]*)(?:$|#$|\/)|(?:$|\/))/);
    return !!match && (match[1] === undefined || parse_index(match[1]) !== undefined);
}
