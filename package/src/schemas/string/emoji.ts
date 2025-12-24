import { StringSchema } from "./string";

export class EmojiSchema<T = string> extends StringSchema<T> {
  constructor(message?: string) {
    super();
    this._pipeline.push({
      schema: "emoji",
      type: "validator",
      params: { error: message || "must be a valid emoji" },
    });
  }
}

export const emojiSchema = (message?: string) => new EmojiSchema(message);
