/**
 * Collection of string validation utilities.
 *
 * Each validator performs a clear, isolated check:
 * - no type coercion
 * - no side effects
 * - strictly pattern-based or parser-based validation
 */
export default {
  // ---------------------------------------------------------------------------
  // Basic checks
  // ---------------------------------------------------------------------------

  /**
   * Returns true if the value is a string (no casting).
   */
  string(value: unknown): value is string {
    return typeof value === "string";
  },

  /**
   * Returns true if the string contains only whitespace.
   */
  whitespace(value: string): boolean {
    return typeof value === "string" && value.trim().length === 0;
  },

  trim(value: string): string {
    return value.trim();
  },

  // ---------------------------------------------------------------------------
  // Email / Identifiers / Tokens
  // ---------------------------------------------------------------------------

  /**
   * RFC-like email validation (sufficient for most production cases).
   */
  email(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },

  /**
   * Validates UUID v1–v5.
   */
  uuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    );
  },

  /**
   * Structural validation for JWT: header.payload.signature.
   */
  jwt(value: string): boolean {
    return /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/.test(value);
  },

  /**
   * Valid NanoID (default 21-character alphabet).
   */
  nanoid(value: string): boolean {
    return /^[A-Za-z0-9_\-]{21}$/.test(value);
  },

  /**
   * Validates classic CUID.
   */
  cuid(value: string): boolean {
    return /^c[0-9a-z]{24}$/.test(value);
  },

  /**
   * Validates CUID2 identifiers.
   */
  cuid2(value: string): boolean {
    return /^[a-z0-9]{24}$/i.test(value);
  },

  /**
   * Validates ULID (Crockford Base-32).
   */
  ulid(value: string): boolean {
    return /^[0-9A-HJKMNP-TV-Z]{26}$/.test(value);
  },

  // ---------------------------------------------------------------------------
  // URLs / Hostnames / Network Strings
  // ---------------------------------------------------------------------------

  /**
   * Accepts any valid URL (any protocol).
   */
  url(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Accepts only HTTP or HTTPS URLs.
   */
  httpUrl(value: string): boolean {
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  },

  /**
   * Valid hostname (RFC 1035/1123-like definition).
   */
  hostname(value: string): boolean {
    return /^(?=.{1,253}$)(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})*$/i.test(
      value
    );
  },

  /**
   * Valid IPv4 address (0–255 for each octet).
   */
  ipv4(value: string): boolean {
    return /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/.test(
      value
    );
  },

  /**
   * Valid IPv6 address (leverages URL parsing for reliability).
   */
  ipv6(value: string): boolean {
    try {
      return (
        value.includes(":") &&
        new URL(`http://[${value}]`).hostname.toLowerCase() ===
          value.toLowerCase()
      );
    } catch {
      return false;
    }
  },

  /**
   * Valid MAC address (colon or hyphen separated).
   */
  mac(value: string): boolean {
    return /^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/.test(value);
  },

  /**
   * IPv4 CIDR block (e.g. 192.168.0.1/24).
   */
  cidrv4(value: string): boolean {
    return /^(\d{1,3}\.){3}\d{1,3}\/(3[0-2]|[12][0-9]|[0-9])$/.test(value);
  },

  /**
   * IPv6 CIDR block.
   */
  cidrv6(value: string): boolean {
    return /^[0-9a-f:]+\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/i.test(value);
  },

  // ---------------------------------------------------------------------------
  // Encodings
  // ---------------------------------------------------------------------------

  /**
   * Valid Base64 (classic).
   */
  base64(value: string): boolean {
    return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(
      value
    );
  },

  /**
   * Valid Base64URL.
   */
  base64url(value: string): boolean {
    return /^[A-Za-z0-9\-_]+={0,2}$/.test(value);
  },

  /**
   * Valid hex string.
   */
  hex(value: string): boolean {
    return /^[0-9a-fA-F]+$/.test(value);
  },

  /**
   * Checks whether the string matches a hash format for the given algorithm.
   */
  hash(
    value: string,
    algo: "sha1" | "sha256" | "sha384" | "sha512" | "md5"
  ): boolean {
    const lengths = {
      sha1: 40,
      sha256: 64,
      sha384: 96,
      sha512: 128,
      md5: 32,
    };
    return new RegExp(`^[a-fA-F0-9]{${lengths[algo]}}$`).test(value);
  },

  // ---------------------------------------------------------------------------
  // Emojis
  // ---------------------------------------------------------------------------

  /**
   * Matches a single Unicode emoji.
   * (Using \p{Emoji} for Unicode-level accuracy)
   */
  emoji(value: string): boolean {
    return /^\p{Emoji}$/u.test(value);
  },

  // ---------------------------------------------------------------------------
  // ISO 8601 (dates, times, durations)
  // ---------------------------------------------------------------------------

  /**
   * ISO date (YYYY-MM-DD).
   */
  isoDate(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  },

  /**
   * ISO time (HH:mm:ss(.sss)?).
   */
  isoTime(value: string): boolean {
    return /^\d{2}:\d{2}:\d{2}(?:\.\d+)?$/.test(value);
  },

  /**
   * ISO datetime with Z or offset.
   */
  isoDatetime(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(
      value
    );
  },

  /**
   * ISO 8601 duration (PnYnMnDTnHnMnS).
   */
  isoDuration(value: string): boolean {
    return /^P(?!$)(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$/.test(value);
  },

  /**
   * Returns true if the string's length is less than or equal to max.
   */
  max(value: unknown, max: number): boolean {
    return typeof value === "string" && value.length <= max;
  },

  /**
   * Returns true if the string's length is greater than or equal to min.
   */
  min(value: unknown, min: number): boolean {
    return typeof value === "string" && value.length >= min;
  },

  /**
   * Returns true if the string's length is exactly the specified length.
   */
  length(value: unknown, exact: number): boolean {
    return typeof value === "string" && value.length === exact;
  },

  /**
   * Returns true if the string matches the given regular expression.
   */
  regex(value: unknown, regex: RegExp): boolean {
    return typeof value === "string" && regex.test(value);
  },

  /**
   * Returns true if the string includes the specified substring.
   */
  includes(value: unknown, substring: string): boolean {
    return typeof value === "string" && value.includes(substring);
  },

  /**
   * Returns true if the string starts with the specified prefix.
   */
  startsWith(value: unknown, prefix: string): boolean {
    return typeof value === "string" && value.startsWith(prefix);
  },

  /**
   * Returns true if the string ends with the specified suffix.
   */
  endsWith(value: unknown, suffix: string): boolean {
    return typeof value === "string" && value.endsWith(suffix);
  },

  toLowerCase(value: string) {
    return value.toLowerCase();
  },

  toUpperCase(value: string) {
    return value.toUpperCase();
  },

  normalize(
    value: string,
    form: "NFC" | "NFD" | "NFKC" | "NFKD" | (string & {}) = "NFC"
  ) {
    return value.normalize(form);
  },
};
