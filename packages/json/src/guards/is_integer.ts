/**
 * Returns true if value is an integer
 * @see [Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
 * @param value
 */
export function is_integer(value: any): value is number {
    return Number.isInteger(value);
}
