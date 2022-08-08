import {MaybeJson, MaybeJsonish} from "../types";
import {Path} from "./types";
import {is_container} from "../guards";
import {_next} from "./_next";

/**
 * Traverses root with the given path, deleting the last item if it exists
 * @returns the original input, or undefined if path was empty
 * @param root
 * @param path
 */
export function traverse_delete(root: MaybeJson, path: Path): MaybeJson;

/**
 * Traverses root with the given path, deleting the last item if it exists
 * @returns the original input, or undefined if path was empty
 * @param root
 * @param path
 */
export function traverse_delete(root: MaybeJsonish, path: Path): MaybeJsonish;

export function traverse_delete(parent: MaybeJsonish, path: Path): MaybeJsonish {
    if (path.length === 0)
        return undefined;

    if (!is_container(parent))
        return parent;

    const [next, ...remainder] = path;

    const result_parent = parent;

    const [key, child] = _next(result_parent, next);

    if (key === undefined || child === undefined)
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
        traverse_delete(child, remainder);

    return result_parent;
}

