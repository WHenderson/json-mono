import {object_has_key} from "./object_has_key";

/**
 * Returns the requested object member, or undefined
 *
 * @param json
 * @param key
 */
export function object_member<T>(json: Record<string, T>, key: string): T | undefined {
    if (!object_has_key(json, key))
        return undefined;

    return json[key];
}
