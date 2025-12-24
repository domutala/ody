import { BaseSchema } from "src/core";
import { Validators } from "src/validators";
import { InferOutput } from "src/types/infer";

type UnionOutput<T extends readonly BaseSchema<any>[]> = InferOutput<T[number]>;

export function unionSchema<
  const TSchemas extends readonly [BaseSchema<any>, ...BaseSchema<any>[]]
>(schemas: TSchemas): BaseSchema<UnionOutput<TSchemas>> {
  return new BaseSchema<UnionOutput<TSchemas>>("union", [
    {
      schema: "union",
      type: "validator",
      params: { args: schemas },
    },
  ]);
}

export function _validator(validators: Validators) {
  validators.union = async (
    value: unknown,
    schemas: readonly BaseSchema<any>[]
  ) => {
    for (const schema of schemas) {
      const result = await schema.safeParse(value);
      if (!result.error) return true;
    }

    return false;
  };

  return validators;
}
