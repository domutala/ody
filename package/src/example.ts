import * as o from ".";

const name = o.hostname().min(2).max(16).array().optional();

name
  .parse(["ert.com"])
  .then((v) => {
    console.log(v);
  })
  .catch((error) => {
    console.log("error", error);
  });

type Reseult = o.InferOutput<typeof name>;

const enumarable = o.enum([145, "hello"]).optional().array().default(["hello"]);
enumarable
  .parse(["hello"])
  .then((v) => {
    console.log(v);
  })
  .catch((error) => {
    console.log("error", error);
  });

type In = o.InferOutput<typeof enumarable>;
