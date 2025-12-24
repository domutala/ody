import { StringSchema } from "./string";

export class UuidSchema<T = string> extends StringSchema<T> {
  constructor(params?: string) {
    super();

    this._pipeline.push({
      schema: "uuid",
      type: "validator",
      params: { error: params || "must be a uuid" },
    });
  }
}

export function uuidSchema(params?: string): UuidSchema {
  return new UuidSchema(params);
}
