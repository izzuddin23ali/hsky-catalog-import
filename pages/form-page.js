import { useState, setState } from "react";
import axios from "axios";
import Image from "next/image";

export default function PrivatePage(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [isValid, setValid] = useState(null);
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

  const uploadToLocal = async (event) => {
    const body = new FormData();
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
        <div className="col-12 col-md-6 mx-auto text-center">
          <Image
            src="/hskytrd.png"
            width="250px"
            height="100px"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-10 col-md-8 mx-auto" id="main">
          <div className="row">
            <div className={isRunning ? "d-none" : "col-12"} id="csv">
              <label htmlFor="file">CSV Upload</label>
              <span
                className={isValid == false ? "invalid" : undefined}
                id="file-message"
              >
                *only accepts CSV file
              </span>
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
                onClick={isValid == true ? uploadToLocal : undefined}
              >
                Submit
              </button>
            </div>
            <div
              className={isRunning ? "col-12" : "d-none"}
              id="progress-container"
            >
              <div
                className={isRunning ? "row active" : "d-none"}
                id="progress"
              >
                <div className="col-12 col-md-6 col-lg-3 complete">
                  <div>1. Process Started</div>
                </div>
                {isUploaded ? (
                  <div className="col-12 col-md-6 col-lg-3 complete">
                    <div>2. Uploaded</div>
                  </div>
                ) : (
                  <div className="col-12 col-md-6 col-lg-3">
                    <div>2. Uploading</div>
                  </div>
                )}
                {isTriggered ? (
                  <div className="col-12 col-md-6 col-lg-3 complete">
                    <div>3. FTP Uploaded</div>
                  </div>
                ) : (
                  <div className="col-12 col-md-6 col-lg-3">
                    <div>3. FTP Uploading</div>
                  </div>
                )}
                {isComplete ? (
                  <div className="col-12 col-md-6 col-lg-3 complete">
                    <div>4. Importing Completed</div>
                  </div>
                ) : (
                  <div className="col-12 col-md-6 col-lg-3">
                    <div>4. Importing in Progress</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
