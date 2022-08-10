import {expect, it} from "vitest";
import {
    split,
    split_absolute,
    split_relative,
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

    expect(split('')).to.deep.equal({ segments: [] });
    expect(split('/')).to.deep.equal({ segments: [[false, '']] });
    expect(split('/abc/xyz')).to.deep.equal({ segments: [[false, 'abc'], [false, 'xyz']] });
    expect(split('/~0~1')).to.deep.equal({ segments: [[false, '~/']] });
    expect(() => split('/~3')).to.throw('invalid pointer');
    expect(split('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split('001')).to.throw('invalid pointer');
    expect(() => split('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(split('0/abc/xyz')).to.deep.equal({ relative: 0, segments: [[false, 'abc'], [false, 'xyz']] });
    expect(split('0/~0~1')).to.deep.equal({ relative: 0, segments: [[false, '~/']] });

    expect(split_absolute('')).to.deep.equal([]);
    expect(split_absolute('/')).to.deep.equal([[false, '']]);
    expect(split_absolute('/abc/xyz')).to.deep.equal([[false, 'abc'], [false, 'xyz']]);
    expect(split_absolute('/~0~1')).to.deep.equal([[false, '~/']]);
    expect(() => split_absolute('/~3')).to.throw('invalid absolute pointer');
    expect(() => split_absolute('0')).to.throw('invalid absolute pointer');

    expect(() => split_relative('')).to.throw('invalid relative pointer');
    expect(() => split_relative('/')).to.throw('invalid relative pointer');
    expect(split_relative('0')).to.deep.equal({ relative: 0, segments: [] });
    expect(() => split_relative('001')).to.throw('invalid relative pointer');
    expect(() => split_relative('99999999999999999999999999999999999999999999999999999')).to.throw('invalid relative pointer');
    expect(split_relative('0/abc/xyz')).to.deep.equal({ relative: 0, segments: [[false, 'abc'], [false, 'xyz']] });
    expect(split_relative('0/~0~1')).to.deep.equal({ relative: 0, segments: [[false, '~/']] });
})
