import {Json, MaybeJson} from "../types";
import {Path, PathSegment} from "./types";
import {is_container} from "../guards";
import {parse_index} from "../util";
import {_next} from "./_next";
import {creator_err_object} from "./creator_err_object";

/**
 * Traverses root with the given path, creating missing members and elements as required, and applies update to the final value.
 * Note: if update returns undefined, the leaf node is deleted and any generated parents are discarded
 * @returns the original (but modified) root, or the result of updating the original root if path is empty
 * @param root
 * @param path
 * @param update accepts the current value and returns the resulting value
 * @param creator optional method for creating missing parents as a path is constructed. default is {@link creator_err_object}
 * @group traverse
 */
export function traverse_json_update(root: MaybeJson, path: Path, update: (value: MaybeJson) => MaybeJson, creator?: (next: PathSegment) => Json): MaybeJson;

export function traverse_json_update(parent: MaybeJson, path: Path, update: (value: MaybeJson) => MaybeJson, creator?: (next: PathSegment) => Json): MaybeJson {
    if (path.length === 0)
        return update(parent);

    const [next, ...remainder] = path;

    const result_parent = parent !== undefined
        ? parent
        : (creator ?? creator_err_object)(next);

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
