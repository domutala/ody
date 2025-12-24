import validators from "src/validators";

type SchemaOutputBase = {
  schema: string;
  fn?: <T>(value: T, args?: any) => T | Promise<T>;
};

/**
 * Represents a single rule in the validation/transformation pipeline.
 * Can be a validator (checks value) or transformer (modifies value).
 */
export type SchemaOutput = SchemaOutputBase &
  (
    | { type: "validator"; params: { args?: any; error?: string } }
    | { type: "transformer"; params: { args?: any } }
  );

/**
 * Base interface for all schemas.
 * Provides parsing, validation, transformation, and common helpers.
 */
export interface _Basechema<T> {
  parse(value: any): Promise<T>;
  safeParse(value: any): Promise<{ error?: string; value: T }>;
  default(value: any): this;
  optional(): this;
  nullable(): this;
  nullish(): this;
  array(): this;
  transform(fn: (value: T) => T): this;
}

/**
 * Base class for schemas.
 * Manages the rule pipeline and provides parse methods.
 */
export class BaseSchema<T = any> implements _Basechema<T> {
  private _optional?: boolean;
  private _nullable?: boolean;
  private _nullish?: boolean;
  private _array: boolean;
  private _default: T;

  private _name: string;
  _output: SchemaOutput[];

  constructor(_name: string, _output: SchemaOutput[]) {
    this._name = _name;
    this._output = _output; // Pipeline of validators/transformers
  }

  /** Marks value as optional. */
  optional() {
    this._optional = true;
    return this;
  }

  /** Sets a default value. */
  default(value: any) {
    this._default = value;
    return this;
  }

  /** Allows null values. */
  nullable() {
    this._nullable = true;
    return this;
  }

  /** Allows null or undefined values. */
  nullish() {
    this._nullish = true;
    return this;
  }

  /** Marks value as an array of T. */
  array() {
    this._array = true;
    return this;
  }

  transform(fn: (value: T) => T) {
    this._output.push({
      schema: "transformer",
      type: "transformer",
      async fn(value, fn: (value: any) => any | Promise<any>) {
        return await fn(value);
      },
      params: { args: fn },
    });

    return this;
  }

  /**
   * Validates and transforms a value according to the pipeline.
   * Throws on validation errors.
   */
  async parse(value?: any) {
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

      for (const schema of this._output) {
        if (schema.fn) {
          value = await schema.fn(value, schema.params.args);
        } else if (schema.type === "validator") {
          let isValid = validators[schema.schema](value, schema.params.args);
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

    return value;
  }

  /**
   * Validates a value and returns result object.
   * Does not throw on error.
   */
  async safeParse(value?: any) {
    try {
      return { value: await this.parse(value) };
    } catch (error) {
      return { error, value };
    }
  }
}
