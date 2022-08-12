import {MaybeJson, MaybeJsonish} from "../types";
import {Path} from "./types";
import {is_array, is_container} from "../guards";
import {parse_index} from "../util";

/**
 * Traverses root with the given path, returning true if the entire path exists
 * @param root
 * @param path
 * @group traverse
 */
export function traverse_has(root: MaybeJson, path: Path): boolean;

/**
 * Traverses root with the given path, returning true if the entire path exists
 * @param root
 * @param path
 * @group traverse
 */
export function traverse_has(root: MaybeJsonish, path: Path): boolean;

export function traverse_has(root: MaybeJsonish, path: Path): boolean {
    if (path.length === 0)
        return root !== undefined;

    let node = root;
    for (const segment of path) {
        if (!is_container(node))
            return false;

        if (is_array(node)) {
            if (segment === 'length' )
                node = node.length;
            else
            if (segment === '-' )
                return false;
            else {
                const index = parse_index(segment);
                if (index === undefined || index >= node.length)
                    return false;

                node = node[index];
            }
        }
        else {
            if (!Object.hasOwn(node, segment))
                return false;

            node = node[segment];
        }
    }
    return true;
}
