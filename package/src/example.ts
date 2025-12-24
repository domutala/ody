import * as ody from ".";

const name = ody.string().min(2).max(16).array().optional();

name
  .parse(["ert.com"])
  .then((v) => {
    console.log(v);
  })
  .catch((error) => {
    console.log("error", error);
  });

type Reseult = ody.InferOutput<typeof name>;
type In = ody.InferInput<typeof name>;
