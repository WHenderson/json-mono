/**
 * Returns true if value is a string
 * @param value
 */
export function is_string(value: any): value is string {
    return typeof value === 'string';
}
