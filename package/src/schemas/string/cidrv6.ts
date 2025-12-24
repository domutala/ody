import { StringSchema } from "./string";

export class CidrV6Schema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "cidrv6",
      type: "validator",
      params: { error: message || "must be a valid IPv6 CIDR" },
    });
  }
}

export const cidrv6Schema = (message?: string) => new CidrV6Schema(message);
