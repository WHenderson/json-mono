/**
 * Returns true if value is a finite number.
 * @param value
 */
import {FiniteNumber} from "../types";

export function is_finite_number(value: any): value is FiniteNumber {
    return typeof value === 'number' && Number.isFinite(value);
}
