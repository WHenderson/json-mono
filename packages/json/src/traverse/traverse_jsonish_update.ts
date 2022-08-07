import {MaybeJsonish} from "../types";
import {Path} from "./types";
import {is_container, is_index_number} from "../guards";
import {parse_index} from "../util";

export function traverse_jsonish_update(parent: MaybeJsonish, path: Path, update: (value: MaybeJsonish) => MaybeJsonish): MaybeJsonish {
    if (path.length === 0)
        return update(parent);

    const [next, ...remainder] = path;

    const result_parent = parent !== undefined
        ? parent
        : is_index_number(next)
        ? []
        : {};

    const [key, child] = (() => {
        if (!is_container(result_parent)) {
            return [
                undefined,
                undefined
            ]
        }
        else
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
                if (index === undefined) {
                    return [
                        undefined,
                        undefined
                    ]
                }

                return [
                    index,
                    (index < result_parent.length)
                    ? result_parent[index]
                    : undefined
                ];
            }
        }
        else {
            const key = `${next}`;
            return [
                key,
                Object.hasOwn(result_parent, key)
                    ? result_parent[key]
                    : undefined
            ];
        }
    })();

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
