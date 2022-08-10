import {expect, it} from "vitest";
import {
    absolute,
    absolute_encoded, EncodedSegment,
    pointer,
    pointer_encoded, PointerEncodingError,
    relative,
    relative_encoded, relative_iref
} from "../src";

it('should create expected values', () => {
    expect(pointer_encoded()).toBe('');
    expect(pointer()).toBe('');

    expect(absolute_encoded()).toBe('');
    expect(absolute()).toBe('');

    expect(pointer_encoded(<EncodedSegment>'a',<EncodedSegment>'b',<EncodedSegment>'~')).toBe('/a/b/~');
    expect(pointer('a','b','~')).toBe('/a/b/~0');

    expect(pointer_encoded(undefined, <EncodedSegment>'a',<EncodedSegment>'b',<EncodedSegment>'~')).toBe('/a/b/~');
    expect(pointer(undefined, 'a','b','~')).toBe('/a/b/~0');

    expect(absolute_encoded(<EncodedSegment>'a',<EncodedSegment>'b',<EncodedSegment>'~')).toBe('/a/b/~');
    expect(absolute('a','b','~')).toBe('/a/b/~0');

    expect(pointer_encoded(123, <EncodedSegment>'a',<EncodedSegment>'b',<EncodedSegment>'~')).toBe('123/a/b/~');
    expect(pointer(123, 'a','b','~')).toBe('123/a/b/~0');

    expect(relative_encoded(123, <EncodedSegment>'a',<EncodedSegment>'b',<EncodedSegment>'~')).toBe('123/a/b/~');
    expect(relative(123, 'a','b','~')).toBe('123/a/b/~0');

    expect(() => relative_encoded(-1, <EncodedSegment>'a',<EncodedSegment>'b',<EncodedSegment>'~')).to.throw(PointerEncodingError, 'Invalid relative index');
    expect(() => relative(-1, 'a','b','~')).to.throw(PointerEncodingError, 'Invalid relative index');

    expect(relative_iref(123)).toBe('123#');
    expect(() => relative_iref(-1)).to.throw(PointerEncodingError, 'Invalid relative index');
});
