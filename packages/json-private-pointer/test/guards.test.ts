import {expect, it} from "vitest";
import {is_absolute, is_pointer, is_relative} from "../src";
import {inspect} from "node:util";

it('should correctly identify example pointers', () => {
    const guards = [
        is_pointer,
        is_absolute,
        is_relative
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
        { value: '0', truthy: [is_pointer, is_relative] },
        { value: '0/', truthy: [is_pointer, is_relative] },
        { value: '0/a/b/c', truthy: [is_pointer, is_relative] },
        { value: '00', truthy: [] },
        { value: '01', truthy: [] },
        { value: '99999999999999999999999999999999999999999999999', truthy: [] },
        { value: '123', truthy: [is_pointer, is_relative] },
        { value: '123/', truthy: [is_pointer, is_relative] },
        { value: '123/a/b/c', truthy: [is_pointer, is_relative] },
    ];

    values.forEach(({ value, truthy }, index) => {
        guards.forEach(guard => {
            const is = guard(value);
            const has = (<any[]>truthy).includes(guard);
            expect(is, `${index}:${guard.name}(${inspect(value)})`).toBe(has);
        });
    });
});
