import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import axios from "axios";

const cors = initMiddleware(
  Cors({
    methods: ["POST", "GET"],
    origin: "*",
  })
);

export default async function login(req, res) {
  await cors(req, res);
  try {
    return axios
      .post(process.env.LOGIN_CHECK_ENDPOINT, {
        username: req.body.username,
        password: req.body.password,
      })
      .then((response) => {
        return res.send({
          success: response.data.success,
          message: response.data.message,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ success: false, message: "Error" });
      });
  } catch (err) {
    console.log("an error occured");
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong!" });
  }
}
