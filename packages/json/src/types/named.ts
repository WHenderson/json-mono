import {JsonPrimitive} from "./core";

export enum JsonTypeEnum {
    UNDEFINED = 'undefined',
    NULL = 'null',
    BOOLEAN = 'boolean',
    NUMBER = 'number',
    STRING = 'string',
    OBJECT = 'object',
    ARRAY = 'array'
}

export type JsonUndefinedType = JsonTypeEnum.UNDEFINED;
export type JsonNullType = JsonTypeEnum.NULL;
export type JsonBooleanType = JsonTypeEnum.BOOLEAN;
export type JsonNumberType = JsonTypeEnum.NUMBER;
export type JsonStringType = JsonTypeEnum.STRING;
export type JsonObjectType = JsonTypeEnum.OBJECT;
export type JsonArrayType = JsonTypeEnum.ARRAY;

export type JsonPrimitiveType = JsonTypeEnum.NULL | JsonTypeEnum.BOOLEAN | JsonTypeEnum.NUMBER | JsonTypeEnum.STRING;
export type JsonContainerType = JsonTypeEnum.ARRAY | JsonTypeEnum.OBJECT;
export type JsonType = JsonPrimitiveType | JsonContainerType;

export type MaybeJsonPrimitiveType = JsonTypeEnum.UNDEFINED | JsonTypeEnum.NULL | JsonTypeEnum.BOOLEAN | JsonTypeEnum.NUMBER | JsonTypeEnum.STRING;
export type MaybeJsonContainerType = JsonTypeEnum.UNDEFINED | JsonTypeEnum.ARRAY | JsonTypeEnum.OBJECT;
export type MaybeJsonType = JsonTypeEnum.UNDEFINED | JsonPrimitiveType | JsonContainerType;

export type JsonToType<T extends undefined | JsonPrimitive | any[] | Record<string, any>> =
    (T extends undefined ? JsonTypeEnum.UNDEFINED : never) |
    (T extends null ? JsonTypeEnum.NULL : never) |
    (T extends boolean ? JsonTypeEnum.BOOLEAN : never) |
    (T extends number ? JsonTypeEnum.NUMBER : never) |
    (T extends string ? JsonTypeEnum.STRING : never) |
    (T extends Array<any> ? JsonTypeEnum.ARRAY : never) |
    ([T] extends [Record<string, any>] ? ([Record<string, any>] extends [T] ? JsonTypeEnum.OBJECT : never) : never);
