export type JsonPrimitive = null | boolean | number | string;
export type JsonObject = { [prop: string]: Json };
export type JsonArray = Json[];
export type JsonContainer = JsonObject | JsonArray;
export type Json = JsonPrimitive | JsonContainer;

export type MaybeJsonPrimitive = JsonPrimitive | undefined;
export type MaybeJsonObject = JsonObject | undefined;
export type MaybeJsonArray = JsonArray | undefined;
export type MaybeJsonContainer = JsonContainer | undefined;
export type MaybeJson = Json | undefined;

export type DeepMaybeJsonPrimitive = MaybeJsonPrimitive;
export type DeepMaybeJsonObject = { [prop: string]: DeepMaybeJson } | undefined;
export type DeepMaybeJsonArray = DeepMaybeJson[] | undefined;
export type DeepMaybeJsonContainer = DeepMaybeJsonObject | DeepMaybeJsonArray | undefined;
export type DeepMaybeJson = DeepMaybeJsonPrimitive | DeepMaybeJsonContainer | undefined;
