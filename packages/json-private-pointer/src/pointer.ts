import {absolute} from "./absolute";
import {relative} from "./relative";
import {AbsolutePointer, DecodedSegment, Pointer, RelativePointer, Segment} from "./types";

/**
 * Generates an absolute pointer
 * @param segments
 * @group Creators
 */
export function pointer(...segments: (Segment | DecodedSegment)[]) : AbsolutePointer;


/**
 * Generates an relative pointer
 * @param relative
 * @param segments
 * @group Creators
 */
export function pointer(relative: number, ...segments: (Segment | DecodedSegment)[]) : RelativePointer;

/**
 * Generates a pointer
 * @param relative
 * @param segments
 * @group Creators
 */
export function pointer(relative: number | undefined, ...segments: (Segment | DecodedSegment)[]) : Pointer;

export function pointer(relative_or_segment: number | undefined | Segment | DecodedSegment, ...segments: (Segment | DecodedSegment)[]) : Pointer {
    if (relative_or_segment === undefined)
        return absolute(...segments);
    else
    if (typeof relative_or_segment === 'number')
        return relative(relative_or_segment, ...segments);
    else
        return absolute(relative_or_segment, ...segments);
}
