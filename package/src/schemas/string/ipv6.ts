import { StringSchema } from "./string";

export class Ipv6Schema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "ipv6",
      type: "validator",
      params: { error: message || "must be a valid IPv6 address" },
    });
  }
}

export const ipv6Schema = (message?: string) => new Ipv6Schema(message);
