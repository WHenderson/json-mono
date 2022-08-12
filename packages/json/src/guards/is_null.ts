/**
 * Returns true if value is null
 * @param value
 * @group guards
 */
export function is_null(value: any): value is null {
    return value === null;
}
