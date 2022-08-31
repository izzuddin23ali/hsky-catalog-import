import { useState, setState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Loading from "../components/loading";
import Papa from "papaparse";

export default function FileUpload() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [isValid, setValid] = useState(null);
  const [isRunning, setRunning] = useState(false);
  const [isUploaded, setUploaded] = useState(false);
  const [isTriggered, setTriggered] = useState(false);
  const [isComplete, setComplete] = useState(false);

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");

  const ref = useRef();

  const validColumns = [
    "SKU",
    "Brand",
    "Name",
    "Product Name",
    "Variant",
    "Parent Category",
    "Child Category",
    "Description",
    "Image Name",
    "Barcode Image Name",
    "Stock Number",
  ];

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      setError("");

      var filetype = i.type;

      if (filetype == "text/csv") {
        setFile(i);
        handleParse(i);
      } else {
        setValid(false);
      }
    }
  };

  const handleParse = async (inFile) => {
    if (!inFile) {
      console.log("no file yet");
    } else {
      Papa.parse(inFile, {
        header: true,
        complete: function (results, file) {
          console.log("Parsing complete:", results, file);
          console.log(results.meta.fields);
          setData(results.meta.fields);
          setValid(true);
          validColumns.forEach((col) => {
            if (results.meta.fields.indexOf(col) < 0) {
              setValid(false);
              setError(
                "the CSV file have either missing or additional columns, please input appropriate CSV file"
              );
            }
          });
        },
      });
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
          axios.get("/api/import").then((res) => {
            console.log(res);
            if (res.status == 200) {
              setComplete(true);
            }
          });
        }
      });
    }
  };

  const resetAllState = () => {
    setRunning(false);
    setValid(null);
    setUploaded(false);
    setTriggered(false);
    setComplete(false);
    ref.current.value = null;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 col-lg-8 mx-auto" id="main">
          <div className="row">
            <div className={isRunning ? "d-none" : "col-12"} id="csv">
              <label htmlFor="file">CSV Upload</label>
              <span
                className={isValid == false ? "invalid" : undefined}
                id="file-message"
              >
                *only accepts CSV file{error ? ", " + error : undefined}
              </span>
              <input
                type="file"
                name="file"
                id="file"
                ref={ref}
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
                    <div>
                      <Loading />
                      2. Uploading
                    </div>
                  </div>
                )}
                {isTriggered ? (
                  <div className="col-12 col-md-6 col-lg-3 complete">
                    <div>3. FTP Uploaded</div>
                  </div>
                ) : (
                  <div className="col-12 col-md-6 col-lg-3">
                    <div>
                      <Loading />
                      3. FTP Uploading
                    </div>
                  </div>
                )}
                {isComplete ? (
                  <div className="col-12 col-md-6 col-lg-3 complete">
                    <div>4. Importing Completed</div>
                  </div>
                ) : (
                  <div className="col-12 col-md-6 col-lg-3">
                    <div>
                      <Loading />
                      4. Importing in Progress
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isComplete ? (
            <div className="row">
              <div className="col-12 col-md-10" id="complete-container">
                <button onClick={resetAllState}>Upload Another CSV</button>
                <a href="#">
                  <button>Go to HSky Catalog</button>
                </a>
              </div>
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
}
