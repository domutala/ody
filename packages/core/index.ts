import validators from "packages/validators";

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
  optional?: boolean;
  nullable?: boolean;
  params: { args?: any; error?: string };
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
export class BaseSchema<T = any> {
  _output: SchemaOutput[];

  constructor(_output: SchemaOutput[]) {
    /**
     * `_output` is an immutable pipeline of rules.
     * Each operation (validator/transformer) is an atomic "node"
     * that executes its behavior independently.
     */
    this._output = _output;
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
  parse(value: T) {
    for (const schema of this._output) {
      // ------------------------------------------------------------
      // VALIDATION BLOCK
      // ------------------------------------------------------------
      if (schema.type === "validator") {
        /**
         * Call the validator from the global registry.
         * Convention: validator strictly returns a boolean.
         */
        let is: boolean = validators[schema.schema](value, schema.params.args);

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

        // Special case: null value is allowed
        if (!accept) {
          if (schema.nullable && value === null) accept = true;
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
            throw schema.params.error;
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

    // Final transformed value
    return value;
  }
}
