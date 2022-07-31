/**
 * Returns [key,value] pairs for each entry of in value
 *
 * @param value
 */
export function object_defined_entries<T>(value: Record<string, T>): [string, T][] {
    return Object.entries(value).filter(([_key,value]) => value !== undefined);
}
