/**
 * Returns true if value is boolean
 * @param value
 */
export function is_boolean(value: any): value is boolean {
    return typeof value === 'boolean';
}
