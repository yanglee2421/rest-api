// NodeJs Imports
import formidable from "formidable";
import type { Fields, Files, Options } from "formidable";
import type { IncomingMessage } from "node:http";

// Formidable Imports

// Parse Form
export function toParseForm(req: IncomingMessage, opts?: Options) {
  // ** Form
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
