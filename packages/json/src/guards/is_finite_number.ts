/**
 * Returns true if value is a finite number.
 * @param value
 */
export function is_finite_number(value: any): value is number {
    return typeof value === 'number' && Number.isFinite(value);
}
