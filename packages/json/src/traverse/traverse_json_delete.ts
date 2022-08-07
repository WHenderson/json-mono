import {MaybeJson} from "../types";
import {Path} from "./types";
import {is_container} from "../guards";
import {parse_index} from "../util";

export function traverse_json_delete(parent: MaybeJson, path: Path): MaybeJson {
    if (path.length === 0)
        return undefined;

    if (!is_container(parent))
        return parent;

    const [next, ...remainder] = path;

    const result_parent = parent;

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

    if (child === undefined)
        return parent;

    if (remainder.length === 0) {
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
        traverse_json_delete(child, remainder);

    return result_parent;
}

