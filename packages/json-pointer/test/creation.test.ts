import {expect, it} from "vitest";
import {
    absolute_decoded,
    absolute_encoded,
    pointer_decoded,
    pointer_encoded, PointerEncodingError,
    relative_decoded,
    relative_encoded
} from "../src";

it('should create expected values', () => {
    expect(pointer_encoded()).toBe('');
    expect(pointer_decoded()).toBe('');

    expect(absolute_encoded()).toBe('');
    expect(absolute_decoded()).toBe('');

    expect(pointer_encoded('a','b','~')).toBe('/a/b/~');
    expect(pointer_decoded('a','b','~')).toBe('/a/b/~0');

    expect(pointer_encoded(undefined, 'a','b','~')).toBe('/a/b/~');
    expect(pointer_decoded(undefined, 'a','b','~')).toBe('/a/b/~0');

    expect(absolute_encoded('a','b','~')).toBe('/a/b/~');
    expect(absolute_decoded('a','b','~')).toBe('/a/b/~0');

    expect(pointer_encoded(123, 'a','b','~')).toBe('123#/a/b/~');
    expect(pointer_decoded(123, 'a','b','~')).toBe('123#/a/b/~0');

    expect(relative_encoded(123, 'a','b','~')).toBe('123#/a/b/~');
    expect(relative_decoded(123, 'a','b','~')).toBe('123#/a/b/~0');

    expect(() => relative_encoded(-1, 'a','b','~')).to.throw(PointerEncodingError, 'Invalid relative index');
    expect(() => relative_decoded(-1, 'a','b','~')).to.throw(PointerEncodingError, 'Invalid relative index');
});
