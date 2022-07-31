import {expect, it} from "vitest";
import {clone, is_equal_deep, parse_index} from "../src";
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
    expect(parse_index('999999999999999999999999999999999999999999999999999999999999999999999999999999999999999')).toBeUndefined();

    expect(parse_index('0')).toBe(0);
    expect(parse_index('123')).toBe(123);
    expect(parse_index('-1')).toBeUndefined();
    expect(parse_index('123.45')).toBeUndefined();
    expect(parse_index('xxxx')).toBeUndefined();
    expect(parse_index('0001')).toBeUndefined();

});
