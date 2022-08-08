import {RelativeIRefPointer, RelativeOnlyPointer} from "./types";
import {PointerEncodingError} from "./pointer-encoding-error";
import {is_relative_only} from "./is_relative_only";

export function join_iref(relative_only_pointer: RelativeOnlyPointer): RelativeIRefPointer;
export function join_iref(relative_only_pointer: string): RelativeIRefPointer;

export function join_iref(relative_only_pointer: string): RelativeIRefPointer {
    if (!is_relative_only(relative_only_pointer))
        throw new PointerEncodingError('Expected only relative');

    return <RelativeIRefPointer>`${relative_only_pointer}#`;
}



