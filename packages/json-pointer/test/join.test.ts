import {expect, it} from "vitest";
import {
    join_segments,
    join_encoded_segments,
    join_iref,
    join_pointer,
    PointerEncodingError,
    EncodedSegment
} from "../src";

it('should join decoded segments', () => {
    expect(join_segments('', 'abc', '~', '/')).toBe('/abc/~0/~1');
});

it('should join encoded segments', () => {
    expect(join_encoded_segments('', <EncodedSegment>'abc', <EncodedSegment>'~0', <EncodedSegment>'~1')).toBe('/abc/~0/~1');

    // Note that encoding is not checked
    expect(join_encoded_segments('', <EncodedSegment>'abc', <EncodedSegment>'~0', <EncodedSegment>'~1', <EncodedSegment>'~3')).toBe('/abc/~0/~1/~3');

    expect(join_encoded_segments('/abc')).toBe('/abc');

    expect(() => join_encoded_segments('10#', <EncodedSegment>'abc')).to.throw(PointerEncodingError, 'Invalid pointer');

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
