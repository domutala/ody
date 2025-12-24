import { StringSchema } from "./string";

export class IsoDurationSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "isoDuration",
      type: "validator",
      params: { error: message || "must be a valid ISO duration" },
    });
  }
}

export const isoDurationSchema = (message?: string) =>
  new IsoDurationSchema(message);
