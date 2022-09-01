import { IncomingForm } from "formidable";
var mv = require("mv");
var fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();

  form.on("file", (field, file) => {
    fs.rename(file.filepath, form.uploadDir + "/import.csv", () => {
      console.log("successfully changed.");
    });
  });

  const data = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      //console.log(fields, files);
      //console.log(files);
      //console.log(files.file.filepath);
      //console.log(files);
      //var oldPath = files.file.filepath;
      //var newPath = `./public/import/import.csv`;
      //mv(oldPath, newPath, function (err) {});
      res.status(200).json({ filePath: form.uploadDir + "\\import.csv" });
    });
  });
}
