import Benchmark from "benchmark";
import * as z from "zod";
import * as v from "valibot";
import * as yup from "yup";
import joi from "joi";
import * as s from "superstruct";

import { type as atype } from "arktype";

// Création des données à valider
const N = 100_000;
const testData = Array.from({ length: N }, (_, i) => ({
  name: `Name${i}`,
  age: (i % 100) + 1,
}));

// Définition des schemas
const zodSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive(),
});

const valibotSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1)),
  age: v.pipe(v.number(), v.integer(), v.minValue(0)), // v.number().int().positive()
});

const yupSchema = yup.object({
  name: yup.string().required(),
  age: yup.number().integer().positive().required(),
});

const joiSchema = joi.object({
  name: joi.string().min(1).required(),
  age: joi.number().integer().positive().required(),
});

const structSchema = s.object({
  name: s.string(),
  age: s.number(),
});

const benchmark = new Benchmark.Suite();

const arkSchema = atype({
  name: "string",
  age: "number.integer >= 0",
});

// const arkSchema = a.({ name: arkString(), age: arkNumber() });

benchmark
  .add("Valibot", () => {
    testData.forEach((d) => {
      v.parse(valibotSchema, d);
    });
  })

  .add("Zod", () => {
    testData.forEach((d) => {
      zodSchema.parse(d);
    });
  })

  .add("Yup", () => {
    testData.forEach((d) => {
      yupSchema.validateSync(d);
    });
  })

  .add("Joi", () => {
    testData.forEach((d) => {
      joiSchema.validate(d);
    });
  })

  .add("Superstruct", () => {
    testData.forEach((d) => {
      s.validate(d, structSchema);
    });
  })

  .add("ArkType", () => {
    testData.forEach((d) => {
      arkSchema.assert(d);
    });
  })

  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: false });
