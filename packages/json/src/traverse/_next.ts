import {Json, Jsonish} from "../types";
import {PathSegment} from "./types";
import {is_container} from "../guards";
import {parse_index} from "../util";
import {hasOwn} from "../util/_hasOwn";

export function _next(parent: Json, key_or_index: PathSegment): [PathSegment | undefined, Json];
export function _next(parent: Jsonish, key_or_index: PathSegment): [PathSegment | undefined, Jsonish];

export function _next(parent: Jsonish, key_or_index: PathSegment): [PathSegment | undefined, Jsonish] {
    if (!is_container(parent)) {
        return [
            undefined,
            undefined
        ]
    }
    else
    if (Array.isArray(parent)) {
        if (key_or_index === 'length') {
            return [
                key_or_index,
                parent.length
            ];
        }
        else
        if (key_or_index === '-') {
            return [
                parent.length,
                undefined
            ]
        }
        else {
            const index = parse_index(key_or_index);
            if (index === undefined) {
                return [
                    undefined,
                    undefined
                ]
            }

            return [
                index,
                (index < parent.length)
                    ? parent[index]
                    : undefined
            ];
        }
    }
    else {
        const key = `${key_or_index}`;
        return [
            key,
            hasOwn(parent, key)
                ? parent[key]
                : undefined
        ];
    }
}
