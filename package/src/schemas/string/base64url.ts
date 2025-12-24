import { StringSchema } from "./string";

export class Base64UrlSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "base64url",
      type: "validator",
      params: { error: message || "must be valid base64url" },
    });
  }
}

export const base64urlSchema = (message?: string) =>
  new Base64UrlSchema(message);
