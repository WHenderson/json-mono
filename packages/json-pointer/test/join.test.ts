import {expect, it} from "vitest";
import {join_decoded_segments, join_encoded_segments, join_iref, join_pointer, PointerEncodingError} from "../src";

it('should join decoded segments', () => {
    expect(join_decoded_segments('', 'abc', '~', '/')).toBe('/abc/~0/~1');
});

it('should join encoded segments', () => {
    expect(join_encoded_segments('', 'abc', '~0', '~1')).toBe('/abc/~0/~1');

    // Note that encoding is not checked
    expect(join_encoded_segments('', 'abc', '~0', '~1', '~3')).toBe('/abc/~0/~1/~3');

    expect(join_encoded_segments('/abc')).toBe('/abc');

    expect(() => join_encoded_segments('10#', 'abc')).to.throw(PointerEncodingError, 'Cannot join segments to an index reference');

    expect(join_iref('123')).toBe('123#');
    expect(() => join_iref('/abc')).to.throw(PointerEncodingError, 'Expected only relative');
    expect(() => join_iref('123#')).to.throw(PointerEncodingError, 'Expected only relative');
});

it('should join pointers', () => {
    expect(join_pointer('/a/b/c', '')).toBe('');
    expect(join_pointer('/abc', '/xyz')).toBe('/xyz');
    expect(join_pointer('/a/b/c', '0/x')).toBe('/a/b/c/x');
    expect(join_pointer('/a/b/c', '3/x')).toBe('/x');
    expect(join_pointer('/a/b/c', '3')).toBe('');
    expect(() => join_pointer('/a/b/c', '4/x')).to.throw('relative pointer is out of bounds');
    expect(join_pointer('1/a/b/c', '1/x')).toBe('1/a/b/x');
    expect(join_pointer('1/a/b/c', '4/x')).toBe('2/x');
    expect(join_pointer('1/a/b/c', '4')).toBe('2');
})
