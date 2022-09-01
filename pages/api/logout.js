import { withSessionRoute } from "../../lib/auth/withSession";

async function logoutRoute(req, res) {
  try {
    if (req.method == "POST") {
      req.session.destroy();
      return res.send({ success: true, message: "Successfully logged out." });
    } else {
      return res.send({
        success: false,
        message: "This is not the route you are looking for!",
      });
    }
  } catch (error) {
    console.log(error, error.message);
    return res
      .status(500)
      .send({ success: false, message: "Error attempting to logout." });
  }
}

export default withSessionRoute(logoutRoute);
