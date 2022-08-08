/**
 * Returns true if value is a number.
 * Note that number could still be a type not directly supported by JSON such as Inf and NaN
 * See {@link is_finite_number} to check if number is a value supported by JSON
 * @param value
 */
export function is_number(value: any): value is number {
    return typeof value === 'number';
}
