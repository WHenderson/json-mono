/**
 * Returns true if value is a safe integer
 * @see [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)
 * @param value
 * @group guards
 */
export function is_safe_integer(value: any): value is number {
    return Number.isSafeInteger(value);
}
