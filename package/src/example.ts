import { StringSchema } from "src/schemas/string";

export const $ody = {
  string: () => new StringSchema(),
};

const name = $ody
  .string()
  .min(5)
  .max(50)
  .array()
  .transform((value) => {
    return value + "ZZZ";
  })
  .regex(/^[a-zA-Z]+$/, "regex not match");

try {
  console.log(name.parse(["dfsdfsdf"]));
} catch (error) {
  console.log("eroooooor", error);
}
