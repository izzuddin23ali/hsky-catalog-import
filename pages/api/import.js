import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import axios from "axios";

const cors = initMiddleware(
  Cors({
    methods: ["POST", "GET"],
    origin: "*",
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  try {
    var trigger_url = process.env.IMPORT_TRIGGER_URL;
    var processing_url = process.env.IMPORT_PROCESSING_URL;
    const instance = axios.create({
      baseURL: processing_url,
      timeout: 3600000,
    });

    return axios.get(trigger_url).then(async (response) => {
      console.log(response.data.status);
      console.log(response.data.message);
      instance.get().then(async (response) => {
        return res
          .status(response.data.status)
          .send({ message: response.data.message });
      });
    });
  } catch (err) {
    console.log("an error occured");
    return res.status(500).send({ message: "Something went wrong!" });
  }
}
