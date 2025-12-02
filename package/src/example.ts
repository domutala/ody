import { StringSchema } from "src/schemas/string";

export const $ody = {
  string: () => new StringSchema(),
};

const name = $ody
  .string()
  .min(5)
  .max(50)
  .regex(/^[a-zA-Z]+$/, "reges not match");

try {
  console.log(name.parse("Hellooo   "));
} catch (error) {
  console.log("eroooooor", error);
}
