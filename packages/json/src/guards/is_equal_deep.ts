import {is_primitive} from "./is_primitive";
import {is_array} from "./is_array";
import {is_object} from "./is_object";

/**
 * Compares entries by their key value.
 * Used in sort functions.
 * Note that since keys are guaranteed to be unique, this method never returns 0.
 *
 * @param lhs
 * @param rhs
 */
export function compare_entries_by_key([lhs,]: [string, unknown], [rhs,]: [string, unknown]): -1 | 1 {
    return (lhs < rhs) ? -1 : 1;
}

/**
 * Returns true if lhs and rhs are equivalent json structures.
 * Note that undefined values are ignored.
 * Note that entry key order within objects is ignored.
 *
 * @param lhs
 * @param rhs
 */
export function is_equal_deep(lhs: any, rhs: any): boolean {
    if (lhs === rhs || Number.isNaN(lhs) && Number.isNaN(rhs))
        return true;
    if (lhs === undefined || rhs === undefined || is_primitive(lhs) || is_primitive(rhs))
        return false;
    if (is_array(lhs)) {
        if (is_array(rhs)) {
            if (lhs.length !== rhs.length)
                return false;
            return lhs.every((el, ind) => is_equal_deep(el, rhs[ind]));
        }
        return false;
    }
    if (is_object(lhs)) {
        if (is_object(rhs)) {
            const flt = (el: [string, unknown | undefined]) => el[1] !== undefined;
            const lhsEntries = Object.entries(lhs).filter(flt);
            const rhsEntries = Object.entries(rhs).filter(flt);

            if (lhsEntries.length !== rhsEntries.length)
                return false;

            lhsEntries.sort(compare_entries_by_key);
            rhsEntries.sort(compare_entries_by_key);

            return lhsEntries.every(([name, entry], ind) =>
                name === rhsEntries[ind][0] &&
                is_equal_deep(entry, rhsEntries[ind][1])
            );
        }
        return false;
    }
    return false;
}
