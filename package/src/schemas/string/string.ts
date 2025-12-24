import { BaseSchema } from "src/core/";

export class StringSchema<T = string> extends BaseSchema<T> {
  constructor(params?: string) {
    super("string", [
      {
        schema: "string",
        type: "validator",
        params: { error: params || "must be a string" },
      },
    ]);
  }

  // ---------------------------------------------------------------------------
  // VALIDATIONS — Rules that do not modify the value.
  // Each validator stores its parameters in `params.args`
  // and an optional error message in `params.error`.
  // ---------------------------------------------------------------------------

  /**
   * Checks if the string includes a given substring.
   */

  includes(value: string, params?: string) {
    this._pipeline.push({
      schema: "includes",
      type: "validator",
      params: { args: value, error: params },
    });
    return this;
  }

  /**
   * Checks that the string starts with a given value.
   */

  startsWith(value: string, params?: string) {
    this._pipeline.push({
      schema: "startsWith",
      type: "validator",
      params: { args: value, error: params },
    });
    return this;
  }

  /**
   * Checks that the string ends with a given value.
   */
  endsWith(value: string, params?: string) {
    this._pipeline.push({
      schema: "endsWith",
      type: "validator",
      params: { args: value, error: params },
    });
    return this;
  }

  /**
   * Checks minimum string length.
   */

  min(minLength: number, params?: string) {
    this._pipeline.push({
      schema: "min",
      type: "validator",
      params: {
        args: minLength,
        error: params || `must have a minimum length of ${minLength}`,
      },
    });
    return this;
  }

  /**
   * Checks maximum string length.
   */
  max(maxLength: number, params?: string) {
    this._pipeline.push({
      schema: "max",
      type: "validator",
      params: {
        args: maxLength,
        error: params || `must have a maximum length of ${maxLength}`,
      },
    });
    return this;
  }

  /**
   * Checks exact string length.
   */
  length(len: number, params?: string) {
    this._pipeline.push({
      schema: "length",
      type: "validator",
      params: { args: len, error: params },
    });
    return this;
  }

  /**
   * Ensures the string is not empty.
   * Different from `min(1)` because it allows a dedicated error message.
   */
  nonempty(params?: string) {
    this._pipeline.push({
      schema: "nonempty",
      type: "validator",
      params: { error: params },
    });
    return this;
  }

  /**
   * Checks that the value is lowercase.
   */
  lowercase(params?: string) {
    this._pipeline.push({
      schema: "lowercase",
      type: "validator",
      params: { error: params },
    });
    return this;
  }

  /**
   * Checks that the value is uppercase.
   */
  uppercase(params?: string) {
    this._pipeline.push({
      schema: "uppercase",
      type: "validator",
      params: { error: params },
    });
    return this;
  }

  // ---------------------------------------------------------------------------
  // TRANSFORMATIONS — Rules that modify the input value.
  // Applied BEFORE validations in parse().
  // ---------------------------------------------------------------------------

  /**
   * Trims whitespace from both ends of the string.
   */
  trim() {
    this._pipeline.push({
      schema: "trim",
      type: "transformer",
      params: {},
    });

    return this;
  }

  /**
   * Unicode normalization (default NFC).
   *
   * Ensures consistent comparisons across inputs
   * from different sources or encodings.
   */
  normalize(form: "NFC" | "NFD" | "NFKC" | "NFKD" | (string & {}) = "NFC") {
    this._pipeline.push({
      schema: "normalize",
      type: "transformer",
      params: { args: form },
    });
    return this;
  }

  /**
   * Transforms the string to lowercase.
   * Unlike `lowercase()`, this actively modifies the value.
   */
  toLowerCase() {
    this._pipeline.push({
      schema: "toLowerCase",
      type: "transformer",
      params: {},
    });
    return this;
  }

  /**
   * Transforms the string to uppercase.
   */
  toUpperCase() {
    this._pipeline.push({
      schema: "toUpperCase",
      type: "transformer",
      params: {},
    });
    return this;
  }
}

export function stringSchema(params?: string): StringSchema {
  return new StringSchema(params);
}
