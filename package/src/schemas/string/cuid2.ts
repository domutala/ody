import { StringSchema } from "./string";

export class Cuid2Schema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "cuid2",
      type: "validator",
      params: { error: message || "must be a valid cuid2" },
    });
  }
}

export const cuid2Schema = (message?: string) => new Cuid2Schema(message);
