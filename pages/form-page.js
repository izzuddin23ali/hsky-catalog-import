import { useState, setState } from "react";
import axios from "axios";

export default function PrivatePage(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [isValid, setValid] = useState(false);
  const [isRunning, setRunning] = useState(false);
  const [isUploaded, setUploaded] = useState(false);
  const [isTriggered, setTriggered] = useState(false);
  const [isComplete, setComplete] = useState(false);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      console.log(i);

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));

      var filetype = i.type;

      if (filetype == "text/csv") {
        setValid(true);
      } else {
        setValid(false);
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
      setRunning(true);
      axios.get("/api/ftp").then((res) => {
        console.log(res);
        setUploaded(true);
        if (res.status == 200) {
          setTriggered(true);
          axios.get("/api/hello").then((res) => {
            console.log(res);
            if (res.status == 200) {
              setComplete(true);
            }
          });
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4>HSky Catalog Importer</h4>
        </div>
      </div>
      <div className="row" id="main">
        <div class="col-12 col-md-8 mx-auto">
          <div class="row" id="csv">
            <div class="col-12">
              <label htmlFor="file">CSV Upload</label>
              <span className="file-message">*Only accepts CSV file</span>
              <input
                type="file"
                name="file"
                id="file"
                onChange={uploadToClient}
                disabled={isUploaded ? "disabled" : undefined}
              />
              <button
                className={
                  isValid ? "btn btn-primary" : "btn btn-primary disabled"
                }
                type="submit"
                onClick={isValid ? uploadToLocal : undefined}
              >
                Submit
              </button>
            </div>
          </div>
          <div className={isTriggered ? undefined : "d-none"}>
            {isComplete ? (
              <h2>Import Completed</h2>
            ) : (
              <>
                <h2>Import is Triggered.</h2>
                <h4>Un momento</h4>
              </>
            )}
          </div>
          <div className={isRunning ? "row active" : "d-none"} id="progress">
            <div className="col-3 complete">
              <div>Process Starting</div>
            </div>
            <div className={isUploaded ? "col-3 complete" : "col-3"}>
              <div>Uploading</div>
            </div>
            <div className={isTriggered ? "col-3 complete" : "col-3"}>
              <div>FTP</div>
            </div>
            <div className={isComplete ? "col-3 complete" : "col-3"}>
              <div>Importing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
