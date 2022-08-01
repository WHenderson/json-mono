import {Pointer} from "./types";
import {PointerEncodingError} from "./pointer-encoding-error";
import {is_absolute} from "./is_absolute";
import {split_encoded_pure} from "./split_encoded_pure";
import {split_encoded_relative_pure} from "./split_encoded_relative_pure";

export function join_pointer(lhs_pure_pointer: Pointer, rhs_pure_pointer: Pointer): Pointer {
    const lhs_split = split_encoded_pure(lhs_pure_pointer);

    if (is_absolute(rhs_pure_pointer))
        return rhs_pure_pointer;

    const rhs_split = split_encoded_relative_pure(rhs_pure_pointer);

    if ('relative' in lhs_split) {
        const [relative, segments] = rhs_split.relative > lhs_split.segments.length
            ? [lhs_split.relative + rhs_split.relative - lhs_split.segments.length, rhs_split.segments]
            : [lhs_split.relative, lhs_split.segments.slice(0, lhs_split.segments.length - rhs_split.relative).concat(rhs_split.segments)];

        return `${relative}${segments.join('/')}`;
    }
    else {
        if (rhs_split.relative > lhs_split.segments.length)
            throw new PointerEncodingError('relative pointer is out of bounds');

        return `${lhs_split.segments.slice(0, lhs_split.segments.length - rhs_split.relative).concat(rhs_split.segments).join('/')}`
    }
}
