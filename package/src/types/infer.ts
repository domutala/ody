import { BaseSchema } from "src/core/base-schema";
import { SchemaState } from "./state";

type WithUndefined<T, S extends SchemaState> = S["optional"] extends true
  ? T | undefined
  : S["nullish"] extends true
  ? T | undefined
  : T;

type WithNull<T, S extends SchemaState> = S["nullable"] extends true
  ? T | null
  : S["nullish"] extends true
  ? T | null
  : T;

type WithDefault<T, S extends SchemaState> = S["hasDefault"] extends true
  ? T | undefined
  : T;

export type InferInput<S> = S extends BaseSchema<infer T, infer State>
  ? WithUndefined<WithNull<WithDefault<T, State>, State>, State>
  : never;

export type InferOutput<S> = S extends BaseSchema<infer T, any> ? T : never;
