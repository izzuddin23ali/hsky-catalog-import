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

export default async function login(req, res) {
  await cors(req, res);
  //console.log(req);
  console.log(req.body);
  try {
    axios
      .post(process.env.TEST_LOGIN_API, {
        username: req.body.email,
        password: req.body.password,
      })
      .then((response) => {
        console.log(response);
        return res.send(response.body);
      });
  } catch (err) {
    console.log("an error occured");
    return res.status(500).send({ message: "Something went wrong!" });
  }
}
