import { StringSchema } from "./string";

export class JwtSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "jwt",
      type: "validator",
      params: { error: message || "must be a valid JWT" },
    });
  }
}

export const jwtSchema = (message?: string) => new JwtSchema(message);
