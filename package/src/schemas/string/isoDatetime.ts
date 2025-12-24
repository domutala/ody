import { StringSchema } from "./string";

export class IsoDatetimeSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "isoDatetime",
      type: "validator",
      params: { error: message || "must be a valid ISO datetime" },
    });
  }
}

export const isoDatetimeSchema = (message?: string) =>
  new IsoDatetimeSchema(message);
