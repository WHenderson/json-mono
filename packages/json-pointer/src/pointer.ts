import {AbsolutePointer, PurePointer, RelativeOnlyPointer, RelativePurePointer, Segment} from "./types";
import {absolute} from "./absolute";
import {relative} from "./relative";

/**
 * Generates an absolute pointer
 * @param segments
 * @group creators
 */
export function pointer(...segments: Segment[]) : AbsolutePointer;

/**
 * Generates a relative pointer
 * @param relative
 * @param segments
 * @group creators
 */
export function pointer(relative: number, ...segments: Segment[]) : RelativePurePointer | RelativeOnlyPointer;

/**
 * Generates a pointer
 * @param relative
 * @param segments
 * @group creators
 */
export function pointer(relative: number | undefined, ...segments: Segment[]) : PurePointer;

export function pointer(relative_or_segment: number | Segment | undefined, ...segments: Segment[]) : PurePointer {
    if (relative_or_segment === undefined)
        return absolute(...segments);
    else
    if (typeof relative_or_segment === 'number')
        return relative(relative_or_segment, ...segments);
    else
        return absolute(relative_or_segment, ...segments);
}
