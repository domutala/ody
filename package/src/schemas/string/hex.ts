import { StringSchema } from "./string";

export class HexSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "hex",
      type: "validator",
      params: { error: message || "must be valid hex" },
    });
  }
}

export const hexSchema = (message?: string) => new HexSchema(message);
