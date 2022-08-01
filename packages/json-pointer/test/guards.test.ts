import {expect, it} from "vitest";
import {is_absolute, is_pointer, is_relative, is_relative_iref, is_relative_pure} from "../src";
import {inspect} from "node:util";

it('should correctly identify example pointers', () => {
    const guards = [
        is_pointer,
        is_absolute,
        is_relative,
        is_relative_iref,
        is_relative_pure
    ];

    const values = [
        { value: undefined, truthy: [] },
        { value: 'a', truthy: [] },
        { value: '0a', truthy: [] },
        { value: '/~', truthy: [] },
        { value: '/~3', truthy: [] },
        { value: '/~a', truthy: [] },
        { value: '0/~', truthy: [] },
        { value: '0/~3', truthy: [] },
        { value: '0/~a', truthy: [] },
        { value: '', truthy: [is_pointer, is_absolute] },
        { value: '/', truthy: [is_pointer, is_absolute] },
        { value: '/a/b/c', truthy: [is_pointer, is_absolute] },
        { value: '0', truthy: [is_pointer, is_relative, is_relative_pure] },
        { value: '0/', truthy: [is_pointer, is_relative, is_relative_pure] },
        { value: '0/a/b/c', truthy: [is_pointer, is_relative, is_relative_pure] },
        { value: '0#', truthy: [is_pointer, is_relative, is_relative_iref] },
        { value: '00', truthy: [] },
        { value: '01', truthy: [] },
        { value: '123', truthy: [is_pointer, is_relative, is_relative_pure] },
        { value: '123/', truthy: [is_pointer, is_relative, is_relative_pure] },
        { value: '123/a/b/c', truthy: [is_pointer, is_relative, is_relative_pure] },
        { value: '123#', truthy: [is_pointer, is_relative, is_relative_iref] },
    ];

    values.forEach(({ value, truthy }, index) => {
        guards.forEach(guard => {
            const is = guard(value);
            const has = (<any[]>truthy).includes(guard);
            expect(is, `${index}:${guard.name}(${inspect(value)})`).toBe(has);
        });
    });
});
