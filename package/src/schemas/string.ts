import { BaseSchema } from "src/core";

/**
 * Public contract for StringSchema.
 *
 * Extends BaseSchema<string> to inherit:
 * - internal `_output` pipeline
 * - `parse()` method (inherited from BaseSchema)
 *
 * Each method returns `this` to allow fluent API chaining,
 * which is common in validation libraries.
 */
interface _StringSchema extends BaseSchema<string> {
  // ---------------------------------------------------------------------------
  // VALIDATIONS — Rules that do not modify the value.
  // Each validator stores its parameters in `params.args`
  // and an optional error message in `params.error`.
  // ---------------------------------------------------------------------------

  /**
   * Checks if the value satisfies a RegExp.
   * This validator does not transform the value.
   */

  regex(regex: RegExp, params?: string): this;

  /**
   * Checks if the string includes a given substring.
   */

  includes(value: string, params?: string): this;

  /**
   * Checks that the string starts with a given value.
   */
  startsWith(value: string, params?: string): this;

  /**
   * Checks that the string ends with a given value.
   */
  endsWith(value: string, params?: string): this;

  /**
   * Checks minimum string length.
   */
  min(minLength: number, params?: string): this;

  /**
   * Checks maximum string length.
   */
  max(maxLength: number, params?: string): this;

  /**
   * Checks exact string length.
   */
  length(len: number, params?: string): this;

  /**
   * Ensures the string is not empty.
   * Different from `min(1)` because it allows a dedicated error message.
   */
  nonempty(params?: string): this;

  /**
   * Checks that the value is lowercase.
   */
  lowercase(params?: string): this;

  /**
   * Checks that the value is uppercase.
   */
  uppercase(params?: string): this;

  // ---------------------------------------------------------------------------
  // TRANSFORMATIONS — Rules that modify the input value.
  // Applied BEFORE validations in parse().
  // ---------------------------------------------------------------------------

  /**
   * Trims whitespace from both ends of the string.
   */
  trim(): this;

  /**
   * Unicode normalization (default NFC).
   *
   * Ensures consistent comparisons across inputs
   * from different sources or encodings.
   */
  normalize(form?: "NFC" | "NFD" | "NFKC" | "NFKD" | (string & {})): this;

  /**
   * Transforms the string to lowercase.
   * Unlike `lowercase()`, this actively modifies the value.
   */
  toLowerCase(): this;

  /**
   * Transforms the string to uppercase.
   */
  toUpperCase(): this;
}

/**
 * Internal implementation of string schema.
 *
 * Primary goal: build a pipeline (`_output`) composed of two categories:
 *
 * 1. Validators → "type: validator"
 *    These rules do not alter the value but enforce constraints.
 *
 * 2. Transformers → "type: transformer"
 *    These rules modify the input value before final validation.
 *
 * The inherited `parse()` method should:
 * - execute transformers in registration order
 * - execute validators afterward
 * - throw an error if a rule fails
 *
 * This design allows:
 * - easy extension with custom rules
 * - deterministic execution
 * - clear debugging and readable error reporting
 */
export class StringSchema extends BaseSchema<string> implements _StringSchema {
  constructor() {
    /**
     * Initialize the pipeline with a validator that ensures
     * the value is a string.
     *
     * This is essential as a type guard, preventing undefined
     * behavior later in the pipeline.
     */
    super([{ schema: "string", type: "validator", params: {} }]);
  }

  regex(regex: RegExp, params?: string) {
    this._output.push({
      schema: "regex",
      type: "validator",
      params: { args: regex, error: params },
    });
    return this;
  }

  includes(value: string, params?: string) {
    this._output.push({
      schema: "includes",
      type: "validator",
      params: { args: value, error: params },
    });
    return this;
  }

  startsWith(value: string, params?: string) {
    this._output.push({
      schema: "startsWith",
      type: "validator",
      params: { args: value, error: params },
    });
    return this;
  }

  endsWith(value: string, params?: string) {
    this._output.push({
      schema: "endsWith",
      type: "validator",
      params: { args: value, error: params },
    });
    return this;
  }

  min(minLength: number, params?: string) {
    this._output.push({
      schema: "min",
      type: "validator",
      params: { args: minLength, error: params },
    });
    return this;
  }

  max(maxLength: number, params?: string) {
    this._output.push({
      schema: "max",
      type: "validator",
      params: { args: maxLength, error: params },
    });
    return this;
  }

  length(len: number, params?: string) {
    this._output.push({
      schema: "length",
      type: "validator",
      params: { args: len, error: params },
    });
    return this;
  }

  nonempty(params?: string) {
    this._output.push({
      schema: "nonempty",
      type: "validator",
      params: { error: params },
    });
    return this;
  }

  lowercase(params?: string) {
    this._output.push({
      schema: "lowercase",
      type: "validator",
      params: { error: params },
    });
    return this;
  }

  uppercase(params?: string) {
    this._output.push({
      schema: "uppercase",
      type: "validator",
      params: { error: params },
    });
    return this;
  }

  trim() {
    this._output.push({ schema: "trim", type: "transformer", params: {} });
    return this;
  }

  normalize(form: "NFC" | "NFD" | "NFKC" | "NFKD" | (string & {}) = "NFC") {
    this._output.push({
      schema: "normalize",
      type: "transformer",
      params: { args: form },
    });
    return this;
  }

  toLowerCase() {
    this._output.push({
      schema: "toLowerCase",
      type: "transformer",
      params: {},
    });
    return this;
  }

  toUpperCase() {
    this._output.push({
      schema: "toUpperCase",
      type: "transformer",
      params: {},
    });
    return this;
  }
}
