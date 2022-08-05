import {expect, it} from "vitest";
import {clone, is_equal_deep, object_assign, parse_index, parse_index_string} from "../src";
import {inspect} from "node:util";

it('should clone objects', () => {
    const values = [
        undefined,
        null,
        true,
        false,
        0,
        1,
        -1,
        NaN,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        'xxx',
        [{},{a:1}],
        {a:[], b:{}},
        {a:1,b:undefined}
    ];

    expect(is_equal_deep(NaN, clone(NaN))).toBeTruthy();

    values.forEach(
        value => {
            expect(is_equal_deep(value, clone(value)), inspect(value)).toBeTruthy();
        }
    );
});

it('should parse index', () => {
    expect(parse_index_string('0')).toBe(0);
    expect(parse_index_string('123')).toBe(123);
    expect(parse_index_string('-1')).toBeUndefined();
    expect(parse_index_string('123.45')).toBeUndefined();
    expect(parse_index_string('999999999999999999999999999999999999999999999999999999999999999999999999999999999999999')).toBeUndefined();
    expect(parse_index_string('xxxx')).toBeUndefined();
    expect(parse_index_string('0001')).toBeUndefined();

    expect(parse_index(123)).toBe(123);
    expect(parse_index(123.4)).toBe(undefined);
    expect(parse_index(-1)).toBe(undefined);
    expect(parse_index(Symbol('test symbol'))).toBe(undefined);
    expect(parse_index('0')).toBe(0);
    expect(parse_index('123')).toBe(123);
    expect(parse_index('-1')).toBeUndefined();
    expect(parse_index('123.45')).toBeUndefined();
    expect(parse_index('999999999999999999999999999999999999999999999999999999999999999999999999999999999999999')).toBeUndefined();
    expect(parse_index('xxxx')).toBeUndefined();
    expect(parse_index('0001')).toBeUndefined();
});

it('should safely combine objects', () => {
    expect((<any>Object.assign({}, { ['__proto__']: { x: 1} })).x).toBe(1);
    expect(Object.getPrototypeOf(Object.assign({}, { ['__proto__']: { x: 1} }))).not.toBe(Object.getPrototypeOf({}));

    expect((<any>object_assign({}, { ['__proto__']: { x: 1} })).x).toBe(undefined);
    expect(Object.getPrototypeOf(object_assign({}, { ['__proto__']: { x: 1} }))).toBe(Object.getPrototypeOf({}));
});
