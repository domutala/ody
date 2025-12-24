import { StringSchema } from "src/schemas/string";

export const $ody = {
  string: () => new StringSchema(),
};

const name = $ody
  .string()
  .array()
  .trim()
  .transform((value) => {
    return value + "ZZZ";
  })
  .min(5)
  .max(50)

  .regex(/^[a-zA-Z]+$/, "regex not match");

name
  .parse(["  dfsdfsdf    "])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });
