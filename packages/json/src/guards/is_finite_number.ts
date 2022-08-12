import {FiniteNumber} from "../types";

/**
 * Returns true if value is a finite number.
 * @param value
 * @group guards
 */
export function is_finite_number(value: any): value is FiniteNumber {
    return typeof value === 'number' && Number.isFinite(value);
}
