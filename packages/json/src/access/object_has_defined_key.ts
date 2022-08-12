/**
 * Returns true if value contains the given key with a defined value
 *
 * @param value
 * @param key
 * @group access
 */
export function object_has_defined_key<T>(value: Record<string, T>, key: string): boolean {
    return ({}).hasOwnProperty.call(value, key) && value[key] !== undefined;
}
