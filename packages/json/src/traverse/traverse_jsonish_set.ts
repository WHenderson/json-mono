import {Jsonish, MaybeJsonish} from "../types";
import {Path, PathSegment} from "./types";
import {traverse_jsonish_update} from "./traverse_jsonish_update";

/**
 * Traverses root with the given path, creating missing members and elements as required, setting the final value to value
 * @param root
 * @param path
 * @param value
 * @param creator optional method for creating missing parents as a path is constructed. default is {@link creator_err_object}
 * @group traverse
 */
export function traverse_jsonish_set(root: MaybeJsonish, path: Path, value: MaybeJsonish, creator?: (next: PathSegment) => Jsonish): MaybeJsonish {
    return traverse_jsonish_update(root, path, () => value, creator);
}
