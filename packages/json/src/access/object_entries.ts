import {Json, JsonObject} from "../types";

/**
 * Returns [key,value] pairs for each entry of in value
 *
 * @param value
 */
export function object_entries(value: JsonObject): [string, Json][] {
    return Object.entries(value);
}
