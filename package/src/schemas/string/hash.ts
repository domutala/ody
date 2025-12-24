import { StringSchema } from "./string";

export class HashSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "hash",
      type: "validator",
      params: { error: message || "must be a valid hash" },
    });
  }
}

export const hashSchema = (message?: string) => new HashSchema(message);
