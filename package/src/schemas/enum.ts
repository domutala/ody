import { BaseSchema } from "src/core";
import { Validators } from "src/validators";

export function enumSchema<const TValues extends readonly [any, ...any[]]>(
  values: TValues
): BaseSchema<TValues[number]> {
  return new BaseSchema<TValues[number]>("enum", [
    {
      schema: "enum",
      type: "validator",
      params: {
        args: values,
        error: `Value must be one of: ${values.join(", ")}`,
      },
    },
  ]);
}

export function _validator(validators: Validators) {
  validators.enum = (value: unknown, values: readonly string[]) => {
    return values.includes(value as string);
  };

  return validators;
}
