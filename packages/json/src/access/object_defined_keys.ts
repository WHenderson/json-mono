import {JsonObject} from "../types";
import {object_defined_entries} from "./object_defined_entries";

/**
 * Return all keys which map to a defined value
 *
 * @param obj
 */
export function object_defined_keys(obj: JsonObject): string[] {
    return object_defined_entries(obj).map(([key,_value]) => key);
}
