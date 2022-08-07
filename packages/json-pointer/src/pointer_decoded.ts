import {Pointer, Segment} from "./types";
import {absolute_decoded} from "./absolute_decoded";
import {relative_decoded} from "./relative_decoded";

export function pointer_decoded(...segments: Segment[]) : Pointer;
export function pointer_decoded(relative: number | undefined, ...segments: Segment[]) : Pointer

export function pointer_decoded(relative_or_segment: number | Segment | undefined, ...segments: Segment[]) : Pointer {
    if (relative_or_segment === undefined)
        return absolute_decoded(...segments);
    else
    if (typeof relative_or_segment === 'number')
        return relative_decoded(relative_or_segment, ...segments);
    else
        return absolute_decoded(relative_or_segment, ...segments);
}
