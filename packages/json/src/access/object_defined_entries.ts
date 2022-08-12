/**
 * Returns [key,value] pairs for each defined ownProperty entry in value
 *
 * @param value
 * @group access
 */
export function object_defined_entries<T>(value: Record<string, T>): [string, T][] {
    return Object.entries(value).filter(([_key,value]) => value !== undefined);
}
