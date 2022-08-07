import {traverse_get} from "./traverse_get";
import {traverse_jsonish_set} from "./traverse_jsonish_set";
import {traverse_jsonish_update} from "./traverse_jsonish_update";
import {traverse_delete} from "./traverse_delete";

export const traverse_jsonish = {
    get: traverse_get,
    set: traverse_jsonish_set,
    update: traverse_jsonish_update,
    delete: traverse_delete
}
