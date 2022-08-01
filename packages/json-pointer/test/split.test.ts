import {expect, it} from "vitest";
import {
    split_decoded,
    split_decoded_absolute,
    split_decoded_pure,
    split_decoded_relative,
    split_decoded_relative_iref,
    split_decoded_relative_pure,
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

    expect(split_decoded('')).to.deep.equal({ segments: [] });
    expect(split_decoded('/')).to.deep.equal({ segments: [''] });
    expect(split_decoded('/abc/xyz')).to.deep.equal({ segments: ['abc', 'xyz'] });
    expect(split_decoded('/~0~1')).to.deep.equal({ segments: ['~/'] });
    expect(() => split_decoded('/~3')).to.throw('invalid pointer');
    expect(split_decoded('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_decoded('001')).to.throw('invalid pointer');
    expect(() => split_decoded('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(split_decoded('0#')).to.deep.equal({ relative: 0, is_iref: true });
    expect(split_decoded('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_decoded('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~/'] });

    expect(split_decoded_absolute('')).to.deep.equal([]);
    expect(split_decoded_absolute('/')).to.deep.equal(['']);
    expect(split_decoded_absolute('/abc/xyz')).to.deep.equal(['abc', 'xyz']);
    expect(split_decoded_absolute('/~0~1')).to.deep.equal(['~/']);
    expect(() => split_decoded_absolute('/~3')).to.throw('invalid absolute pointer');
    expect(() => split_decoded_absolute('0')).to.throw('invalid absolute pointer');

    expect(split_decoded_pure('')).to.deep.equal({ segments: [] });
    expect(split_decoded_pure('/')).to.deep.equal({ segments: [''] });
    expect(split_decoded_pure('/abc/xyz')).to.deep.equal({ segments: ['abc', 'xyz'] });
    expect(split_decoded_pure('/~0~1')).to.deep.equal({ segments: ['~/'] });
    expect(() => split_decoded_pure('/~3')).to.throw('invalid pure pointer');
    expect(split_decoded_pure('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_decoded_pure('001')).to.throw('invalid pure pointer');
    expect(() => split_decoded_pure('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(() => split_decoded_pure('0#')).to.throw('invalid pure pointer');
    expect(split_decoded_pure('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_decoded_pure('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~/'] });

    expect(() => split_decoded_relative('')).to.throw('invalid relative pointer');
    expect(() => split_decoded_relative('/')).to.throw('invalid relative pointer');
    expect(split_decoded_relative('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_decoded_relative('001')).to.throw('invalid relative pointer');
    expect(() => split_decoded_relative('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(split_decoded_relative('0#')).to.deep.equal({ relative: 0, is_iref: true });
    expect(split_decoded_relative('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_decoded_relative('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~/'] });

    expect(() => split_decoded_relative_pure('')).to.throw('invalid pure relative pointer');
    expect(() => split_decoded_relative_pure('/')).to.throw('invalid pure relative pointer');
    expect(split_decoded_relative_pure('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_decoded_relative_pure('001')).to.throw('invalid pure relative pointer');
    expect(() => split_decoded_relative_pure('99999999999999999999999999999999999999999999999999999')).to.throw('invalid pure relative pointer');
    expect(() => split_decoded_relative_pure('0#')).to.throw('invalid pure relative pointer');;
    expect(split_decoded_relative_pure('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_decoded_relative_pure('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~/'] });

    expect(() => split_decoded_relative_iref('')).to.throw('invalid iref relative pointer');
    expect(() => split_decoded_relative_iref('/')).to.throw('invalid iref relative pointer');
    expect(() => split_decoded_relative_iref('0')).to.throw('invalid iref relative pointer');
    expect(() => split_decoded_relative_iref('001')).to.throw('invalid iref relative pointer');
    expect(() => split_decoded_relative_iref('99999999999999999999999999999999999999999999999999999')).to.throw('invalid iref relative pointer');
    expect(split_decoded_relative_iref('0#')).toBe(0);
    expect(split_decoded_relative_iref('123#')).toBe(123);
    expect(() => split_decoded_relative_iref('0/abc/xyz')).to.throw('invalid iref relative pointer');
    expect(() => split_decoded_relative_iref('0/~0~1')).to.throw('invalid iref relative pointer');
    expect(() => split_decoded_relative_iref('99999999999999999999999999999999999999999999999999999#')).to.throw('invalid iref relative pointer');
    
})
