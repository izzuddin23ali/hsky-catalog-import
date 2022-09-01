import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["POST", "GET"],
    origin: "*",
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  const filePath = req.body.filePath;
  var pathSplit = filePath.split("\\");
  var fileName = pathSplit.pop();
  var rootFolder = filePath.replace("\\" + fileName, "");
  console.log(fileName);
  console.log("ftp", filePath);
  console.log(rootFolder);

  const FtpDeploy = require("ftp-deploy");
  const ftpDeploy = new FtpDeploy();

  try {
    const config = {
      user: process.env.SERVER_FTP_USERNAME,
      password: process.env.SERVER_FTP_PASSWORD,
      host: process.env.SERVER_FTP_HOST,
      port: 21,
      localRoot: rootFolder,
      remoteRoot: process.env.SERVER_FTP_FOLDER,
      include: [fileName],
      exclude: ["dist/**.map", "node_modules/**", "node_modules/**", ".git/**"],
      deleteRemote: false,
      forcePasv: true,
      sftp: false,
    };

    return ftpDeploy
      .deploy(config)
      .then((result) => {
        var success, message;
        if (result[0].length > 0) {
          success = true;
          message = "File successfully uploaded to remote server.";
        } else {
          success = false;
          message = "File failed to be uploaded.";
        }
        console.log(message);
        return res.send({ success: success, message: message });
      })
      .catch((err) => {
        console.log("ftpdeploy error: ", err);
        return res.send({ success: false, message: err.message });
      });
  } catch (err) {
    console.log(err);
    return res.send({
      success: false,
      message: "Oops, unfortunately an error occured!",
    });
  }
}
