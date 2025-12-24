import { StringSchema } from "./string";

export class UlidSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "ulid",
      type: "validator",
      params: { error: message || "must be a valid ulid" },
    });
  }
}

export const ulidSchema = (message?: string) => new UlidSchema(message);
