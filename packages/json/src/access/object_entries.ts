/**
 * Returns [key,value] pairs for each ownProperty entry in value
 *
 * @param value
 */
export function object_entries<T>(value: Record<string, T>): [string, T][] {
    return Object.entries(value);
}
