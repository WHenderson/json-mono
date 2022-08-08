import {AbsolutePointer, EncodedSegment, PurePointer} from "./types";
import {absolute_encoded} from "./absolute_encoded";
import {relative_encoded} from "./relative_encoded";

export function pointer_encoded(...segments: EncodedSegment[]) : AbsolutePointer;
export function pointer_encoded(relative: number | undefined, ...segments: EncodedSegment[]) : PurePointer;

export function pointer_encoded(relative_or_segment: number | EncodedSegment | undefined, ...segments: EncodedSegment[]) : PurePointer {
    if (relative_or_segment === undefined)
        return absolute_encoded(...segments);
    else
    if (typeof relative_or_segment === 'number')
        return relative_encoded(relative_or_segment, ...segments);
    else
        return absolute_encoded(relative_or_segment, ...segments);
}
