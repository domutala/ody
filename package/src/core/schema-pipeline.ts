type SchemaPipelineBase = {
  schema: string;
  fn?: <T>(value: T, args?: any) => T | Promise<T>;
};

/**
 * Represents a single rule in the validation/transformation pipeline.
 * Can be a validator (checks value) or transformer (modifies value).
 */
export type SchemaPipeline = SchemaPipelineBase &
  (
    | { type: "validator"; params: { args?: any; error?: string } }
    | { type: "transformer"; params: { args?: any } }
  );
