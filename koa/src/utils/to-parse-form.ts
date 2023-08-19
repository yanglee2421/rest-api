// NodeJs Imports
import { IncomingMessage } from "node:http";

// Formidable Imports
import formidable, { Fields, Files, Options } from "formidable";

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
