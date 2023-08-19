#! yarn tsx

import { toDuplicate } from "@/utils";

const res = toDuplicate(
  [
    { id: "xxx", value: "aaa" },
    { id: "xxx", value: "bbb" },
    { id: "aaa", value: "aaa" },
    { id: "bbb", value: "bbb" },
  ],
  {
    isCover: true,
    keyProp: "value",
  }
);
console.log(res);
