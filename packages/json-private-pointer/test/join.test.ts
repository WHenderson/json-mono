import {expect, it} from "vitest";
import {join_decoded_segments, join_encoded_segments, join_pointer} from "../src";

it('should join decoded segments', () => {
    expect(join_decoded_segments('', 'abc', '~', '/', ':1')).toBe('/abc/~0/~1/:01');
    expect(join_decoded_segments('', [true, 'abc'], [true, '~'], [true, '/'], [true, ':1'], [false, ':1'])).toBe('/:1abc/:1~0/:1~1/:1:01/:01');
});

it('should join encoded segments', () => {
    expect(join_encoded_segments('', 'abc', '~0', '~1', ':0:1')).toBe('/abc/~0/~1/:0:1');

    // Note that encoding is not checked
    expect(join_encoded_segments('', 'abc', '~0', '~1', '~3', ':3', ':')).toBe('/abc/~0/~1/~3/:3/:');

    expect(join_encoded_segments('/abc')).toBe('/abc');
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
