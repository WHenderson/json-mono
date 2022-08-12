import {Jsonish, MaybeJsonish} from "../types";
import {Path, PathSegment} from "./types";
import {is_container} from "../guards";
import {parse_index} from "../util";
import {_next} from "./_next";
import {creator_err_object} from "./creator_err_object";

/**
 * Traverses root with the given path, creating missing members and elements as required, and applies update to the final value.
 * @returns the original (but modified) root, or the result of updating the original root if path is empty
 * @param root
 * @param path
 * @param update accepts the current value and returns the resulting value
 * @param creator optional method for creating missing parents as a path is constructed. default is {@link creator_err_object}
 * @group traverse
 */
export function traverse_jsonish_update(root: MaybeJsonish, path: Path, update: (value: MaybeJsonish) => MaybeJsonish, creator?: (next: PathSegment) => Jsonish): MaybeJsonish;

export function traverse_jsonish_update(parent: MaybeJsonish, path: Path, update: (value: MaybeJsonish) => MaybeJsonish, creator?: (next: PathSegment) => Jsonish): MaybeJsonish {
    if (path.length === 0)
        return update(parent);

    const [next, ...remainder] = path;

    const result_parent = parent !== undefined
        ? parent
        : (creator ?? creator_err_object)(next);

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
