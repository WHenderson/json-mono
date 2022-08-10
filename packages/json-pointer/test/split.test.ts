import {expect, it} from "vitest";
import {
    split,
    split_absolute,
    split_pure,
    split_relative,
    split_relative_iref,
    split_relative_pure,
    split_encoded,
    split_encoded_absolute,
    split_encoded_pure,
    split_encoded_relative,
    split_encoded_relative_iref,
    split_encoded_relative_pure
} from "../src";

it('should split paths as expected', () => {
    expect(split_encoded('')).to.deep.equal({ segments: [] });
    expect(split_encoded('/')).to.deep.equal({ segments: [''] });
    expect(split_encoded('/abc/xyz')).to.deep.equal({ segments: ['abc', 'xyz'] });
    expect(split_encoded('/~0~1')).to.deep.equal({ segments: ['~0~1'] });
    expect(() => split_encoded('/~3')).to.throw('invalid pointer');
    expect(split_encoded('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_encoded('001')).to.throw('invalid pointer');
    expect(() => split_encoded('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(split_encoded('0#')).to.deep.equal({ relative: 0, is_iref: true });
    expect(split_encoded('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_encoded('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~0~1'] });

    expect(split_encoded_absolute('')).to.deep.equal([]);
    expect(split_encoded_absolute('/')).to.deep.equal(['']);
    expect(split_encoded_absolute('/abc/xyz')).to.deep.equal(['abc', 'xyz']);
    expect(split_encoded_absolute('/~0~1')).to.deep.equal(['~0~1']);
    expect(() => split_encoded_absolute('/~3')).to.throw('invalid absolute pointer');
    expect(() => split_encoded_absolute('0')).to.throw('invalid absolute pointer');

    expect(split_encoded_pure('')).to.deep.equal({ segments: [] });
    expect(split_encoded_pure('/')).to.deep.equal({ segments: [''] });
    expect(split_encoded_pure('/abc/xyz')).to.deep.equal({ segments: ['abc', 'xyz'] });
    expect(split_encoded_pure('/~0~1')).to.deep.equal({ segments: ['~0~1'] });
    expect(() => split_encoded_pure('/~3')).to.throw('invalid pure pointer');
    expect(split_encoded_pure('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_encoded_pure('001')).to.throw('invalid pure pointer');
    expect(() => split_encoded_pure('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(() => split_encoded_pure('0#')).to.throw('invalid pure pointer');
    expect(split_encoded_pure('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_encoded_pure('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~0~1'] });

    expect(() => split_encoded_relative('')).to.throw('invalid relative pointer');
    expect(() => split_encoded_relative('/')).to.throw('invalid relative pointer');
    expect(split_encoded_relative('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_encoded_relative('001')).to.throw('invalid relative pointer');
    expect(() => split_encoded_relative('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(split_encoded_relative('0#')).to.deep.equal({ relative: 0, is_iref: true });
    expect(split_encoded_relative('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_encoded_relative('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~0~1'] });

    expect(() => split_encoded_relative_pure('')).to.throw('invalid pure relative pointer');
    expect(() => split_encoded_relative_pure('/')).to.throw('invalid pure relative pointer');
    expect(split_encoded_relative_pure('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_encoded_relative_pure('001')).to.throw('invalid pure relative pointer');
    expect(() => split_encoded_relative_pure('99999999999999999999999999999999999999999999999999999')).to.throw('invalid pure relative pointer');
    expect(() => split_encoded_relative_pure('0#')).to.throw('invalid pure relative pointer');;
    expect(split_encoded_relative_pure('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_encoded_relative_pure('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~0~1'] });

    expect(() => split_encoded_relative_iref('')).to.throw('invalid iref relative pointer');
    expect(() => split_encoded_relative_iref('/')).to.throw('invalid iref relative pointer');
    expect(() => split_encoded_relative_iref('0')).to.throw('invalid iref relative pointer');
    expect(() => split_encoded_relative_iref('001')).to.throw('invalid iref relative pointer');
    expect(() => split_encoded_relative_iref('99999999999999999999999999999999999999999999999999999')).to.throw('invalid iref relative pointer');
    expect(split_encoded_relative_iref('0#')).toBe(0);
    expect(split_encoded_relative_iref('123#')).toBe(123);
    expect(() => split_encoded_relative_iref('0/abc/xyz')).to.throw('invalid iref relative pointer');
    expect(() => split_encoded_relative_iref('0/~0~1')).to.throw('invalid iref relative pointer');
    expect(() => split_encoded_relative_iref('99999999999999999999999999999999999999999999999999999#')).to.throw('invalid iref relative pointer');

    // ---

    expect(split('')).to.deep.equal({ segments: [] });
    expect(split('/')).to.deep.equal({ segments: [''] });
    expect(split('/abc/xyz')).to.deep.equal({ segments: ['abc', 'xyz'] });
    expect(split('/~0~1')).to.deep.equal({ segments: ['~/'] });
    expect(() => split('/~3')).to.throw('invalid pointer');
    expect(split('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split('001')).to.throw('invalid pointer');
    expect(() => split('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(split('0#')).to.deep.equal({ relative: 0, is_iref: true });
    expect(split('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~/'] });

    expect(split_absolute('')).to.deep.equal([]);
    expect(split_absolute('/')).to.deep.equal(['']);
    expect(split_absolute('/abc/xyz')).to.deep.equal(['abc', 'xyz']);
    expect(split_absolute('/~0~1')).to.deep.equal(['~/']);
    expect(() => split_absolute('/~3')).to.throw('invalid absolute pointer');
    expect(() => split_absolute('0')).to.throw('invalid absolute pointer');

    expect(split_pure('')).to.deep.equal({ segments: [] });
    expect(split_pure('/')).to.deep.equal({ segments: [''] });
    expect(split_pure('/abc/xyz')).to.deep.equal({ segments: ['abc', 'xyz'] });
    expect(split_pure('/~0~1')).to.deep.equal({ segments: ['~/'] });
    expect(() => split_pure('/~3')).to.throw('invalid pure pointer');
    expect(split_pure('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_pure('001')).to.throw('invalid pure pointer');
    expect(() => split_pure('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(() => split_pure('0#')).to.throw('invalid pure pointer');
    expect(split_pure('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_pure('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~/'] });

    expect(() => split_relative('')).to.throw('invalid relative pointer');
    expect(() => split_relative('/')).to.throw('invalid relative pointer');
    expect(split_relative('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_relative('001')).to.throw('invalid relative pointer');
    expect(() => split_relative('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(split_relative('0#')).to.deep.equal({ relative: 0, is_iref: true });
    expect(split_relative('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_relative('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~/'] });

    expect(() => split_relative_pure('')).to.throw('invalid pure relative pointer');
    expect(() => split_relative_pure('/')).to.throw('invalid pure relative pointer');
    expect(split_relative_pure('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_relative_pure('001')).to.throw('invalid pure relative pointer');
    expect(() => split_relative_pure('99999999999999999999999999999999999999999999999999999')).to.throw('invalid pure relative pointer');
    expect(() => split_relative_pure('0#')).to.throw('invalid pure relative pointer');;
    expect(split_relative_pure('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_relative_pure('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~/'] });

    expect(() => split_relative_iref('')).to.throw('invalid iref relative pointer');
    expect(() => split_relative_iref('/')).to.throw('invalid iref relative pointer');
    expect(() => split_relative_iref('0')).to.throw('invalid iref relative pointer');
    expect(() => split_relative_iref('001')).to.throw('invalid iref relative pointer');
    expect(() => split_relative_iref('99999999999999999999999999999999999999999999999999999')).to.throw('invalid iref relative pointer');
    expect(split_relative_iref('0#')).toBe(0);
    expect(split_relative_iref('123#')).toBe(123);
    expect(() => split_relative_iref('0/abc/xyz')).to.throw('invalid iref relative pointer');
    expect(() => split_relative_iref('0/~0~1')).to.throw('invalid iref relative pointer');
    expect(() => split_relative_iref('99999999999999999999999999999999999999999999999999999#')).to.throw('invalid iref relative pointer');
    
})
