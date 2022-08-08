import {describe, expect, it} from "vitest";
import {
    is_array,
    is_boolean,
    is_container,
    is_encodable_json,
    is_encodable_json_deep,
    is_encodable_primitive,
    is_encodable_jsonish_deep,
    is_finite_number,
    is_index_number,
    is_integer,
    is_json,
    is_json_deep, is_equal_deep,
    is_null,
    is_number,
    is_object,
    is_primitive,
    is_jsonish_deep,
    is_safe_integer,
    is_string,
    is_undefined, Json, compare_entries_by_key, JsonObject, JsonArray, is_index_number_or_string, is_index_string
} from "../src";
import {inspect} from "node:util";

it('should correctly identify all values', () => {
    const guards = [
        is_undefined,
        is_null,
        is_boolean,
        is_integer,
        is_safe_integer,
        is_index_number,
        is_index_string,
        is_index_number_or_string,
        is_number,
        is_finite_number,
        is_string,
        is_primitive,
        is_encodable_primitive,
        is_object,
        is_array,
        is_container,
        is_json,
        is_json_deep,
        is_jsonish_deep,
        is_encodable_json,
        is_encodable_json_deep,
        is_encodable_jsonish_deep,
    ];

    const guards_json = [
        is_json,
        is_json_deep,
        is_jsonish_deep,
        is_encodable_json,
        is_encodable_json_deep,
        is_encodable_jsonish_deep
    ];

    const values = [
        { value: undefined, truthy: [is_undefined, is_encodable_jsonish_deep] },
        { value: null, truthy: [is_null, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: true, truthy: [is_boolean, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: false, truthy: [is_boolean, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: 1, truthy: [is_integer, is_safe_integer, is_number, is_finite_number, is_index_number, is_index_number_or_string, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: -1, truthy: [is_integer, is_safe_integer, is_number, is_finite_number, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: Number.MAX_SAFE_INTEGER, truthy: [is_integer, is_safe_integer, is_number, is_finite_number, is_index_number, is_index_number_or_string, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: Number.MIN_SAFE_INTEGER, truthy: [is_integer, is_safe_integer, is_number, is_finite_number, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: Number.MAX_SAFE_INTEGER + 1, truthy: [is_integer, is_number, is_finite_number, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: Number.MIN_SAFE_INTEGER - 1, truthy: [is_integer, is_number, is_finite_number, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: NaN, truthy: [is_number, is_primitive, is_json, is_json_deep, is_jsonish_deep ]},
        { value: Number.NEGATIVE_INFINITY, truthy: [is_number, is_primitive, is_json, is_json_deep, is_jsonish_deep ]},
        { value: Number.POSITIVE_INFINITY, truthy: [is_number, is_primitive, is_json, is_json_deep, is_jsonish_deep ]},
        { value: Number.MIN_VALUE, truthy: [is_number, is_finite_number, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: Number.MAX_VALUE, truthy: [is_integer, is_number, is_finite_number, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: 'xxx', truthy: [is_string, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: '123', truthy: [is_string, is_primitive, is_index_string, is_index_number_or_string, is_encodable_primitive, ...guards_json]},
        { value: '0123', truthy: [is_string, is_primitive, is_encodable_primitive, ...guards_json]},
        { value: {}, truthy: [is_object, is_container, ...guards_json]},
        { value: { a: undefined }, truthy: [is_object, is_container, is_json, is_json_deep, is_encodable_json, is_encodable_json_deep, is_encodable_jsonish_deep, ]},
        { value: { a: NaN }, truthy: [is_object, is_container, is_json, is_json_deep, is_jsonish_deep, is_encodable_json ]},
        { value: [], truthy: [is_array, is_container, ...guards_json]},
        { value: [undefined], truthy: [is_array, is_container, is_json, is_encodable_json, is_encodable_jsonish_deep]},
        { value: [NaN], truthy: [is_array, is_container, is_json, is_json_deep, is_jsonish_deep, is_encodable_json ]},
    ];

    values.forEach(({ value, truthy }, index) => {
        guards.forEach(guard => {
            const is = guard(value);
            const has = truthy.includes(<any>guard);
            expect(is, `${index}:${guard.name}(${inspect(value)})`).toBe(has);
        });
    });
})

describe('is_equal_deep', () => {
    it('should compare by identity', () => {
        const value = [{}];

        expect(is_equal_deep(value, value)).toBeTruthy();
    });
    it('should compare primitives', () => {
        expect(is_equal_deep(undefined, [])).toBeFalsy();
        expect(is_equal_deep(1, [])).toBeFalsy();
        expect(is_equal_deep([], undefined)).toBeFalsy();
        expect(is_equal_deep([], 1)).toBeFalsy();
    });
    it('should compare arrays', () => {
        expect(is_equal_deep([], [])).toBeTruthy();
        expect(is_equal_deep([], {})).toBeFalsy();
    });
    it('should compare arrays, deep', () => {
        expect(is_equal_deep([{}, undefined], [{}, undefined])).toBeTruthy();
    });
    it('should compare array length', () => {
        expect(is_equal_deep([], [1,2,3])).toBeFalsy();
    });
    it('should compare objects', () => {
        expect(is_equal_deep({}, {})).toBeTruthy();
        expect(is_equal_deep({}, [])).toBeFalsy();
    });
    it('should compare objects, ignoring undefined', () => {
        expect(is_equal_deep({a: undefined}, { b: undefined})).toBeFalsy();
        expect(is_equal_deep({a: undefined}, { b: undefined}, { filter: true })).toBeTruthy();
    });
    it('should compare objects, ignoring order', () => {
        expect(is_equal_deep({a: 1, b:2, c:3, d:4}, {b: 2, a: 1, d:4, c:3})).toBeFalsy();
        expect(is_equal_deep({a: 1, b:2, c:3, d:4}, {b: 2, a: 1, d:4, c:3}, { sort: true })).toBeTruthy();
    });
    it('should compare object key count', () => {
        expect(is_equal_deep({}, {a:1})).toBeFalsy();
    });
    it('should compare objects deep', () => {
        expect(is_equal_deep({a:[]}, {a:[]})).toBeTruthy();
    });
    it('should fail on non json', () => {
        const a = <Json><unknown>Symbol('example 1');
        const b = <Json><unknown>Symbol('example 2');
        expect(is_equal_deep(a, b)).toBeFalsy();
    });
});

describe('internal', () => {
    it('should order keys correctly', () => {
        expect(compare_entries_by_key(['a', undefined], ['b', undefined])).toBe(-1);
        expect(compare_entries_by_key(['b', undefined], ['a', undefined])).toBe(1);
        expect(compare_entries_by_key(['a', undefined], ['a', undefined])).toBe(1);
    })
})

it('should fail on recursive structures', () => {
    const recursive : JsonObject = { a: [] };
    (<JsonArray>recursive.a)[0] = recursive;

    expect(() => is_json_deep(recursive)).toThrow('recursive structure detected');
    expect(() => is_jsonish_deep(recursive)).toThrow('recursive structure detected');
    expect(() => is_encodable_json_deep(recursive)).toThrow('recursive structure detected');
    expect(() => is_encodable_jsonish_deep(recursive)).toThrow('recursive structure detected');
})
