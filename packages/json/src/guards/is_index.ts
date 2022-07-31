/**
 * Returns true if value is a valid index (safe integer >= 0)
 * @param value
 */
export function is_index(value: any): value is number {
    return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}
