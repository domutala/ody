export type SchemaState = {
  optional: boolean;
  nullable: boolean;
  nullish: boolean;
  array: boolean;
  hasDefault: boolean;
};

export type SetOptional<S extends SchemaState> = {
  optional: true;
  nullable: S["nullable"];
  nullish: S["nullish"];
  array: S["array"];
  hasDefault: S["hasDefault"];
};

export type SetNullable<S extends SchemaState> = {
  optional: S["optional"];
  nullable: true;
  nullish: S["nullish"];
  array: S["array"];
  hasDefault: S["hasDefault"];
};

export type SetNullish<S extends SchemaState> = {
  optional: S["optional"];
  nullable: S["nullable"];
  nullish: true;
  array: S["array"];
  hasDefault: S["hasDefault"];
};

export type SetArray<S extends SchemaState> = {
  optional: S["optional"];
  nullable: S["nullable"];
  nullish: S["nullish"];
  array: true;
  hasDefault: S["hasDefault"];
};

export type SetDefault<S extends SchemaState> = {
  optional: S["optional"];
  nullable: S["nullable"];
  nullish: S["nullish"];
  array: S["array"];
  hasDefault: true;
};

export type DefaultState = {
  optional: false;
  nullable: false;
  nullish: false;
  array: false;
  hasDefault: false;
};
