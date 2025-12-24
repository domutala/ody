import { StringSchema } from "./string";

export class CidrV4Schema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "cidrv4",
      type: "validator",
      params: { error: message || "must be a valid IPv4 CIDR" },
    });
  }
}

export const cidrv4Schema = (message?: string) => new CidrV4Schema(message);
