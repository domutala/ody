import { StringSchema } from "./string";

export class HostnameSchema<T = string> extends StringSchema<T> {
  constructor(params?: string) {
    super();

    this._pipeline.push({
      schema: "hostname",
      type: "validator",
      params: { error: params || "must be a hostname" },
    });
  }
}

export function hostnameSchema(params?: string): HostnameSchema {
  return new HostnameSchema(params);
}
