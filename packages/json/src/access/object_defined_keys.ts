import {object_defined_entries} from "./object_defined_entries";

/**
 * Returns all keys ownProperty keys within value which have a defined value
 *
 * @param obj
 * @group access
 */
export function object_defined_keys<T>(obj: Record<string, T>): string[] {
    return object_defined_entries(obj).map(([key,_value]) => key);
}
