import { StringSchema } from "src/schemas/string";
import { Infer } from "./types/infer";

export const $ody = {
  string: () => new StringSchema(),
};

const name = $ody
  .string()
  .optional()
  .nullish()
  .array()
  .default(["sdfsdf", "dfsdf"])
  .transform((v) => (v ? v.length : 0));

// .default(125);
// .array();

// .array()
// .trim()
// .transform((value) => {
//   return value + "ZZZ";
// })
// .min(5)
// .max(50)

// .regex(/^[a-zA-Z]+$/, "regex not match");

type Result = Infer<typeof name>;

name
  .parse(["  dfsdfsdf    ", "fr4585"])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });
