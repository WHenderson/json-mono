import {MaybeJson} from "../types";
import {Path} from "./types";
import {traverse_json_update} from "./traverse_json_update";
import {traverse_json_delete} from "./traverse_json_delete";

export function traverse_json_set(parent: MaybeJson, path: Path, value: MaybeJson): MaybeJson {
    if (value === undefined)
        return traverse_json_delete(parent, path);
    else
        return traverse_json_update(parent, path, () => value);
}
