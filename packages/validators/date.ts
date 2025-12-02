/**
 * Collection of date validation utilities.
 *
 * Each method performs a clear, isolated check:
 * - no type coercion
 * - no side effects
 * - relies on native Date object for validity
 */
export default {
  // ---------------------------------------------------------------------------
  // Basic checks
  // ---------------------------------------------------------------------------

  /**
   * Returns true if the value is an instance of Date.
   */
  date(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime());
  },

  // ---------------------------------------------------------------------------
  // Comparison utilities
  // ---------------------------------------------------------------------------

  /**
   * Returns true if the date is later than the comparison date.
   */
  after(value: Date, comparison: Date): boolean {
    // Compares the numeric timestamp values
    return value.getTime() > comparison.getTime();
  },

  /**
   * Returns true if the date is earlier than the comparison date.
   */
  before(value: Date, comparison: Date): boolean {
    return value.getTime() < comparison.getTime();
  },

  /**
   * Returns true if the date is the same as the comparison date.
   * Compares the numeric timestamp values.
   */
  isSame(value: Date, comparison: Date): boolean {
    return value.getTime() === comparison.getTime();
  },

  /**
   * Returns true if value is in the inclusive range [min, max].
   */
  between(value: Date, min: Date, max: Date): boolean {
    const time = value.getTime();
    const minTime = min.getTime();
    const maxTime = max.getTime();
    return time >= minTime && time <= maxTime;
  },

  // ---------------------------------------------------------------------------
  // Parts and properties
  // ---------------------------------------------------------------------------

  /**
   * Returns true if the date represents a future moment in time.
   */
  future(value: Date): boolean {
    return value.getTime() > Date.now();
  },

  /**
   * Returns true if the date represents a past moment in time.
   */
  past(value: Date): boolean {
    return value.getTime() < Date.now();
  },

  /**
   * Returns true if the date falls on a weekend (Saturday or Sunday, 6 or 0).
   */
  weekend(value: Date): boolean {
    const day = value.getDay();
    return day === 0 || day === 6;
  },

  /**
   * Returns true if the date falls on a weekday (Monday to Friday, 1-5).
   */
  weekday(value: Date): boolean {
    const day = value.getDay();
    return day >= 1 && day <= 5;
  },
};
