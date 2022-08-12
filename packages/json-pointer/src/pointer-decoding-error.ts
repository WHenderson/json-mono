/**
 * Used to represent a failure during the decoding of a pointer
 * @group exceptions
 */
export class PointerDecodingError extends TypeError {
    constructor(message = PointerDecodingError.name) {
        super(message);
    }
}

Object.defineProperty(PointerDecodingError.prototype, 'name', {
    enumerable: false,
    configurable: true,
    value: PointerDecodingError.name,
    writable: true
});
