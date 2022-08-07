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
* {@link traverse_json.has}, {@link traverse_jsonish.has} returns true if the given path exists
* {@link traverse_json.get}, {@link traverse_jsonish.get} returns the value resulting from traversing the given path
* {@link traverse_json.set}, {@link traverse_jsonish.set} traverses the given path, creating objects and arrays as necessary, and sets the leaf node value
* {@link traverse_json.update}, {@link traverse_jsonish.update} traverses the given path, creating objects and arrays as necessary, and updates the leaf node value
* {@link traverse_json.delete}, {@link traverse_jsonish.delete} traverses the given path, deleting the leaf node if it exists

### Utilities

* {@link clone}

* {@link parse_index}
* {@link parse_index_string}

* {@link object_assign}

* {@link constant} - Create a {@link Readable} store with a fixed value
* {@link readable} - Create a {@link Readable} store
* {@link writable} - Create a {@link Writable} store
* {@link derive}   - Create a {@link Readable} store derived from the resolved values of other stores
* {@link transform}- Create a {@link Writable} store by applying transform functions when reading and writing values

### Utility functions:
* {@link get} - Retrieve the value of a store
* {@link read_only} - Restrict a store to the {@link Readable} interface

### Type guards:
* {@link is_writable} Type guard to determine if store is {@link Writable}
* {@link is_readable} Type guard to determine if store is {@link Readable}

### Trigger functions:
* {@link trigger_always} - Trigger at every available opportunity
* {@link trigger_strict_not_equal} - Trigger based on strict inequality
* {@link trigger_safe_not_equal} - Svelte compatible trigger - Trigger when not equal or value is complex

## Installation

```bash
# pnpm
$ pnpm add @crikey/json

# npm
$ npm add @crikey/json

# yarn
$ yarn add @crikey/json
```

## Usage

All API functions have simple clean semantics and should be easy to understand.
Examples of each API can be found under test.
