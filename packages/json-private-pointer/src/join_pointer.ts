import {AbsolutePointer, Pointer, RelativePointer} from "./types";
import {is_absolute} from "./is_absolute";
import {split_encoded} from "./split_encoded";
import {split_encoded_relative} from "./split_encoded_relative";
import {PointerEncodingError} from "@crikey/json-pointer";

/**
 * Combines two pointers
 * @param lhs_pure_pointer
 * @param rhs_pure_pointer
 * @group Joiners
 */
export function join_pointer(lhs_pure_pointer: string, rhs_pure_pointer: AbsolutePointer): AbsolutePointer;

/**
 * Combines two pointers
 * @param lhs_pure_pointer
 * @param rhs_pure_pointer
 * @group Joiners
 */
export function join_pointer(lhs_pure_pointer: RelativePointer, rhs_pure_pointer: RelativePointer): RelativePointer;

/**
 * Combines two pointers
 * @param lhs_pure_pointer
 * @param rhs_pure_pointer
 * @group Joiners
 */
export function join_pointer(lhs_pure_pointer: string, rhs_pure_pointer: string): Pointer;


export function join_pointer(lhs_pure_pointer: string, rhs_pure_pointer: string): Pointer {
    const lhs_split = split_encoded(lhs_pure_pointer);

    if (is_absolute(rhs_pure_pointer))
        return rhs_pure_pointer;

    const rhs_split = split_encoded_relative(rhs_pure_pointer);

    if ('relative' in lhs_split) {
        const [relative, segments] = rhs_split.relative > lhs_split.segments.length
            ? [lhs_split.relative + rhs_split.relative - lhs_split.segments.length, rhs_split.segments]
            : [lhs_split.relative, lhs_split.segments.slice(0, lhs_split.segments.length - rhs_split.relative).concat(rhs_split.segments)];

        return <RelativePointer>`${relative}${segments.length === 0 ? '' : '/'}${segments.join('/')}`;
    }
    else {
        if (rhs_split.relative > lhs_split.segments.length)
            throw new PointerEncodingError('relative pointer is out of bounds');

        const segments = lhs_split.segments.slice(0, lhs_split.segments.length - rhs_split.relative).concat(rhs_split.segments);

        return <AbsolutePointer>`${segments.length === 0 ? '' : '/'}${segments.join('/')}`;
    }
}
