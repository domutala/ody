export interface Schema<T> {
  parse(value: unknown): Promise<T>;
}

export type Infer<TSchema extends Schema<any>> = TSchema extends Schema<
  infer TOutput
>
  ? TOutput
  : never;
