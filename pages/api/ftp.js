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

  const FtpDeploy = require("ftp-deploy");
  const ftpDeploy = new FtpDeploy();

  try {
    const config = {
      user: process.env.TEST_FTP_USERNAME_1,
      password: process.env.TEST_FTP_PASSWORD_1,
      host: process.env.TEST_FTP_HOST,
      port: 21,
      localRoot: process.cwd() + "/public/import",
      remoteRoot: "staging5.hcatalog.hocodev.com/public_html/import/",
      include: ["import.csv"],
      exclude: ["dist/**.map", "node_modules/**", "node_modules/**", ".git/**"],
      deleteRemote: false,
      forcePasv: true,
      sftp: false,
    };

    ftpDeploy
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
      message: "Oops, unfortuantely an error occured!",
    });
  }
}
