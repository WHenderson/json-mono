import {Pointer, Segment} from "./types";
import {absolute_encoded} from "./absolute_encoded";
import {relative_encoded} from "./relative_encoded";

export function pointer_encoded(...segments: Segment[]) : Pointer;
export function pointer_encoded(relative: number | undefined, ...segments: Segment[]) : Pointer

export function pointer_encoded(relative_or_segment: number | Segment | undefined, ...segments: Segment[]) : Pointer {
    if (relative_or_segment === undefined)
        return absolute_encoded(...segments);
    else
    if (typeof relative_or_segment === 'number')
        return relative_encoded(relative_or_segment, ...segments);
    else
        return absolute_encoded(relative_or_segment, ...segments);
}
