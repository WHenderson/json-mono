import {expect, it} from "vitest";
import {traverse_get, traverse_json} from "../src/traverse";

it('should get the correct value', () => {
    const sym = Symbol('test symbol');
    const doc = {
        "foo": ["bar", "baz"],
        [sym]: "value"
    };

    expect(traverse_get(doc, [])).toBe(doc);
    expect(traverse_get(doc, ["foo"])).toBe(doc.foo);
    expect(traverse_get(doc, ["foo", 0])).toBe(doc.foo[0]);
    expect(traverse_get(doc, ["foo", -1])).toBe(undefined);
    expect(traverse_get(doc, ["foo", "0"])).toBe(doc.foo[0]);
    expect(traverse_get(doc, ["foo", "00"])).toBe(undefined);
    expect(traverse_get(doc, ["foo", "-"])).toBe(undefined);
    expect(traverse_get(doc, ["foo", "length"])).toBe(doc.foo.length);
    expect(traverse_get(doc, ["does", "not", "exist"])).toBe(undefined);
    expect(traverse_get(doc, ["foo", 0, 0])).toBe(undefined);
    expect(traverse_get(doc, [sym])).toBe(doc[sym]);
});

it('should update json objects', () => {
    const sym = Symbol('test symbol');
    const doc = () => ({
        "foo": ["bar", "baz"],
        [sym]: "value"
    });



    expect(() => traverse_json.set(1, ["foo"], 2)).to.throw('invalid path');
    expect(traverse_json.set(undefined, ["foo"], 2)).to.deep.equal({ "foo": 2 });
    expect(traverse_json.set(undefined, [0], 2)).to.deep.equal([2]);
    expect((<any>traverse_json.set(doc(), [sym], 2))[sym]).toBe(2);
    expect(traverse_json.set(doc(), ["foo", "length"], 1)).to.deep.equal({ "foo": ["bar"] });
    expect(traverse_json.set(doc(), ["foo", "-"], "bla")).to.deep.equal({ "foo": ["bar", "baz", "bla"] });
    expect(traverse_json.set(doc(), ["foo", 1], "bla")).to.deep.equal({ "foo": ["bar", "bla"] });
    expect(traverse_json.set(doc(), ["foo", 2], "bla")).to.deep.equal({ "foo": ["bar", "baz", "bla"] });
    expect(() => traverse_json.set(doc(), ["foo", 3], "bla")).to.throw('cannot create sparse array');
    expect(() => traverse_json.set(doc(), ["foo", 3.1], "bla")).to.throw('invalid path');

    expect(traverse_json.set(doc(), ["foo"], 1)).to.deep.equal({ foo: 1})

});
