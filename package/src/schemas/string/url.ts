import { StringSchema } from "./string";

export class UrlSchema<T = string> extends StringSchema<T> {
  constructor(params?: string) {
    super();

    this._pipeline.push({
      schema: "url",
      type: "validator",
      params: { error: params || "must be a url" },
    });
  }
}

export function urlSchema(params?: string): UrlSchema {
  return new UrlSchema(params);
}
