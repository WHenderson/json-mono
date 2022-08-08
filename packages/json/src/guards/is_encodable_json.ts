import {JsonPrimitive} from "../types";
import {is_json} from "./is_json";

/**
 * Returns true if a shallow check of value finds an encodable json value
 * @param value
 */
export function is_encodable_json<T>(value: any | JsonPrimitive | T[] | Record<string, T>): value is JsonPrimitive | T[] | Record<string, T> {
    return (typeof value === 'number')
    ? Number.isFinite(value)
    : is_json(value);
}
