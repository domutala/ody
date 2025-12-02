/**
 * Collection of numeric validation utilities.
 *
 * Each method performs a single, clearly defined check:
 * - no implicit conversions
 * - no side effects
 * - strictly typed logic
 *
 * Designed for framework-level usage: predictable, consistent and safe.
 */
export default {
  // ---------------------------------------------------------------------------
  // Basic type checks
  // ---------------------------------------------------------------------------

  /**
   * Returns true if the value is a finite JavaScript number.
   */
  number(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value);
  },

  /**
   * Returns true if the value is an integer.
   */
  int(value: unknown): value is number {
    return typeof value === "number" && Number.isInteger(value);
  },

  /**
   * Returns true if the value is a non-integer finite number.
   */
  float(value: unknown): value is number {
    return (
      typeof value === "number" &&
      Number.isFinite(value) &&
      !Number.isInteger(value)
    );
  },

  /**
   * Returns true if the value is a safe integer (IEEE 754).
   */
  safeInteger(value: unknown): value is number {
    return typeof value === "number" && Number.isSafeInteger(value);
  },

  /**
   * Returns true if the number is a valid 32-bit signed integer.
   */
  int32(value: unknown): value is number {
    return (
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= -2147483648 &&
      value <= 2147483647
    );
  },

  /**
   * Returns true if the value is a finite number (Number.isFinite wrapper).
   */
  finite(value: unknown): boolean {
    return typeof value === "number" && Number.isFinite(value);
  },

  /**
   * Returns true if the value is +Infinity or -Infinity.
   */
  infinite(value: unknown): boolean {
    return value === Infinity || value === -Infinity;
  },

  /**
   * Returns true if the number is a valid non-integer safe float.
   * Useful for frameworks needing numeric safety guarantees.
   */
  safeFloat(value: unknown): value is number {
    return (
      typeof value === "number" &&
      Number.isFinite(value) &&
      !Number.isInteger(value) &&
      Math.abs(value) <= Number.MAX_SAFE_INTEGER
    );
  },

  // ---------------------------------------------------------------------------
  // Unsigned integer checks
  // ---------------------------------------------------------------------------

  /**
   * Returns true if the number is an unsigned integer (>= 0).
   */
  uint(value: unknown): value is number {
    return typeof value === "number" && Number.isInteger(value) && value >= 0;
  },

  /**
   * Returns true if the number is a valid unsigned 32-bit integer.
   */
  uint32(value: unknown): value is number {
    return (
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 4294967295
    );
  },

  /**
   * Returns true if the number is a valid unsigned 16-bit integer.
   */
  uint16(value: unknown): value is number {
    return (
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 65535
    );
  },

  /**
   * Returns true if the number is a valid unsigned 8-bit integer.
   */
  uint8(value: unknown): value is number {
    return (
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 255
    );
  },

  // ---------------------------------------------------------------------------
  // BigInt checks
  // ---------------------------------------------------------------------------

  bigint(value: unknown): value is bigint {
    return typeof value === "bigint";
  },

  bigintPositive(value: unknown): boolean {
    return typeof value === "bigint" && value > 0n;
  },

  bigintNegative(value: unknown): boolean {
    return typeof value === "bigint" && value < 0n;
  },

  bigintMultipleOf(value: unknown, factor: bigint): boolean {
    return typeof value === "bigint" && factor !== 0n && value % factor === 0n;
  },

  // ---------------------------------------------------------------------------
  // Comparison utilities
  // ---------------------------------------------------------------------------

  gt(value: number, threshold: number): boolean {
    return value > threshold;
  },

  gte(value: number, threshold: number): boolean {
    return value >= threshold;
  },

  lt(value: number, threshold: number): boolean {
    return value < threshold;
  },

  lte(value: number, threshold: number): boolean {
    return value <= threshold;
  },

  /**
   * Returns true if value is in the inclusive range [min, max].
   */
  between(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  },

  // ---------------------------------------------------------------------------
  // Sign checks
  // ---------------------------------------------------------------------------

  positive(value: number): boolean {
    return value > 0;
  },

  nonnegative(value: number): boolean {
    return value >= 0;
  },

  negative(value: number): boolean {
    return value < 0;
  },

  nonpositive(value: number): boolean {
    return value <= 0;
  },

  nonZero(value: number): boolean {
    return value !== 0;
  },

  // ---------------------------------------------------------------------------
  // Arithmetic checks
  // ---------------------------------------------------------------------------

  multipleOf(value: number, factor: number): boolean {
    return factor !== 0 && value % factor === 0;
  },

  /**
   * Returns true if value is a valid percentage (0–100 inclusive).
   */
  percentage(value: number): boolean {
    return typeof value === "number" && value >= 0 && value <= 100;
  },

  // ---------------------------------------------------------------------------
  // Utility
  // ---------------------------------------------------------------------------

  /**
   * Clamps a number inside the inclusive range [min, max].
   * Does not validate input type by design; use number() first if needed.
   */
  clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  },
};
