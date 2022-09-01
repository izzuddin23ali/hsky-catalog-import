import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import axios from "axios";
import { withSessionRoute } from "../../lib/auth/withSession";

const cors = initMiddleware(
  Cors({
    methods: ["POST", "GET"],
    origin: "*",
  })
);

async function loginRoute(req, res) {
  await cors(req, res);
  try {
    return axios
      .post(process.env.LOGIN_CHECK_ENDPOINT, {
        username: req.body.username,
        password: req.body.password,
      })
      .then(async (response) => {
        if (response.data.success == true) {
          req.session.user = {
            id: response.data.user_id,
            username: response.data.username,
            full_name: response.data.user_fullname,
          };
          await req.session.save();
          return res.send({
            success: true,
            message: "Authentication successful.",
          });
        } else {
          return res.send({
            success: false,
            message: response.data.message,
          });
        }
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

export default withSessionRoute(loginRoute);
