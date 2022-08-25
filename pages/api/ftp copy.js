import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import path, { join } from "path";
import axios from "axios";

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

  const config = {
    user: process.env.TEST_FTP_USERNAME_1,
    // Password optional, prompted if none given
    password: process.env.TEST_FTP_PASSWORD_1,
    host: process.env.TEST_FTP_HOST,
    port: 21,
    localRoot: process.cwd() + "/public/import",
    remoteRoot: "staging5.hcatalog.hocodev.com/public_html/import/",
    // include: ["*", "**"],      // this would upload everything except dot files
    include: ["import.csv"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    exclude: ["dist/**.map", "node_modules/**", "node_modules/**", ".git/**"],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
    // use sftp or ftp
    sftp: false,
  };

  ftpDeploy
    .deploy(config)
    .then((res) => {
      console.log("finished:", res);
      return res;
    })
    .catch((err) => console.log(err));
}
