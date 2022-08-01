import {Pointer} from '@crikey/json-pointer';

export function is_absolute(pointer: any): pointer is Pointer {
    if (typeof pointer !== 'string')
        return false;

    return /^(?:$|\/(?:[^~:]|~0|~1|:0|:1)*$)/.test(pointer);
}
