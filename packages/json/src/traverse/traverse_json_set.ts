import {Json, MaybeJson} from "../types";
import {Path, PathSegment} from "./types";
import {traverse_json_update} from "./traverse_json_update";
import {traverse_delete} from "./traverse_delete";

/**
 * Traverses root with the given path, creating missing members and elements as required, setting the final value to value.
 * If value is undefined, then the leaf node is deleted and any generated parents are discarded
 * @param root
 * @param path
 * @param value
 * @param creator optional method for creating missing parents as a path is constructed. default is {@link creator_err_object}
 */
export function traverse_json_set(root: MaybeJson, path: Path, value: MaybeJson, creator?: (next: PathSegment) => Json): MaybeJson {
    if (value === undefined)
        return traverse_delete(root, path);
    else
        return traverse_json_update(root, path, () => value, creator);
}
