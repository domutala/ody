import { StringSchema } from "./string";

export class Base64Schema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "base64",
      type: "validator",
      params: { error: message || "must be valid base64" },
    });
  }
}

export const base64Schema = (message?: string) => new Base64Schema(message);
