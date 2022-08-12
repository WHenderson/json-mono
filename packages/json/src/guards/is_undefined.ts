/**
 * Returns true if value is undefined
 * @param value
 * @group guards
 */
export function is_undefined(value: any): value is undefined {
    return value === undefined;
}
