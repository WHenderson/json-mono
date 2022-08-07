import {Json, MaybeJson} from "../types";
import {Path, PathSegment} from "./types";
import {traverse_json_update} from "./traverse_json_update";
import {traverse_delete} from "./traverse_delete";

export function traverse_json_set(parent: MaybeJson, path: Path, value: MaybeJson, creator?: (next: PathSegment) => Json): MaybeJson {
    if (value === undefined)
        return traverse_delete(parent, path);
    else
        return traverse_json_update(parent, path, () => value, creator);
}
