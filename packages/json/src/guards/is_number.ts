/**
 * Returns true if value is a number.
 * Note that number could still be a type not directly supported by JSON such as Inf and NaN
 * @param value
 */
export function is_number(value: any): value is number {
    return typeof value === 'number';
}
