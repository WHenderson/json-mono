import {IndexNumber} from "../types";
import {is_index_number} from "../guards";

export function index_number(value: number): IndexNumber {
    if (!is_index_number(value))
        throw new Error('expected index value');
    return value as unknown as IndexNumber;
}
