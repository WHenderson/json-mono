import {describe, expect, it} from "vitest";
import {
    traverse_get,
    traverse_delete,
    traverse_json_update,
    traverse_jsonish_update, traverse_has
} from "../src/traverse";

describe('either json or jsonish', () => {
    describe('get', () => {
        const get = traverse_get;

        it('should return undefined for missing, inaccessible, or invalid paths', () => {
            expect(get(undefined, ['x'])).toBeUndefined();
            expect(get(null, ['x'])).toBeUndefined();
            expect(get(true, ['x'])).toBeUndefined();
            expect(get(1, ['x'])).toBeUndefined();
            expect(get('string', ['x'])).toBeUndefined();
            expect(get({ a: 1 }, ['x'])).toBeUndefined();
            expect(get({ x: undefined }, ['x'])).toBeUndefined();
            expect(get([], ['x'])).toBeUndefined();
            expect(get([], [10])).toBeUndefined();
            expect(get([], ['-'])).toBeUndefined();
        });

        it('should return array length', () => {
            expect(get(['a','b','c'], ['length'])).toBe(3);
            expect(get({ a: ['a','b','c'] }, ['a', 'length'])).toBe(3);
        });

        it('should return array elements', () => {
            expect(get(['a','b','c'], [1])).toBe('b');
            expect(get(['a','b','c'], ['1'])).toBe('b');
        });

        it('should return object members', () => {
            expect(get({ a: 1, b: 2}, ['a'])).toBe(1);
            expect(get({ a: 1, b: 2}, ['b'])).toBe(2);
        })
    });

    describe('delete', () => {
        const del = traverse_delete;

        it('should return undefined when deleting root element', () => {
            expect(del(undefined, [])).toBe(undefined);
            expect(del(null, [])).toBe(undefined);
            expect(del(true, [])).toBe(undefined);
            expect(del(1, [])).toBe(undefined);
            expect(del({}, [])).toBe(undefined);
            expect(del([], [])).toBe(undefined);
        });

        it('should ignore deleting undefined, missing, inaccessible, or invalid paths', () => {
            expect(del(undefined, ['x'])).toBe(undefined);
            expect(del(null, ['x'])).toBe(null);
            expect(del(true, ['x'])).toBe(true);
            expect(del(1, ['x'])).toBe(1);
            expect(del('string', ['x'])).toBe('string');
            expect(del({ a: 1 }, ['x'])).to.deep.equal({ a: 1})
            expect(del([], ['x'])).to.deep.equal([]);
            expect(del([], [10])).to.deep.equal([]);
            expect(del([], ['-'])).to.deep.equal([]);
        });

        it('should throw when deleting array length', () => {
            expect(() => del([], ['length'])).to.throw(RangeError, 'Invalid array length');
        });

        it('should delete array elements', () => {
            expect(del(['a','b','c'], [1])).to.deep.equal(['a','c']);
            expect(del(['a','b','c'], ['1'])).to.deep.equal(['a','c']);
            expect(del(['a','b','c'], ['-'])).to.deep.equal(['a','b','c']);
            expect(del(['a','b','c'], [3])).to.deep.equal(['a','b','c']);
            expect(del(['a','b','c'], ['3'])).to.deep.equal(['a','b','c']);
        });

        it('should delete object elements', () => {
            expect(del({ a: 1}, ['a'])).to.deep.equal({});
            expect(del({ a: 1}, ['x'])).to.deep.equal({ a: 1 });
        });

        it('should delete deep items', () => {
            expect(del({a:['a','b','c']}, ['a',1])).to.deep.equal({a:['a','c']});
            expect(del([{a:1}], [0,'a'])).to.deep.equal([{}]);
        })
    });

    describe('has', () => {
        const has = traverse_has;

        it('should identify which items exist', () => {
            expect(has(undefined, [])).toBe(false);
            expect(has(null, ['x'])).toBe(false);
            expect(has(true, ['x'])).toBe(false);
            expect(has(1, ['x'])).toBe(false);
            expect(has('xxx', ['x'])).toBe(false);
            expect(has({}, ['x'])).toBe(false);
            expect(has([], ['x'])).toBe(false);
            expect(has([], ['-'])).toBe(false);
            expect(has([], [1])).toBe(false);

            expect(has([], ['length'])).toBe(true);
            expect(has(['a'], [0])).toBe(true);
            expect(has({ a: 1}, ['a'])).toBe(true);
        });
    })
});

describe('json', () => {
    describe('update', () => {
        const update = traverse_json_update;
        const set_2 = () => 2;
        const set_undefined = () => undefined;
        const set_real = () => 1.1;

        it('should create missing paths where necessary', () => {
            expect(update(undefined, ['x'], set_2)).to.deep.equal({ x: 2 });
            expect(update(undefined, ['-'], set_2)).to.deep.equal({ "-": 2 });
            expect(update(undefined, ['length'], set_2)).to.deep.equal({ "length": 2 });
            expect(update(undefined, ['0'], set_2)).to.deep.equal({ "0": 2 });

            expect(update(undefined, [0], set_2)).to.deep.equal([2]);
            expect(() => update(undefined, [1], set_2)).to.throw(RangeError, 'Undefined elements not supported')

            expect(update(undefined, ['x',0,'y'], set_2)).to.deep.equal({ x: [{ y: 2 }]});
        });

        it('should throw when setting invalid paths', () => {
            expect(() => update(null, ['x'], set_2)).to.throw(Error, 'Cannot set invalid path');
            expect(() => update(true, ['x'], set_2)).to.throw(Error, 'Cannot set invalid path');
            expect(() => update(1, ['x'], set_2)).to.throw(Error, 'Cannot set invalid path');
            expect(() => update('string', ['x'], set_2)).to.throw(Error, 'Cannot set invalid path');
        });

        it('should ignore setting invalid paths to undefined', () => {
            expect(update(undefined, ['x'], set_undefined)).toBe(undefined);
            expect(update(null, ['x'], set_undefined)).toBe(null);
            expect(update(true, ['x'], set_undefined)).toBe(true);
            expect(update(1, ['x'], set_undefined)).toBe(1);
            expect(update('string', ['x'], set_undefined)).toBe('string');
            expect(update({ a: 1 }, ['x'], set_undefined)).to.deep.equal({ a: 1});
            expect(update([], ['x'], set_undefined)).to.deep.equal([]);
            expect(update([], [1], set_undefined)).to.deep.equal([]);
        })

        it('should allow updating array length directly', () => {
            expect(update(['a','b','c'], ['length'], set_2)).to.deep.equal(['a','b']);
            expect(() => update([], ['length'], set_2)).to.throw(RangeError, 'Undefined elements not supported');
            expect(() => update([], ['length'], set_undefined)).to.throw(RangeError, 'Invalid array length');
            expect(() => update([], ['length'], set_real)).to.throw(RangeError, 'Invalid array length');
        });

        it('should allow updating the last member of an array', () => {
            expect(update(['a','b','c'], ['-'], set_2)).to.deep.equal(['a','b','c',2]);
            expect(update(['a','b','c'], ['-'], set_undefined)).to.deep.equal(['a','b','c']);
        });

        it('should allow updating a specific array element', () => {
            expect(update(['a','b','c'], [1], set_2)).to.deep.equal(['a',2,'c']);
            expect(update(['a','b','c'], [3], set_2)).to.deep.equal(['a','b','c', 2]);
            expect(() => update(['a','b','c'], [4], set_2)).to.throw(RangeError, 'Undefined elements not supported');

            expect(update(['a','b','c'], [1], set_undefined)).to.deep.equal(['a','c']);
            expect(update(['a','b','c'], [3], set_undefined)).to.deep.equal(['a','b','c']);
            expect(update(['a','b','c'], [4], set_undefined)).to.deep.equal(['a','b','c']);
        });

        it('should allow updating object members', () => {
            expect(update({ a: 1 }, ['a'], set_2)).to.deep.equal({ a: 2 });
            expect(update({ a: 1 }, ['b'], set_2)).to.deep.equal({ a: 1, b: 2 });
            expect(update({ a: 1 }, ['a'], set_undefined)).to.deep.equal({});
        })
    });
});

describe('jsonish', () => {
    describe('update', () => {
        const update = traverse_jsonish_update;
        const set_2 = () => 2;
        const set_undefined = () => undefined;
        const set_real = () => 1.1;

        it('should create missing paths where necessary', () => {
            expect(update(undefined, ['x'], set_2)).to.deep.equal({ x: 2 });
            expect(update(undefined, ['-'], set_2)).to.deep.equal({ "-": 2 });
            expect(update(undefined, ['length'], set_2)).to.deep.equal({ "length": 2 });
            expect(update(undefined, ['0'], set_2)).to.deep.equal({ "0": 2 });

            expect(update(undefined, [0], set_2)).to.deep.equal([2]);
            expect(update(undefined, [1], set_2)).to.deep.equal([,2]);

            expect(update(undefined, ['x',0,'y'], set_2)).to.deep.equal({ x: [{ y: 2 }]});
        });

        it('should throw when setting invalid paths', () => {
            expect(() => update(null, ['x'], set_2)).to.throw(Error, 'Cannot set invalid path');
            expect(() => update(true, ['x'], set_2)).to.throw(Error, 'Cannot set invalid path');
            expect(() => update(1, ['x'], set_2)).to.throw(Error, 'Cannot set invalid path');
            expect(() => update('string', ['x'], set_2)).to.throw(Error, 'Cannot set invalid path');
        });

        it('should ignore setting invalid paths to undefined', () => {
            expect(update(null, ['x'], set_undefined)).toBe(null);
            expect(update(true, ['x'], set_undefined)).toBe(true);
            expect(update(1, ['x'], set_undefined)).toBe(1);
            expect(update('string', ['x'], set_undefined)).toBe('string');
            expect(update({ a: 1 }, ['x'], set_undefined)).to.deep.equal({ a: 1, x: undefined });
            expect(update([], ['x'], set_undefined)).to.deep.equal([]);
            expect(update([], [1], set_undefined)).to.deep.equal([, undefined]);
        })

        it('should allow updating array length directly', () => {
            expect(update(['a','b','c'], ['length'], set_2)).to.deep.equal(['a','b']);
            expect(update([], ['length'], set_2)).to.deep.equal(Array(2));
            expect(() => update([], ['length'], set_undefined)).to.throw(RangeError, 'Invalid array length');
            expect(() => update([], ['length'], set_real)).to.throw(RangeError, 'Invalid array length');
        });

        it('should allow updating the last member of an array', () => {
            expect(update(['a','b','c'], ['-'], set_2)).to.deep.equal(['a','b','c',2]);
            expect(update(['a','b','c'], ['-'], set_undefined)).to.deep.equal(['a','b','c', undefined]);
        });

        it('should allow updating a specific array element', () => {
            expect(update(['a','b','c'], [1], set_2)).to.deep.equal(['a',2,'c']);
            expect(update(['a','b','c'], [3], set_2)).to.deep.equal(['a','b','c', 2]);
            expect(update(['a','b','c'], [4], set_2)).to.deep.equal(['a','b','c',,2]);

            expect(update(['a','b','c'], [1], set_undefined)).to.deep.equal(['a',undefined,'c']);
            expect(update(['a','b','c'], [3], set_undefined)).to.deep.equal(['a','b','c', undefined]);
            expect(update(['a','b','c'], [4], set_undefined)).to.deep.equal(['a','b','c',, undefined]);
        });

        it('should allow updating object members', () => {
            expect(update({ a: 1 }, ['a'], set_2)).to.deep.equal({ a: 2 });
            expect(update({ a: 1 }, ['b'], set_2)).to.deep.equal({ a: 1, b: 2 });
            expect(update({ a: 1 }, ['a'], set_undefined)).to.deep.equal({ a: undefined });
        })
    });
});

