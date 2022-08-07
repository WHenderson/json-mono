import {traverse_get} from "./traverse_get";
import {traverse_json_set} from "./traverse_json_set";
import {traverse_json_update} from "./traverse_json_update";
import {traverse_delete} from "./traverse_delete";
import {traverse_has} from "./traverse_has";

export const traverse_json = {
    has: traverse_has,
    get: traverse_get,
    set: traverse_json_set,
    update: traverse_json_update,
    delete: traverse_delete
}
