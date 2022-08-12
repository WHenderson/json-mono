# @crikey/json

JSON types and utility functions

See [@crikey/json](https://whenderson.github.io/json-mono/modules/_crikey_json.html) for full documentation.

## API

### Types
Contains types used to represent JSON and JSON equivalents.

Primary types:
* {@link Json} - A pure JSON type. Contained values may not be undefined.
* {@link Jsonish} - A JSON type which allows for contained values to be undefined.

### Guards
Contains typescript guards for identifying type information.

* {@link is_undefined} returns true if value is undefined
* {@link is_null} returns true if value is null
* {@link is_boolean} returns true if value is a boolean 
* {@link is_integer} returns true if value is an integer
* {@link is_safe_integer} returns true if value is a safe integer
* {@link is_index_number} returns true if value is a positive integer
* {@link is_index_string} returns true if value is the string equivalent of a positive integer 
* {@link is_index_number_or_string} returns true if either {@link is_index_number} or {@link is_index_string} is true
* {@link is_number} returns true if value is a number
* {@link is_finite_number} returns true if value is a finite number
* {@link is_string} returns true if value is a string
* {@link is_primitive} returns true if value is a json primitive
* {@link is_encodable_primitive} returns true if value is an encodable primitive
* {@link is_object} returns true if value is an object (but not an array)
* {@link is_array} returns true if value is an array
* {@link is_container} returns true if either {@link is_object} or {@link is_array} is true
* {@link is_json} returns true if a shallow check of value confirms a json type 
* {@link is_json_deep} returns true if a deep check of value confirms every contained value is a json type
* {@link is_encodable_json} returns true if a shallow check of value confirms it is an encodable json type
* {@link is_encodable_json_deep} returns true if a deep check of value confirms every contained value is an encodable json type
* {@link is_equal_deep} returns true if a deep comparison of values proves equality

### Access

* {@link object_has_key} returns true if object has an ownProperty with the given name
* {@link object_has_defined_key} returns true if object has an ownProperty with the given name whose value is not undefined 
* {@link object_member} returns the value of the given ownProperty
* {@link object_entries} returns all ownProperty entries of value
* {@link object_defined_entries} returns all ownProperty entries of value whose values are not undefined 
* {@link object_keys} returns all ownProperty keys of value
* {@link object_defined_keys} returns all ownProperty keys of value whose values are not undefined

* {@link array_has_index} returns true if array has the given index 
* {@link array_element} returns the value of the given index

* {@link container_has_key_or_index} returns true if value has the given index/key
* {@link container_has_defined_key_or_index} returns true if value has the given index/key, and it's value is not undefined
* {@link container_item} return the value of the given key/index

### Traversal

Provides methods for the following activities:
* {@link traverse_has | traverse_json.has}, {@link traverse_has | traverse_jsonish.has} returns true if the given path exists
* {@link traverse_get | traverse_json.get}, {@link traverse_get | traverse_jsonish.get} returns the value resulting from traversing the given path
* {@link traverse_json_set | traverse_json.set}, {@link traverse_jsonish_set | traverse_jsonish.set} traverses the given path, creating objects and arrays as necessary, and sets the leaf node value
* {@link traverse_json_update | traverse_json.update}, {@link traverse_jsonish_update | traverse_jsonish.update} traverses the given path, creating objects and arrays as necessary, and updates the leaf node value
* {@link traverse_delete | traverse_json.delete}, {@link traverse_delete | traverse_jsonish.delete} traverses the given path, deleting the leaf node if it exists

### Utilities

* {@link clone} Returns a deep clone of the given value Json or Jsonish value

* {@link parse_index} Parses the given encoded_index into an index, or undefined if it is invalid
* {@link parse_index_string} Returns the given encoded_index parsed into a numerical index, or undefined if the string does not represent a valid index

* {@link object_assign} Safe version of Object.assign which doesn't risk polluting the result object via `__proto__`

## Installation

```bash
# pnpm
$ pnpm add @crikey/json

# npm
$ npm add @crikey/json

# yarn
$ yarn add @crikey/json
```

## Example Usage

### Example Guards

```ts
const value: any = {a: NaN};

console.log(is_json(value)); // true
console.log(is_json_deep(value)); // true
console.log(is_encodable_json_deep(value)); // false - NaN is not a valid JSON value and will be cooerced into a null
```

```ts
const value: any = {a: undefined};

console.log(is_json(value)); // true
console.log(is_json_deep(value)); // false - json does not support undefined values
console.log(is_jsonish_deep(value)); // true - jsonish does support undefined values
```

### Example Access

```ts
const parent = {x: 1};
const child = {y: 1};
child.__proto__ = parent;

console.log('x' in child); // true
console.log(object_has_key(child, 'x')); // false
console.log(object_has_key(child, 'y')); // true
console.log(object_keys(child)); // ['y']
console.log(object_entries(child)); // [['y', 2]]
```

```ts
import {array_has_index} from "./array_has_index";

const value = ['a', 'b', 'c'];

console.log(array_has_index(value, 0)); // true
console.log(array_has_index(value, 3)); // false
console.log(array_element(value, 1)); // 'b'
```

### Example Traverse

```ts
import {traverse_get} from "./traverse_get";
import {traverse_json} from "./traverse_json";

const value = {foo: ['bar', 'baz']};

console.log(traverse_json.get(value, ['foo', 0])); // 'bar'
console.log(traverse_json.get(value, ['foo', 1])); // 'baz'
console.log(traverse_json.get(value, ['fah'])); // undefined
console.log(traverse_json.set(value, ['fah'], 1)); // {foo: ['bar', 'baz'], fah: 1}
```

### Example Util

```ts
const value = 'my value';
const type: JsonTypeEnum = get_type(value); 
console.log(type); // 'string'
```

```ts
const value = {a: 1, b: undefined, c:[]};
const cloned = clone(value);

console.log(cloned); // {a: 1, b: undefined, c:[]}
```

```ts
import {parse_index} from "./parse_index";

console.log(parse_index(1)); // 1
console.log(parse_index(1.1)); // undefined
console.log(parse_index('1')); // 1
console.log(parse_index('1.1')); // undefined

console.log(parse_index_string('1')); // 1
console.log(parse_index_string('1.1')); // undefined
```

```ts
const unsafe = Object.assign({}, { ['__proto__']: { x: 1 }});
const safe = object_assign({}, { ['__proto__']: { x: 1 }});

console.log(unsafe); // {}
console.log(safe); // { ['__proto__']: { x: 1 }}
```
