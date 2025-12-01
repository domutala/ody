/**
 * Collection of generic value validation utilities.
 *
 * Each method performs a single, clearly defined check:
 * - no implicit conversions
 * - no side effects
 * - strictly typed logic
 */
export const ValueValidators = {
  // ---------------------------------------------------------------------------
  // Type checks
  // ---------------------------------------------------------------------------

  /**
   * Returns true if the value is explicitly undefined.
   */
  undefined(value: unknown): boolean {
    return value === undefined;
  },

  /**
   * Returns true if the value is explicitly null.
   */
  null(value: unknown): boolean {
    return value === null;
  },

  /**
   * Returns true if the value is either null or undefined.
   */
  nil(value: unknown): boolean {
    return value === null || value === undefined;
  },

  /**
   * Returns true if the value is void (undefined).
   * Alias for undefined(), for semantic clarity.
   */
  void(value: unknown): boolean {
    return value === undefined;
  },

  /**
   * Returns true if the value is strictly unknown.
   * Always returns true because `unknown` can be anything.
   * Provided for API consistency.
   */
  unknown(_: unknown): boolean {
    return true;
  },

  /**
   * Returns true if the value is defined (not undefined).
   */
  defined(value: unknown): boolean {
    return value !== undefined;
  },

  /**
   * Returns true if the value is neither null nor undefined.
   */
  notNil(value: unknown): boolean {
    return value !== null && value !== undefined;
  },

  // ---------------------------------------------------------------------------
  // Empty / falsy checks
  // ---------------------------------------------------------------------------

  /**
   * Returns true if the value is strictly empty:
   * - null, undefined, empty string, or NaN
   */
  empty(value: unknown): boolean {
    return (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value === "") ||
      (typeof value === "number" && Number.isNaN(value))
    );
  },

  /**
   * Returns true if the value is not empty.
   */
  notEmpty(value: unknown): boolean {
    return !ValueValidators.empty(value);
  },

  /**
   * Returns true if the value is falsy.
   * Only considers standard JavaScript falsy values: false, 0, "", null, undefined, NaN
   */
  falsy(value: unknown): boolean {
    return !value;
  },

  /**
   * Returns true if the value is truthy.
   */
  truthy(value: unknown): boolean {
    return !!value;
  },
};
