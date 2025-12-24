import { StringSchema } from "./string";

export class Ipv4Schema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "ipv4",
      type: "validator",
      params: { error: message || "must be a valid IPv4 address" },
    });
  }
}

export const ipv4Schema = (message?: string) => new Ipv4Schema(message);
