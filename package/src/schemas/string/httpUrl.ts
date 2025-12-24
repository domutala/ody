import { StringSchema } from "./string";

export class HttpUrlSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "httpUrl",
      type: "validator",
      params: { error: message || "must be a valid http/https url" },
    });
  }
}

export const httpUrlSchema = (message?: string) => new HttpUrlSchema(message);
