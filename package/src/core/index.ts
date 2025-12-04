import validators from "src/validators";

/**
 * Represents a single unit of work in the internal pipeline.
 *
 * Each node corresponds to either:
 *  - a validator  (never modifies the value)
 *  - a transformer (modifies the value before subsequent validations)
 *
 * The pipeline is strictly sequential and deterministic.
 *
 * Fields:
 * - schema: internal identifier of the validator/transformer (key in the registry)
 * - type: routes the rule to the proper engine (validator vs transformer)
 * - optional / nullable: flags to handle permissiveness (not fully used yet)
 * - params: arguments passed to the validator + optional error message
 */
export interface SchemaOutput {
  schema: string;
  type: "validator" | "transformer";

  params: { args?: any; error?: string };
}

/**
 * Base type for all schemas.
 * Provides validation, transformation, and common helpers.
 */
export interface _Basechema<T> {
  /**
   * Validates and transforms the value.
   */
  parse(value: any): T;

  /**
   * Validates without throwing an error.
   */
  safeParse(value: any): { error?: any; value: T };

  /**
   * Sets a default value.
   */
  default(value: any): this;

  /**
   * Marks the value as optional.
   */
  optional(): this;

  /**
   * Allows `null`.
   */
  nullable(): this;

  /**
   * Allows `null` or `undefined`.
   */
  nullish(): this;

  /**
   * Requires the value to be an array.
   */
  array(): this;
}

/**
 * Base class for all schemas.
 *
 * Central responsibilities:
 * - manage the `_output` pipeline
 * - provide the `parse()` method that executes validators & transformers in order
 * - provide common infrastructure for building strongly-typed schemas
 *
 * The goal is to provide a minimal and extensible foundation
 * that specialized types (StringSchema, NumberSchema, ObjectSchema, etc.)
 * can build upon.
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

    /**
     * `_output` is an immutable pipeline of rules.
     * Each operation (validator/transformer) is an atomic "node"
     * that executes its behavior independently.
     */
    this._output = _output;
  }

  optional() {
    this._optional = true;
    return this;
  }

  default(value: any) {
    this._default = value;
    return this;
  }

  nullable() {
    this._nullable = true;
    return this;
  }

  nullish() {
    this._nullish = true;
    return this;
  }

  undefinedable() {
    return this;
  }

  array() {
    this._array = true;
    return this;
  }

  /**
   * Central execution function of the schema.
   *
   * Execution pipeline:
   * 1. Iterate sequentially over `_output`.
   * 2. If the node is a validator:
   *      - call validators[schemaName](value, args)
   *      - handle nullable (value is null but allowed)
   *      - if validation fails → throw params.error
   * 3. If the node is a transformer:
   *      - replace the value with the transformed result
   * 4. Return the final transformed value
   *
   * This model is intentionally low-level to allow:
   *  - strict control over execution order
   *  - clear separation of validation vs transformation
   *  - easy extensibility (lazy schemas, async rules, unions, refinements)
   */
  parse(value?: any) {
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
        // ------------------------------------------------------------
        // VALIDATION BLOCK
        // ------------------------------------------------------------
        if (schema.type === "validator") {
          const error = schema.schema;

          /**
           * Call the validator from the global registry.
           * Convention: validator strictly returns a boolean.
           */

          let is: boolean = validators[schema.schema](
            value,
            schema.params.args
          );

          /**
           * `accept` allows integrating extra rules like `nullable`
           * without breaking the main logic.
           *
           * This keeps the system extensible for future additions:
           *   - optional()
           *   - refine()
           *   - superRefine()
           */
          let accept = is;

          if (schema.schema === this._name) {
            if (!accept) {
              if (
                (this._optional || this._nullish) &&
                typeof value === "undefined"
              ) {
                accept = true;
              }
            }

            if (!accept) {
              if ((this._nullable || this._nullish) && value === null) {
                accept = true;
              }
            }
          }

          /**
           * If the validator returns false AND the rule is not "accepted"
           * → throw an error.
           *
           * Note: error is a raw string intentionally, allowing higher-level
           * parsers or formatters to wrap it in rich objects if needed.
           */
          if (!is) {
            if (!accept) {
              throw schema.params.error || error;
            }

            // If the rule fails but is accepted → stop pipeline here.
            // This allows advanced behaviors like "nullable" handling.
            break;
          }
        }

        // ------------------------------------------------------------
        // TRANSFORMATION BLOCK
        // ------------------------------------------------------------
        else {
          /**
           * Transformers modify the value and reinject it into the pipeline.
           *
           * Examples: trim(), toLowerCase(), normalize(), etc.
           */
          value = validators[schema.schema](value, schema.params.args);
        }
      }

      values[i] = value;
    }

    // Final transformed value
    return value;
  }

  safeParse(value?: any) {
    try {
      this.parse(value);
      return { value };
    } catch (error) {
      return { error, value };
    }
  }
}
