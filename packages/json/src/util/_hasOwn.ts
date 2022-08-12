export const hasOwn = 'hasOwn' in Object ? Object.hasOwn : (o: object, v: PropertyKey): boolean => ({}).hasOwnProperty.call(o,v);
