import {Json} from "./core";

export enum JsonTypeEnum {
    NULL = 'null',
    BOOLEAN = 'boolean',
    NUMBER = 'number',
    STRING = 'string',
    OBJECT = 'object',
    ARRAY = 'array'
}

export type JsonPrimitiveType = JsonTypeEnum.NULL | JsonTypeEnum.BOOLEAN | JsonTypeEnum.NUMBER | JsonTypeEnum.STRING;
export type JsonContainerType = JsonTypeEnum.ARRAY | JsonTypeEnum.OBJECT;
export type JsonType = JsonPrimitiveType | JsonContainerType;

export type JsonToType<T extends Json = Json> =
    (T extends null ? JsonTypeEnum.NULL : never) |
    (T extends boolean ? JsonTypeEnum.BOOLEAN : never) |
    (T extends number ? JsonTypeEnum.NUMBER : never) |
    (T extends string ? JsonTypeEnum.STRING : never) |
    (T extends Array<any> ? JsonTypeEnum.ARRAY : never) |
    (T extends Record<string, any> ? JsonTypeEnum.OBJECT : never);
