# @crikey/json-pointer

Functions for handling JSON pointers [rfc6901](https://www.rfc-editor.org/rfc/rfc6901.html) and [relative-json-pointer](https://datatracker.ietf.org/doc/html/draft-luff-relative-json-pointer-00)

See [@crikey/json-pointer](https://whenderson.github.io/json-mono/modules/_crikey_json_pointer.html) for full documentation.

## API

### Types
Contains types used to represent JSON pointers and segments

### Guards
Contains typescript guards for identifying type information.

* {@link is_pointer} Returns true if value is a {@link Pointer}
* {@link is_absolute} Returns true if value is an {@link AbsolutePointer}
* {@link is_relative} Returns true if value is a {@link RelativePointer}

### Error classes
Classes used when throwing errors

* {@link PointerDecodingError} Error class thrown for pointer decoding errors
* {@link PointerEncodingError} Error class thrown for pointer encoding errors

### Creation
Functions used for creating paths from their constituent parts

* {@link pointer} Create a {@link Pointer} from a series of decoded segments
* {@link absolute} Create an {@link AbsolutePointer} from a series of decoded segments
* {@link relative} Create a {@link RelativePointer} from a `relative` number and a series of decoded segments

* {@link pointer_encoded} Create a {@link Pointer} from an optional `relative` number and a series of encoded segments
* {@link absolute_encoded} Create an {@link AbsolutePointer} from a series of encoded segments
* {@link relative_encoded} Create a {@link RelativePointer} from a `relative` number and a series of encoded segments

### Joining
Combining pointer components and segments

* {@link join_pointer} Join two {@link Pointer}s together
* {@link join_segments} Append decoded segments onto an existing {@link Pointer}

* {@link join_encoded_segments} Append encoded segments onto an existing {@link Pointer}

### Encoding
Encode and decode path segments

* {@link segment_encode} Encode a given string segment
* {@link segment_decode} Decode a given string segment

### Splitting
Split paths into their constituent components/segments

* {@link split} Split a {@link Pointer} into its constituent parts, decoding each segment
* {@link split_absolute} Split a {@link AbsolutePointer} into its constituent parts, decoding each segment
* {@link split_relative} Split a {@link RelativePointer} into its constituent parts, decoding each segment

* {@link split_encoded} Split a {@link Pointer} into its constituent parts, leaving segments encoded
* {@link split_encoded_absolute} Split a {@link AbsolutePointer} into its constituent parts, leaving segments encoded
* {@link split_encoded_relative} Split a {@link RelativePointer} into its constituent parts, leaving segments encoded

## Installation

```bash
# pnpm
$ pnpm add @crikey/json-private-pointer

# npm
$ npm add @crikey/json-private-pointer

# yarn
$ yarn add @crikey/json-private-pointer
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
console.log(pointer('x',[true, 'y'], [false, 'z'])); // '/x/~3y/z'
console.log(pointer('~/')); // '/~0~1'
console.log(pointer(undefined,'x','y','z')); // '/x/y/z'
console.log(pointer(123,'x','y','z')); // '123/x/y/z'
console.log(relative(123,'x','y','z')); // '123/x/y/z'
```

### Joining

```ts
console.log(join_pointer('/a/b/c', '/x/y/z')); // '/x/y/z'
console.log(join_pointer('/a/b/c', '1/x/y/z')); // '/a/b/x/y/z'
console.log(join_segments('/a/b/c', 'x', [true, 'y'], 'z')); // '/a/b/c/x/~3y/z'
console.log(join_segments('/a/b/c', '~')); // '/a/b/c/~0'
```

### Splitting

```ts
console.log(split('/a/~3b/c')); // { segments: [[false, 'a'], [true, 'b'], [false, 'c']] }
console.log(split('123/a/~3b/c')); // { relative: 123, segments: [false, 'a'], [true, 'b'], [false, 'c'] }
```

