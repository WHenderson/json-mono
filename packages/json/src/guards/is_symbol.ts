/**
 * Returns true if value is a symbol
 * @param value
 */
export function is_symbol(value: any): value is symbol {
    return typeof value === 'symbol';
}
