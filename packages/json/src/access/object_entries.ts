/**
 * Returns [key,value] pairs for each entry of in value
 *
 * @param value
 */
export function object_entries<T>(value: Record<string, T>): [string, T][] {
    return Object.entries(value);
}
