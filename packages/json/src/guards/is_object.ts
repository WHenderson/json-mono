/**
 * Returns true if value is an object (and not an array)
 * Note that this is not a deep check. Value may hold values which are not JSON compatible.
 *
 * @param value
 * @group guards
 */
export function is_object<T>(value: any | Record<string, T>): value is Record<string, T> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}
