import {Jsonish, MaybeJsonish} from "../types";
import {Path, PathSegment} from "./types";
import {traverse_jsonish_update} from "./traverse_jsonish_update";

export function traverse_jsonish_set(parent: MaybeJsonish, path: Path, value: MaybeJsonish, creator?: (next: PathSegment) => Jsonish): MaybeJsonish {
    return traverse_jsonish_update(parent, path, () => value, creator);
}
