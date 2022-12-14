# @crikey/json-pointer

Functions for handling JSON pointers [rfc6901](https://www.rfc-editor.org/rfc/rfc6901.html) and [relative-json-pointer](https://datatracker.ietf.org/doc/html/draft-luff-relative-json-pointer-00)

See [@crikey/json-pointer](https://whenderson.github.io/json-mono/modules/_crikey_json_pointer.html) for full documentation.

## API

### Types
Contains types used to represent JSON pointers and segments

### Guards
Contains typescript guards for identifying type information.

* `is_pointer` Returns true if value is a `Pointer`
* `is_absolute` Returns true if value is an `AbsolutePointer`
* `is_relative` Returns true if value is a `RelativePointer`
* `is_relative_pure` Returns true if value is a `RelativeOnlyPointer` or `RelativePurePointer`
* `is_relative_iref` Returns true if value is a `RelativeIRefPointer`
* `is_relative_only` Returns true if value is a `RelativeOnlyPointer`

### Error classes
Classes used when throwing errors

* `pointer-decoding-error` Error class thrown for pointer decoding errors
* `pointer-encoding-error` Error class thrown for pointer encoding errors

### Creation
Functions used for creating paths from their constituent parts

* `pointer` Create a `Pointer` from an optional `relative` number and a series of decoded segments
* `absolute` Create an `AbsolutePointer` from a series of decoded segments
* `relative` Create a `RelativePointer` from a `relative` number and a series of decoded segments
* `relative_iref` Create a `RelativeIRefPointer` from a `relative` number

* `pointer_encoded` Create a `Pointer` from an optional `relative` number and a series of encoded segments
* `absolute_encoded` Create an `AbsolutePointer` from a series of encoded segments
* `relative_encoded` Create a `RelativePointer` from a `relative` number and a series of encoded segments

### Joining
Combining pointer components and segments

* `join_pointer` Join two `Pointer`s together
* `join_segments` Append decoded segments onto an existing `Pointer`
* `join_iref` Append an index reference onto a `RelativeOnlyPointer`

* `join_encoded_segments` Append encoded segments onto an existing `Pointer`

### Encoding
Encode and decode path segments

* `segment_encode` Encode a given string segment
* `segment_decode` Decode a given string segment

### Splitting
Split paths into their constituent components/segments

* `split` Split a `Pointer` into its constituent parts, decoding each segment
* `split_pure` Split a `PurePointer` into its constituent parts, decoding each segment
* `split_absolute` Split a `AbsolutePointer` into its constituent parts, decoding each segment
* `split_relative` Split a `RelativePointer` into its constituent parts, decoding each segment
* `split_relative_pure` Split a `RelativePurePointer` into its constituent parts, decoding each segment
* `split_relative_iref` Split a `RelativeIRefPointer` into its constituent parts, decoding each segment

* `split_encoded` Split a `Pointer` into its constituent parts, leaving segments encoded
* `split_encoded_pure` Split a `PurePointer` into its constituent parts, leaving segments encoded
* `split_encoded_absolute` Split a `AbsolutePointer` into its constituent parts, leaving segments encoded
* `split_encoded_relative` Split a `RelativePointer` into its constituent parts, leaving segments encoded
* `split_encoded_relative_pure` Split a `RelativePurePointer` into its constituent parts, leaving segments encoded
* `split_encoded_relative_iref` Split a `RelativeIRefPointer` into its constituent parts, leaving segments encoded

## Installation

```bash
# pnpm
$ pnpm add @crikey/json-pointer

# npm
$ npm add @crikey/json-pointer

# yarn
$ yarn add @crikey/json-pointer
```

## Example Usage

### Guards

```ts
console.log(is_pointer('xyz')); // false
console.log(is_pointer('/xyz')); // true
console.log(is_pointer('123/xyz')); // true
console.log(is_absolute('123/xyz')); // false
console.log(is_relative('123/xyz')); // true
```

### Creating

```ts
console.log(pointer('x','y','z')); // '/x/y/z'
console.log(pointer('~/')); // '/~0~1'
console.log(pointer(undefined,'x','y','z')); // '/x/y/z'
console.log(pointer(123,'x','y','z')); // '123/x/y/z'
console.log(relative(123,'x','y','z')); // '123/x/y/z'
```

### Joining

```ts
console.log(join_pointer('/a/b/c', '/x/y/z')); // '/x/y/z'
console.log(join_pointer('/a/b/c', '1/x/y/z')); // '/a/b/x/y/z'
console.log(join_segments('/a/b/c', 'x', 'y', 'z')); // '/a/b/c/x/y/z'
console.log(join_segments('/a/b/c', '~')); // '/a/b/c/~0'
```

### Splitting

```ts
console.log(split('/a/b/c')); // { segments: ['a', 'b', 'c'] }
console.log(split('123/a/b/c')); // { relative: 123, segments: ['a', 'b', 'c'] }
console.log(split('123#')); // { relative: 123, iref: true }
```
