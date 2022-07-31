import {expect, it} from "vitest";
import {
    array_element,
    array_has_index,
    container_has_defined_key_or_index,
    container_has_key_or_index,
    container_item,
    object_defined_entries,
    object_defined_keys,
    object_entries,
    object_has_defined_key,
    object_has_key,
    object_keys,
    object_member
} from "../src";

it('should determine if number is an index', () => {
    expect(array_has_index(['a','b','c'], 0)).toBeTruthy();
    expect(array_has_index(['a','b','c'], 4)).toBeFalsy();
    expect(array_has_index(['a','b','c'], NaN)).toBeFalsy();
});

it('should access array elements', () => {
    expect(array_element(['a','b','c'], 1)).toBe('b');
    expect(array_element(['a','b','c'], 4)).toBe(undefined);
    expect(array_element(['a','b','c'], 1.1)).toBe(undefined);
    expect(array_element(['a','b','c'], NaN)).toBe(undefined);
});

it('should determine if object has key', () => {
    expect(object_has_key({ a: 1 }, 'a')).toBeTruthy();
    expect(object_has_key({ a: undefined }, 'a')).toBeTruthy();

    expect(object_has_defined_key({ a: 1 }, 'a')).toBeTruthy();
    expect(object_has_defined_key({ a: undefined }, 'a')).toBeFalsy();
});

it('should find all the object keys', () => {
    expect(object_keys({ a: 1, b: undefined})).to.deep.equal(['a','b']);
    expect(object_defined_keys({ a: 1, b: undefined})).to.deep.equal(['a']);
});

it('should find all the object entries', () => {
    expect(object_entries({ a: 1, b: undefined})).to.deep.equal([['a', 1],['b', undefined]]);
    expect(object_defined_entries({ a: 1, b: undefined})).to.deep.equal([['a', 1]]);
});

it('should find object member', () => {
    expect(object_member({ a: 1, b: undefined}, 'a')).toBe(1);
    expect(object_member({ a: 1, b: undefined}, 'b')).toBeUndefined();
    expect(object_member({ a: 1, b: undefined}, 'c')).toBeUndefined();
});

it('should determine if container has key or index', () => {
    expect(container_has_key_or_index({ a: 1, b: undefined}, 'a')).toBeTruthy();
    expect(container_has_key_or_index({ a: 1, b: undefined}, 'b')).toBeTruthy();
    expect(container_has_key_or_index({ a: 1, b: undefined}, 'c')).toBeFalsy();
    expect(container_has_key_or_index({ a: 1, b: undefined}, 0)).toBeFalsy();
    expect(container_has_key_or_index({ a: 1, b: undefined, [1]: 'x'}, 1)).toBeTruthy();

    expect(container_has_key_or_index(['a','b','c'], 0)).toBeTruthy();
    expect(container_has_key_or_index(['a','b','c'], 4)).toBeFalsy();
    expect(container_has_key_or_index(['a','b','c'], NaN)).toBeFalsy();
    expect(container_has_key_or_index(['a','b','c'], 'length')).toBeFalsy();

    expect(container_has_key_or_index(<any>Symbol('example'), 'length')).toBeFalsy();

    expect(container_has_defined_key_or_index({ a: 1, b: undefined}, 'a')).toBeTruthy();
    expect(container_has_defined_key_or_index({ a: 1, b: undefined}, 'b')).toBeFalsy();
    expect(container_has_defined_key_or_index({ a: 1, b: undefined}, 'c')).toBeFalsy();
    expect(container_has_defined_key_or_index({ a: 1, b: undefined}, 0)).toBeFalsy();
    expect(container_has_defined_key_or_index({ a: 1, b: undefined, [1]: 'x'}, 1)).toBeTruthy();

    expect(container_has_defined_key_or_index(['a','b','c'], 0)).toBeTruthy();
    expect(container_has_defined_key_or_index(['a','b','c'], 4)).toBeFalsy();
    expect(container_has_defined_key_or_index(['a','b','c'], NaN)).toBeFalsy();
    expect(container_has_defined_key_or_index(['a','b','c'], 'length')).toBeFalsy();

    expect(container_has_defined_key_or_index(<any>Symbol('example'), 'length')).toBeFalsy();
});

it('should access container item', () => {
    expect(container_item({ a: 1, b: undefined}, 'a')).toBe(1);
    expect(container_item({ a: 1, b: undefined}, 'b')).toBeUndefined();
    expect(container_item({ a: 1, b: undefined}, 'c')).toBeUndefined();
    expect(container_item({ a: 1, b: undefined}, 0)).toBeUndefined();
    expect(container_item({ a: 1, b: undefined, [1]: 'x'}, 1)).toBe('x');

    expect(container_item(['a','b','c'], 0)).toBe('a');
    expect(container_item(['a','b','c'], 4)).toBeUndefined();
    expect(container_item(['a','b','c'], NaN)).toBeUndefined();
    expect(container_item(['a','b','c'], 'length')).toBeUndefined();

    expect(container_item(<any>Symbol('example'), 'length')).toBeUndefined();
});
