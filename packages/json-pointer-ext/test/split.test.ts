import {expect, it} from "vitest";
import {
    split_decoded,
    split_decoded_absolute,
    split_decoded_relative,
    split_encoded,
    split_encoded_absolute,
    split_encoded_relative,
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
    expect(split_encoded('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_encoded('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~0~1'] });

    expect(split_encoded_absolute('')).to.deep.equal([]);
    expect(split_encoded_absolute('/')).to.deep.equal(['']);
    expect(split_encoded_absolute('/abc/xyz')).to.deep.equal(['abc', 'xyz']);
    expect(split_encoded_absolute('/~0~1')).to.deep.equal(['~0~1']);
    expect(() => split_encoded_absolute('/~3')).to.throw('invalid absolute pointer');
    expect(() => split_encoded_absolute('0')).to.throw('invalid absolute pointer');

    expect(() => split_encoded_relative('')).to.throw('invalid relative pointer');
    expect(() => split_encoded_relative('/')).to.throw('invalid relative pointer');
    expect(split_encoded_relative('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_encoded_relative('001')).to.throw('invalid relative pointer');
    expect(() => split_encoded_relative('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(split_encoded_relative('0/abc/xyz')).to.deep.equal({ relative: 0, segments: ['abc', 'xyz'] });
    expect(split_encoded_relative('0/~0~1')).to.deep.equal({ relative: 0, segments: ['~0~1'] });

    // ---

    expect(split_decoded('')).to.deep.equal({ segments: [] });
    expect(split_decoded('/')).to.deep.equal({ segments: [[false, '']] });
    expect(split_decoded('/abc/xyz')).to.deep.equal({ segments: [[false, 'abc'], [false, 'xyz']] });
    expect(split_decoded('/~0~1')).to.deep.equal({ segments: [[false, '~/']] });
    expect(() => split_decoded('/~3')).to.throw('invalid pointer');
    expect(split_decoded('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_decoded('001')).to.throw('invalid pointer');
    expect(() => split_decoded('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(split_decoded('0/abc/xyz')).to.deep.equal({ relative: 0, segments: [[false, 'abc'], [false, 'xyz']] });
    expect(split_decoded('0/~0~1')).to.deep.equal({ relative: 0, segments: [[false, '~/']] });

    expect(split_decoded_absolute('')).to.deep.equal([]);
    expect(split_decoded_absolute('/')).to.deep.equal([[false, '']]);
    expect(split_decoded_absolute('/abc/xyz')).to.deep.equal([[false, 'abc'], [false, 'xyz']]);
    expect(split_decoded_absolute('/~0~1')).to.deep.equal([[false, '~/']]);
    expect(() => split_decoded_absolute('/~3')).to.throw('invalid absolute pointer');
    expect(() => split_decoded_absolute('0')).to.throw('invalid absolute pointer');

    expect(() => split_decoded_relative('')).to.throw('invalid relative pointer');
    expect(() => split_decoded_relative('/')).to.throw('invalid relative pointer');
    expect(split_decoded_relative('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_decoded_relative('001')).to.throw('invalid relative pointer');
    expect(() => split_decoded_relative('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(split_decoded_relative('0/abc/xyz')).to.deep.equal({ relative: 0, segments: [[false, 'abc'], [false, 'xyz']] });
    expect(split_decoded_relative('0/~0~1')).to.deep.equal({ relative: 0, segments: [[false, '~/']] });
})
