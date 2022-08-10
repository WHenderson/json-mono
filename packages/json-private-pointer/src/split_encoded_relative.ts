import {PointerDecodingError} from "@crikey/json-pointer";
import {EncodedSegment} from "./types";
import {parse_index_string} from "@crikey/json";

/**
 * Splits a pointer into its constituent parts, leaving path segments encoded
 * @param pointer
 */
export function split_encoded_relative(pointer: string): { relative: number, segments: EncodedSegment[] } {
    const match = pointer.match(/^(0|[1-9][0-9]*)(?:$|\/(?:[^~:]|~0|~1|:0|:1)*$)/);
    if (!match)
        throw new PointerDecodingError('invalid relative pointer');

    const relative = parse_index_string(match[1]);
    if (relative === undefined)
        throw new PointerDecodingError('invalid relative pointer');

    const remainder = match[2];
    if (remainder === '')
        return { relative, segments: [] };

    return { relative, segments: <EncodedSegment[]>pointer.split('/').slice(1) }
}
