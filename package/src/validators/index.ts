import BooleanValidators from "./boolean";
import DateValidators from "./date";
import NumberValidators from "./number";
import StringValidators from "./string";
import ValueValidators from "./value";

const validators: { [key: string]: <T>(value: T, args?: any) => T } = {
  ...DateValidators,
  ...BooleanValidators,
  ...StringValidators,
  ...ValueValidators,
} as any;

export default validators;
