import validators from "src/validators";

import { SchemaPipeline } from "./schema-pipeline";
import {
  DefaultState,
  SchemaState,
  SetArray,
  SetDefault,
  SetNullable,
  SetNullish,
  SetOptional,
} from "src/types/state";

import * as unionSchema from "src/schemas/union";
import * as enumSchema from "src/schemas/enum";

unionSchema._validator(validators);
enumSchema._validator(validators);

/**
 * Base class for schemas.
 * Manages the rule pipeline and provides parse methods.
 */
export class BaseSchema<T, S extends SchemaState = DefaultState> {
  protected _optional?: boolean;
  protected _nullable?: boolean;
  protected _nullish?: boolean;
  protected _array: boolean = false;
  protected _default?: T = undefined;

  protected _name: string;
  protected _pipeline: SchemaPipeline[];

  constructor(name: string, basePipeline: SchemaPipeline[]) {
    this._name = name;
    this._pipeline = basePipeline;
  }

  optional(): BaseSchema<T | undefined, SetOptional<S>> {
    this._optional = true;
    return this as any;
  }

  nullable(): BaseSchema<T | null, SetNullable<S>> {
    this._nullable = true;
    return this as any;
  }

  nullish(): BaseSchema<T | null | undefined, SetNullish<S>> {
    this._nullish = true;
    return this as any;
  }

  array(): BaseSchema<T[], SetArray<S>> {
    this._array = true;
    return this as any;
  }

  default(value: T): BaseSchema<T, SetDefault<S>> {
    this._default = value;
    return this as any;
  }

  transform<U>(fn: (value: T) => U): BaseSchema<U, S> {
    this._pipeline.push({
      schema: "transformer",
      type: "transformer",
      async fn(value, fn: (value: any) => any | Promise<any>) {
        return await fn(value);
      },
      params: { args: fn },
    });

    return this as any;
  }

  /**
   * Validates and transforms a value according to the pipeline.
   * Throws on validation errors.
   */
  async parse(value?: unknown): Promise<T> {
    if (typeof value === "undefined") value = this._default;

    if (this._nullish) {
      if (typeof value === "undefined" || value === null) value = this._default;
    }

    if (this._array && !Array.isArray(value)) {
      throw "must be array";
    }

    const values = Array.isArray(value) ? value : [value];

    for (let i = 0; i < values.length; i++) {
      let value = values[i];

      for (const schema of this._pipeline) {
        if (schema.fn) {
          value = await schema.fn(value, schema.params.args);
        } else if (schema.type === "validator") {
          let isValid = await validators[schema.schema](
            value,
            schema.params.args
          );
          let accept = isValid;

          if (schema.schema === this._name) {
            if (!accept) {
              if (
                (this._optional || this._nullish) &&
                typeof value === "undefined"
              ) {
                accept = true;
              }

              if ((this._nullable || this._nullish) && value === null) {
                accept = true;
              }
            }
          }

          if (!isValid && !accept) throw schema.params.error || schema.schema;
        } else {
          // Transformer modifies the value
          value = await validators[schema.schema](value, schema.params.args);
        }
      }

      values[i] = value;
    }

    return (this._array ? values : values[0]) as T;
  }

  /**
   * Validates a value and returns result object.
   * Does not throw on error.
   */
  async safeParse(value?: unknown): Promise<{ error?: string; value: T }> {
    try {
      return { value: await this.parse(value) };
    } catch (error) {
      return { error: error as string, value: value as T };
    }
  }
}
