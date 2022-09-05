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
    var processing_url = process.env.IMPORT_PROCESSING_URL;

    const instance = axios.create({
      baseURL: processing_url,
      timeout: 6000,
    });
    return instance.get().then(async (response) => {
      console.log(response.data.status);
      console.log(response.data.message);
      var message = response.data.message;
      if (message.toLowerCase().includes("already processing")) {
        return res.status(200).send({ finished: false, message: "Importing." });
      } else if (message.toLowerCase().includes("not triggered")) {
        return res.status(200).send({ finished: true, message: "Finished." });
      } else {
        return res
          .status(500)
          .send({ finished: null, message: "Something went wrong!" });
      }
    });
  } catch (err) {
    console.log("an error occured");
    return res.status(500).send({ message: "Something went wrong!" });
  }
}
