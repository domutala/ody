import { StringSchema } from "./string";

export class IsoTimeSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "isoTime",
      type: "validator",
      params: { error: message || "must be a valid ISO time" },
    });
  }
}

export const isoTimeSchema = (message?: string) => new IsoTimeSchema(message);
