/**
 * Returns true if value is an array
 * Note that this is not a deep check. Value may hold values which are not JSON compatible.
 *
 * @param value
 * @group guards
 */
export function is_array<T>(value: any | T[]): value is T[] {
    return Array.isArray(value);
}
