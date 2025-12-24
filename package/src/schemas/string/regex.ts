import { StringSchema } from "./string";

export class RegexSchema<T = string> extends StringSchema<T> {
  constructor(pattern: RegExp, params?: string) {
    super();

    this._pipeline.push({
      schema: "regex",
      type: "validator",
      params: {
        args: pattern,
        error: params || `must match pattern ${pattern}`,
      },
    });
  }
}

export function regexSchema(pattern: RegExp, params?: string): RegexSchema {
  return new RegexSchema(pattern, params);
}
