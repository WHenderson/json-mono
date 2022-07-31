/**
 * Returns true if value is an object or array type
 * Note that this is not a deep check. Value may hold values which are not JSON compatible.
 *
 * @param value
 */
export function is_container<T>(value: any | T[] | Record<string, T>): value is T[] | Record<string, T> {
    return value !== null && typeof value === 'object';
}
