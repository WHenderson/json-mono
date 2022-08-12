/**
 * Returns true if value contains the given key
 *
 * @param value
 * @param key
 * @group access
 */
export function object_has_key<T>(value: Record<string, T>, key: string): boolean {
    return ({}).hasOwnProperty.call(value, key);
}
