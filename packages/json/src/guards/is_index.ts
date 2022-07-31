/**
 * Returns true if value is a valid index (integer >= 0)
 * @param value
 */
export function is_index(value: any): value is number {
    return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}
