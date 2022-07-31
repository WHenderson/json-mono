import {JsonPrimitive} from "../types";
import {is_json} from "./is_json";

export function is_encodable_json<T>(value: any | JsonPrimitive | T[] | Record<string, T>): value is JsonPrimitive | T[] | Record<string, T> {
    return (typeof value === 'number')
    ? Number.isFinite(value)
    : is_json(value);
}
