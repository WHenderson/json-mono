import {MaybeJsonish} from "../types";
import {Path} from "./types";
import {is_container, is_index_number} from "../guards";
import {parse_index} from "../util";
import {_next} from "./_next";

export function traverse_jsonish_update(parent: MaybeJsonish, path: Path, update: (value: MaybeJsonish) => MaybeJsonish): MaybeJsonish {
    if (path.length === 0)
        return update(parent);

    const [next, ...remainder] = path;

    const result_parent = parent !== undefined
        ? parent
        : is_index_number(next)
        ? []
        : {};

    const [key, child] = _next(result_parent, next);

    const result_child = traverse_jsonish_update(child, remainder, update);
    if (key === undefined || !is_container(result_parent)) {
        if (result_child !== undefined)
            throw new Error('Cannot set invalid path');
        return parent;
    }
    else
    if (Array.isArray(result_parent)) {
        if (key === 'length') {
            const length = parse_index(result_child);
            if (length === undefined)
                throw new RangeError('Invalid array length');

            result_parent.length = length;
        }
        else {
            const index = <number>key;
            result_parent[index] = result_child;
        }
    }
    else
    {
        Object.defineProperty(
            result_parent,
            key,
            {
                value: result_child,
                writable: true,
                enumerable: true,
                configurable: true
            }
        );
    }
    return result_parent;
}
