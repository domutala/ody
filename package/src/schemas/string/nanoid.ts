import { StringSchema } from "./string";

export class NanoIdSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "nanoid",
      type: "validator",
      params: { error: message || "must be a valid nanoid" },
    });
  }
}

export const nanoidSchema = (message?: string) => new NanoIdSchema(message);
