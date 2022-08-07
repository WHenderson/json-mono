import {JsonContainer, MaybeJson} from "../types";
import {is_array} from "../guards";
import {parse_index} from "./parse_index";

export function safe_set_json_value<T extends JsonContainer>(parent: T, key: PropertyKey, value: MaybeJson): T {
    if (typeof key === 'symbol') {
        if (value === undefined)
            delete (<any>parent)[key];
        else
            (<any>parent)[key] = value;
    } else if (is_array(parent)) {
        if (key === 'length')
            parent.length = <any>value;
        else if (key === '-') {
            if (value !== undefined)
                parent[parent.length] = value;
        } else {
            const index = parse_index(key);
            if (index === undefined)
                throw new Error('invalid array key');

            if (value === undefined) {
                if (index < length)
                    parent.splice(index, 1);
            } else {
                if (index > length)
                    throw new Error('cannot create sparse array');
                parent[index] = value;
            }
        }
    } else {
        Object.defineProperty(
            parent,
            key,
            {value}
        );
    }

    return parent;
}
