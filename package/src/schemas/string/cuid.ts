import { StringSchema } from "./string";

export class CuidSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "cuid",
      type: "validator",
      params: { error: message || "must be a valid cuid" },
    });
  }
}

export const cuidSchema = (message?: string) => new CuidSchema(message);
