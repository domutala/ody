/**
 * Collection of boolean validation utilities.
 *
 * Each method performs a single, clearly defined check:
 * - no implicit conversions
 * - no side effects
 * - strictly typed logic
 */
export default {
  // ---------------------------------------------------------------------------
  // Basic type checks
  // ---------------------------------------------------------------------------

  /**
   * Returns true if the value is strictly a boolean.
   */
  boolean(value: unknown): value is boolean {
    return typeof value === "boolean";
  },

  /**
   * Returns true if the value is explicitly true.
   */
  isTrue(value: unknown): value is true {
    return value === true;
  },

  /**
   * Returns true if the value is explicitly false.
   */
  isFalse(value: unknown): value is false {
    return value === false;
  },

  /**
   * Returns true if the value is a string representing a boolean.
   * Accepts only "true" or "false" (case-sensitive).
   */
  stringBool(value: unknown): boolean {
    return value === "true" || value === "false";
  },
};
