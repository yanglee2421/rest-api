import formidable from "formidable";
import type { Fields, Files, Options } from "formidable";
import type { IncomingMessage } from "node:http";

export function toParseForm(req: IncomingMessage, opts?: Options) {
  const form = formidable(opts);

  return new Promise<Data>((res, rej) => {
    form.parse(req, (err, fields, files) => {
      if (err) return rej(err);
      return res({ fields, files });
    });
  });
}

interface Data {
  fields: Fields;
  files: Files;
}
