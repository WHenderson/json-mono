import {AbsolutePointer, PurePointer, RelativeOnlyPointer, RelativePurePointer, Segment} from "./types";
import {absolute_decoded} from "./absolute_decoded";
import {relative_decoded} from "./relative_decoded";

/**
 * Generates an absolute pointer
 * @param segments
 */
export function pointer_decoded(...segments: Segment[]) : AbsolutePointer;

/**
 * Generates an relative pointer
 * @param relative
 * @param segments
 */
export function pointer_decoded(relative: number, ...segments: Segment[]) : RelativePurePointer | RelativeOnlyPointer;

/**
 * Generates a pointer
 * @param relative
 * @param segments
 */
export function pointer_decoded(relative: number | undefined, ...segments: Segment[]) : PurePointer;

export function pointer_decoded(relative_or_segment: number | Segment | undefined, ...segments: Segment[]) : PurePointer {
    if (relative_or_segment === undefined)
        return absolute_decoded(...segments);
    else
    if (typeof relative_or_segment === 'number')
        return relative_decoded(relative_or_segment, ...segments);
    else
        return absolute_decoded(relative_or_segment, ...segments);
}
