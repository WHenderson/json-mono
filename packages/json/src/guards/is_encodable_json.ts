import {Json} from "../types";
import {is_json} from "./is_json";

export function is_encodable_json(value: any): value is Json {
    return (typeof value === 'number' && Number.isFinite(value)) || is_json(value);
}
