# @crikey/json

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

* `pointer-decoding-error` Error class thrown for pointer decoding errors
* `pointer-encoding-error` Error class thrown for pointer encoding errors

### Creation
Functions used for creating paths from their constituent parts

* `pointer_encoded` Create a `Pointer` from an optional `relative` number and a series of encoded segments
* `pointer_decoded` Create a `Pointer` from an optional `relative` number and a series of decoded segments
* `absolute_encoded` Create an `AbsolutePointer` from a series of encoded segments 
* `absolute_decoded` Create an `AbsolutePointer` from a series of decoded segments
* `relative_encoded` Create a `RelativePointer` from a `relative` number and a series of encoded segments
* `relative_decoded` Create a `RelativePointer` from a `relative` number and a series of decoded segments
* `relative_iref` Create a `RelativeIRefPointer` from a `relative` number

### Joining

* `join_pointer` Join two `Pointer`s together 
* `join_encoded_segments` Append encoded segments onto an existing `Pointer`
* `join_decoded_segments` Append decoded segments onto an existing `Pointer`
* `join_iref` Append an index reference onto a `RelativeOnlyPointer`

### Encoding

* `segment_encode` Encode a given string segment
* `segment_decode` Decode a given string segment

### Splitting

* `split_encoded` Split a `Pointer` into its constituent parts, leaving segments encoded
* `split_encoded_pure` Split a `PurePointer` into its constituent parts, leaving segments encoded
* `split_encoded_absolute` Split a `AbsolutePointer` into its constituent parts, leaving segments encoded
* `split_encoded_relative` Split a `RelativePointer` into its constituent parts, leaving segments encoded
* `split_encoded_relative_pure` Split a `RelativePurePointer` into its constituent parts, leaving segments encoded
* `split_encoded_relative_iref` Split a `RelativeIRefPointer` into its constituent parts, leaving segments encoded

* `split_decoded` Split a `Pointer` into its constituent parts, decoding each segment
* `split_decoded_pure` Split a `PurePointer` into its constituent parts, decoding each segment
* `split_decoded_absolute` Split a `AbsolutePointer` into its constituent parts, decoding each segment
* `split_decoded_relative` Split a `RelativePointer` into its constituent parts, decoding each segment
* `split_decoded_relative_pure` Split a `RelativePurePointer` into its constituent parts, decoding each segment
* `split_decoded_relative_iref` Split a `RelativeIRefPointer` into its constituent parts, decoding each segment

## Installation

```bash
# pnpm
$ pnpm add @crikey/json-pointer

# npm
$ npm add @crikey/json-pointer

# yarn
$ yarn add @crikey/json-pointer
```

## Usage

All API functions have simple clean semantics and should be easy to understand.
Examples of each API can be found under test.
