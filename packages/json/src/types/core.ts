export type IndexNumber = number & { __index__: true };
export type IndexString = string & { __index__: true };
export type FiniteNumber = number & { __finite__: true };

export type JsonPrimitive = null | boolean | number | string;
export type JsonObject = { [prop: string]: Json };
export type JsonArray = Json[];
export type JsonContainer = JsonObject | JsonArray;
export type Json = JsonPrimitive | JsonContainer;

export type Maybe<T> = T | undefined;

export type JsonObjectish = { [prop: string]: MaybeJsonish };
export type JsonArrayish = Jsonish[];
export type JsonContainerish = JsonObjectish | JsonArrayish;
export type Jsonish = MaybeJsonPrimitive | MaybeJsonContainerish;

export type MaybeJsonObjectish = Maybe<JsonObjectish>;
export type MaybeJsonArrayish = Maybe<JsonArrayish>;
export type MaybeJsonContainerish = Maybe<JsonContainerish>;
export type MaybeJsonish = Maybe<Jsonish>;

export type MaybeJsonPrimitive = Maybe<JsonPrimitive>;
export type MaybeJsonObject = Maybe<JsonObject>
export type MaybeJsonArray = Maybe<JsonArray>;
export type MaybeJsonContainer = Maybe<JsonContainer>;
export type MaybeJson = Maybe<Json>;


