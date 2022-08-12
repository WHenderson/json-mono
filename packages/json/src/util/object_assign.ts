import {JsonObject} from "../types";

/**
 * Safe version of Object.assign which doesn't risk polluting the result object via `__proto__`
 *
 * @param target
 * @param sources
 * @group util
 */
export function object_assign(target: JsonObject, ...sources: JsonObject[]): JsonObject {
    for (const source of sources) {
        for (const key of Object.getOwnPropertyNames(source)) {
            Object.defineProperty(
                target,
                key,
                Object.getOwnPropertyDescriptor(source, key)!
            );
        }
    }

    return target;
}
