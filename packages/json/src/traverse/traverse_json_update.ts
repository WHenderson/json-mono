import {MaybeJson} from "../types";
import {Path} from "./types";
import {is_container, is_index_number} from "../guards";
import {parse_index} from "../util";
import {_next} from "./_next";

export function traverse_json_update(parent: MaybeJson, path: Path, update: (value: MaybeJson) => MaybeJson): MaybeJson {
    if (path.length === 0)
        return update(parent);

    const [next, ...remainder] = path;

    const result_parent = parent !== undefined
        ? parent
        : is_index_number(next)
        ? []
        : {};

    const [key, child] = _next(result_parent, next);

    const result_child = traverse_json_update(child, remainder, update);
    if (result_child === undefined) {
        if (key === undefined || !is_container(result_parent))
            return parent;
        else
        if (parent !== result_parent)
            return undefined;
        else
        if (Array.isArray(result_parent)) {
            if (key === 'length')
                throw new RangeError('Invalid array length');

            result_parent.splice(<number>key, 1)
        }
        else {
            delete result_parent[key];
        }
    }
    else
    if (key === undefined || !is_container(result_parent)) {
        throw new Error('Cannot set invalid path');
    }
    else
    if (Array.isArray(result_parent)) {
        if (key === 'length') {
            const length = parse_index(result_child);
            if (length === undefined)
                throw new RangeError('Invalid array length');
            if (length > result_parent.length)
                throw new RangeError('Undefined elements not supported');

            result_parent.length = length;
        }
        else {
            const index = <number>key;
            if (index > result_parent.length)
                throw new RangeError('Undefined elements not supported');

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
