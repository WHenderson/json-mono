import {Json, JsonObject} from "../types";
import {object_has_key} from "./object_has_key";

/**
 * Returns the given object member, or undefined
 *
 * @param json
 * @param key
 */
export function object_member(json: JsonObject, key: string): Json | undefined {
    if (!object_has_key(json, key))
        return undefined;

    return json[key];
}
