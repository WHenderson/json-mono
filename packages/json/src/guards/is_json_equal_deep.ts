import {Json} from "../types";
import {is_primitive} from "./is_primitive";
import {is_array} from "./is_array";
import {is_object} from "./is_object";

/**
 * Compares entries by their key value.
 * Used in sort functions.
 *
 * @param lhs
 * @param rhs
 */
export function compare_entries_by_key([lhs,]: [string, unknown], [rhs,]: [string, unknown]): -1 | 0 | 1 {
    if (lhs < rhs)
        return -1;
    if (lhs > rhs)
        return 1;

    return 0;
}

/**
 * Returns true if lhs and rhs are equivalent json structures.
 * Note that undefined values are ignored.
 * Note that entry key order within objects is ignored.
 *
 * @param lhs
 * @param rhs
 */
export function is_json_equal_deep(lhs: Json | undefined, rhs: Json | undefined): boolean {
    if (lhs === rhs)
        return true;
    if (lhs === undefined || rhs === undefined || is_primitive(lhs) || is_primitive(rhs))
        return false;
    if (is_array(lhs)) {
        if (is_array(rhs)) {
            if (lhs.length !== rhs.length)
                return false;
            return lhs.every((el, ind) => is_json_equal_deep(el, rhs[ind]));
        }
        return false;
    }
    if (is_object(lhs)) {
        if (is_object(rhs)) {
            const flt = (el: [string, unknown | undefined]) => el[1] !== undefined;
            const lhsEntries = Object.entries(lhs).filter(flt).sort(compare_entries_by_key);
            const rhsEntries = Object.entries(rhs).filter(flt).sort(compare_entries_by_key);

            if (lhsEntries.length !== rhsEntries.length)
                return false;

            return lhsEntries.every(([name, entry], ind) =>
                name === rhsEntries[ind][0] &&
                is_json_equal_deep(entry, rhsEntries[ind][1])
            );
        }
        return false;
    }
    return false;
}
