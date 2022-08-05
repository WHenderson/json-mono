import {MaybeJsonish} from "../types";
import {Path} from "./types";
import {traverse_jsonish_update} from "./traverse_jsonish_update";

export function traverse_jsonish_set(parent: MaybeJsonish, path: Path, value: MaybeJsonish): MaybeJsonish {
    return traverse_jsonish_update(parent, path, () => value);
}
