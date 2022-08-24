import { useState, setState } from "react";
import axios from "axios";

export default function PrivatePage(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [isValid, setValid] = useState(false);
  console.log(isValid);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      console.log(i);

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));

      var filetype = i.type;

      if (filetype == "text/csv") {
        setValid(true);
      }
    }
  };

  function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const uploadToLocal = async (event) => {
    const body = new FormData();
    // console.log("file", image)
    body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    });
    if (response.status == 200) {
      const res = axios.get("/api/ftp");
      res.then((res) => {
        console.log(res);
        if (res) {
          axios.get("/api/hello");
        }
      });
      //.then(await wait(10000))
      //.then(axios.get("/api/hello"));
    }
  };

  return (
    <div className="container">
      <div>
        <h4>Upload File</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button
          className={isValid ? "btn btn-primary" : "btn btn-primary disabled"}
          type="submit"
          onClick={isValid ? uploadToLocal : undefined}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
