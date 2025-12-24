import { StringSchema } from "./string";

export class IsoDateSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "isoDate",
      type: "validator",
      params: { error: message || "must be a valid ISO date" },
    });
  }
}

export const isoDateSchema = (message?: string) => new IsoDateSchema(message);
