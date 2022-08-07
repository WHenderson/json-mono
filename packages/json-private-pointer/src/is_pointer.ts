import {Pointer} from '@crikey/json-pointer';
import {parse_index_string} from "@crikey/json";

export function is_pointer(pointer: any): pointer is Pointer {
    if (typeof pointer !== 'string')
        return false;

    const match = pointer.match(/^(0|[1-9][0-9]*)?(?:$|\/(?:[^~:]|~0|~1|:0|:1)*$)/);

    return !!match && (match[1] === undefined || parse_index_string(match[1]) !== undefined);
}
