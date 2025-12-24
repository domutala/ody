import { StringSchema } from "./string";

export class MacSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "mac",
      type: "validator",
      params: { error: message || "must be a valid MAC address" },
    });
  }
}

export const macSchema = (message?: string) => new MacSchema(message);
