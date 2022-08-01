export class PointerEncodingError extends TypeError {
    constructor(message = PointerEncodingError.name) {
        super(message);
    }
}

Object.defineProperty(PointerEncodingError.prototype, 'name', {
    enumerable: false,
    configurable: true,
    value: PointerEncodingError.name,
    writable: true
});
