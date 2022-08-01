import {Pointer} from '@crikey/json-pointer';
import {parse_index} from '@crikey/json';

export function is_relative(pointer: any): pointer is Pointer {
    if (typeof pointer !== 'string')
        return false;

    const match = pointer.match(/^(0|[1-9][0-9]*)(?:$|\/(?:[^~:]|~0|~1|:0|:1)*$)/);

    return !!match && parse_index(match[1]) !== undefined;
}
