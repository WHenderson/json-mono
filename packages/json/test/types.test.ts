import {expect, it} from "vitest";
import {get_type, JsonTypeEnum} from "../src";

type ExactType<A,B> = [A] extends [B]
    ? (
        [B] extends [A]
            ? true
            : false
        )
    : false;

function ts_assert<T extends boolean>(_condition: T) {
}

it('should determine correct type', () => {
    expect(get_type(undefined)).toBe(JsonTypeEnum.UNDEFINED);
    expect(get_type(null)).toBe(JsonTypeEnum.NULL);
    expect(get_type(true)).toBe(JsonTypeEnum.BOOLEAN);
    expect(get_type(false)).toBe(JsonTypeEnum.BOOLEAN);
    expect(get_type(0)).toBe(JsonTypeEnum.NUMBER);
    expect(get_type('xxx')).toBe(JsonTypeEnum.STRING);
    expect(get_type([])).toBe(JsonTypeEnum.ARRAY);
    expect(get_type({})).toBe(JsonTypeEnum.OBJECT);
    expect(() => get_type(Symbol('example'))).toThrow();

    const res_undefined = get_type(undefined);
    ts_assert<ExactType<JsonTypeEnum.UNDEFINED, typeof res_undefined>>(true);
    ts_assert<ExactType<JsonTypeEnum.NULL, typeof res_undefined>>(false);
    ts_assert<ExactType<JsonTypeEnum.BOOLEAN, typeof res_undefined>>(false);
    ts_assert<ExactType<JsonTypeEnum.NUMBER, typeof res_undefined>>(false);
    ts_assert<ExactType<JsonTypeEnum.STRING, typeof res_undefined>>(false);
    ts_assert<ExactType<JsonTypeEnum.ARRAY, typeof res_undefined>>(false);
    ts_assert<ExactType<JsonTypeEnum.OBJECT, typeof res_undefined>>(false);

    const res_null = get_type(null);
    ts_assert<ExactType<JsonTypeEnum.UNDEFINED, typeof res_null>>(false);
    ts_assert<ExactType<JsonTypeEnum.NULL, typeof res_null>>(true);
    ts_assert<ExactType<JsonTypeEnum.BOOLEAN, typeof res_null>>(false);
    ts_assert<ExactType<JsonTypeEnum.NUMBER, typeof res_null>>(false);
    ts_assert<ExactType<JsonTypeEnum.STRING, typeof res_null>>(false);
    ts_assert<ExactType<JsonTypeEnum.ARRAY, typeof res_null>>(false);
    ts_assert<ExactType<JsonTypeEnum.OBJECT, typeof res_null>>(false);

    const res_boolean = get_type(true);
    ts_assert<ExactType<JsonTypeEnum.UNDEFINED, typeof res_boolean>>(false);
    ts_assert<ExactType<JsonTypeEnum.NULL, typeof res_boolean>>(false);
    ts_assert<ExactType<JsonTypeEnum.BOOLEAN, typeof res_boolean>>(true);
    ts_assert<ExactType<JsonTypeEnum.NUMBER, typeof res_boolean>>(false);
    ts_assert<ExactType<JsonTypeEnum.STRING, typeof res_boolean>>(false);
    ts_assert<ExactType<JsonTypeEnum.ARRAY, typeof res_boolean>>(false);
    ts_assert<ExactType<JsonTypeEnum.OBJECT, typeof res_boolean>>(false);

    const res_number = get_type(1);
    ts_assert<ExactType<JsonTypeEnum.UNDEFINED, typeof res_number>>(false);
    ts_assert<ExactType<JsonTypeEnum.NULL, typeof res_number>>(false);
    ts_assert<ExactType<JsonTypeEnum.BOOLEAN, typeof res_number>>(false);
    ts_assert<ExactType<JsonTypeEnum.NUMBER, typeof res_number>>(true);
    ts_assert<ExactType<JsonTypeEnum.STRING, typeof res_number>>(false);
    ts_assert<ExactType<JsonTypeEnum.ARRAY, typeof res_number>>(false);
    ts_assert<ExactType<JsonTypeEnum.OBJECT, typeof res_number>>(false);

    const res_string = get_type('xxx');
    ts_assert<ExactType<JsonTypeEnum.UNDEFINED, typeof res_string>>(false);
    ts_assert<ExactType<JsonTypeEnum.NULL, typeof res_string>>(false);
    ts_assert<ExactType<JsonTypeEnum.BOOLEAN, typeof res_string>>(false);
    ts_assert<ExactType<JsonTypeEnum.NUMBER, typeof res_string>>(false);
    ts_assert<ExactType<JsonTypeEnum.STRING, typeof res_string>>(true);
    ts_assert<ExactType<JsonTypeEnum.ARRAY, typeof res_string>>(false);
    ts_assert<ExactType<JsonTypeEnum.OBJECT, typeof res_string>>(false);

    const res_array = get_type([]);
    ts_assert<ExactType<JsonTypeEnum.UNDEFINED, typeof res_array>>(false);
    ts_assert<ExactType<JsonTypeEnum.NULL, typeof res_array>>(false);
    ts_assert<ExactType<JsonTypeEnum.BOOLEAN, typeof res_array>>(false);
    ts_assert<ExactType<JsonTypeEnum.NUMBER, typeof res_array>>(false);
    ts_assert<ExactType<JsonTypeEnum.STRING, typeof res_array>>(false);
    ts_assert<ExactType<JsonTypeEnum.ARRAY, typeof res_array>>(true);
    ts_assert<ExactType<JsonTypeEnum.OBJECT, typeof res_array>>(false);

    const res_object = get_type({});
    ts_assert<ExactType<JsonTypeEnum.UNDEFINED, typeof res_object>>(false);
    ts_assert<ExactType<JsonTypeEnum.NULL, typeof res_object>>(false);
    ts_assert<ExactType<JsonTypeEnum.BOOLEAN, typeof res_object>>(false);
    ts_assert<ExactType<JsonTypeEnum.NUMBER, typeof res_object>>(false);
    ts_assert<ExactType<JsonTypeEnum.STRING, typeof res_object>>(false);
    ts_assert<ExactType<JsonTypeEnum.ARRAY, typeof res_object>>(false);
    ts_assert<ExactType<JsonTypeEnum.OBJECT, typeof res_object>>(true);
})
