/**
 * Returns all keys ownProperty keys within value.
 *
 * @param value
 */
export function object_keys<T>(value: Record<string, T>): string[] {
    return Object.getOwnPropertyNames(value);
}
