import {MaybeJson, MaybeJsonish} from "../types";
import {Path} from "./types";
import {is_array, is_container, is_index_number, is_number} from "../guards";
import {parse_index_string} from "../util";

export function traverse_get(root: MaybeJsonish, path: Path): MaybeJsonish;
export function traverse_get(root: MaybeJson, path: Path): MaybeJson;

export function traverse_get(root: any, path: Path): any {
    if (path.length === 0)
        return root;

    let node = root;
    for (const segment of path) {
        if (!is_container(node))
            return undefined;

        if (typeof segment === 'symbol') {
            node = (<any>node)[segment];
        }
        else
        if (is_array(node)) {
            if (segment === 'length' )
                node = node.length;
            else
            if (segment === '-' )
                node = undefined;
            else
            if (is_number(segment)) {
                if (!is_index_number(segment) || segment >= node.length)
                    return undefined;

                node = node[segment];
            }
            else {
                const index = parse_index_string(segment);
                if (index === undefined || index >= node.length)
                    return undefined;

                node = node[index];
            }
        }
        else {
            if (!Object.hasOwn(node, segment))
                return undefined;

            node = node[segment];
        }
    }
    return node;
}
