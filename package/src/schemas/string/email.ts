import { StringSchema } from "./string";

export class EmailSchema<T = string> extends StringSchema<T> {
  constructor(params?: string) {
    super();

    this._pipeline.push({
      schema: "email",
      type: "validator",
      params: { error: params || "must be a email" },
    });
  }
}

export function emailSchema(params?: string): EmailSchema {
  return new EmailSchema(params);
}
