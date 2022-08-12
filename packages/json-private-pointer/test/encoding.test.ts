import {expect, it} from "vitest";
import {segment_decode, segment_encode} from "../src";

it('should complete encoding round trip', () => {
    const values = [
        '~',
        '/',
        'abc',
        'a~/b',
        'a/~b',
        '~/~/~~//~~~///',
        ':x',
        '::x',
        '::~/~/~~//~~~///',
    ];

    values.forEach(value => {
        expect(segment_decode(segment_encode(value))).to.deep.equal([false, value]);
        expect(segment_decode(segment_encode([true, value]))).to.deep.equal([true, value]);
        expect(segment_decode(segment_encode([false, value]))).to.deep.equal([false, value]);
        expect(segment_decode(segment_encode(true, value))).to.deep.equal([true, value]);
        expect(segment_decode(segment_encode(false, value))).to.deep.equal([false, value]);
    });
});

it('should encode as expected', () => {
    expect(segment_encode('abc')).toBe('abc');
    expect(segment_encode('~')).toBe('~0');
    expect(segment_encode('/')).toBe('~1');
    expect(segment_encode('/~')).toBe('~1~0');
    expect(segment_encode('~/')).toBe('~0~1');
    expect(segment_encode(true, 'x')).toBe('~3x');
})
