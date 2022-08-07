import {MaybeJson} from "../types";
import {Path} from "./types";
import {is_container, is_index_number} from "../guards";
import {parse_index, parse_index_string} from "../util";

export function traverse_json_update(parent: MaybeJson, path: Path, update: (value: MaybeJson) => MaybeJson): MaybeJson {
    if (path.length === 0)
        return update(parent);

    const [next, ...remainder] = path;

    if (parent !== undefined && !is_container(parent))
        throw new Error('invalid path');

    const result_parent = parent !== undefined
        ? parent
        : is_index_number(next)
        ? []
        : {};

    const [key, child] = (() => {
        if (typeof next === 'symbol')
            return [next, (<any>result_parent)[next]];

        if (Array.isArray(result_parent)) {
            if (next === 'length') {
                return [
                    next,
                    result_parent.length
                ];
            }
            else
            if (next === '-') {
                return [
                    result_parent.length,
                    undefined
                ]
            }
            else {
                const index = parse_index(next);
                if (index === undefined)
                    throw new Error('invalid path');

                if (index > result_parent.length)
                    throw new Error('cannot create sparse array');

                return [
                    index,
                    (index < result_parent.length)
                    ? result_parent[index]
                    : undefined
                ];
            }
        }
        else {
            return [
                next,
                Object.hasOwn(result_parent, next)
                ? result_parent[next]
                : undefined
            ];
        }
    })();

    const result_child = traverse_json_update(child, remainder, update);
    if (result_child === undefined) {
        if (parent !== result_parent)
            return undefined;

        if (typeof key === 'symbol') {
            delete (<any>result_parent)[key];
        }
        else
        if (Array.isArray(result_parent)) {
            if (key === 'length')
                throw new Error('cannot delete array length');
            if (!is_index_number(key))
                throw new Error('invalid path');

            result_parent.splice(key)
        }
        else {
            delete result_parent[key];
        }
    }
    else
    if (Array.isArray(result_parent)) {
        if (key === 'length') {
            const length = parse_index(result_child);
            if (length === undefined)
                throw new Error('invalid path');
            if (length > result_parent.length)
                throw new Error('cannot increase array length');
            result_parent.length = length;
        }
        else
        if (is_index_number(key)) {
            if (key > result_parent.length)
                throw new Error('cannot create sparse array');

            result_parent[key] = result_child;
        }
        else
            throw new Error('invalid path');
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
