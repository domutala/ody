import BooleanValidators from "./boolean";
import DateValidators from "./date";
import NumberValidators from "./number";
import StringValidators from "./string";
import ValueValidators from "./value";

export default {
  ...NumberValidators,
  ...DateValidators,
  ...BooleanValidators,
  ...StringValidators,
  ...ValueValidators,
};
