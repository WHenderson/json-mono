import {MaybeJsonish} from "../types";
import {Path} from "./types";
import {is_container, is_index_number} from "../guards";
import {parse_index, parse_index_string} from "../util";

export function traverse_jsonish_update(root: MaybeJsonish, path: Path, update: (value: MaybeJsonish) => MaybeJsonish): MaybeJsonish;

export function traverse_jsonish_update(parent: any, path: Path, update: (value: any) => any): any {
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
            return [next, result_parent[next]];

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
            else
            if (is_index_number(next)) {
                return [
                    next,
                    (next < result_parent.length)
                        ? result_parent[next]
                        : undefined
                ];
            }
            else
            if (typeof next === 'string') {
                const index = parse_index_string(next);
                if (index !== undefined && index < result_parent.length)
                    return [index, result_parent[index]];
            }
            throw new Error('invalid path');
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

    const result_child = traverse_jsonish_update(child, remainder, update);
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
        if (is_index_number(key))
            result_parent[key] = result_child;
        else
            throw new Error('invalid path');
    }
    else
    {
        (<any>result_parent)[key] = result_child;
    }
    return result_parent;
}
