import styles from "./Upload.module.scss";
import { useState, useRef } from "react";
import axios from "axios";
import Papa from "papaparse";
import Loading from "../../LoadingRing";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function FileUpload() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [isValid, setValid] = useState(null);

  const [isRunning, setRunning] = useState(false);
  const [isUploaded, setUploaded] = useState(false);
  const [isTriggered, setTriggered] = useState(false);
  const [isComplete, setComplete] = useState(false);

  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("");

      var filetype = i.type;

      if (filetype == "text/csv") {
        setFile(i);
        handleParse(i);
      } else {
        setValid(false);
        setErrorMessage("Only CSV files can be uploaded.");
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
              setErrorMessage(
                "CSV file have either missing or additional columns, please input appropriate CSV file."
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
    axios
      .post("/api/file", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((fileResponse) => {
        console.log(fileResponse.data.filePath);
        if (fileResponse.status == 200) {
          setRunning(true);
          axios
            .post("/api/ftp", { filePath: fileResponse.data.filePath })
            .then((ftpResponse) => {
              if (ftpResponse.data.success == true) {
                setUploaded(true);
                axios.get("/api/import").then((importResponse) => {
                  setTriggered(true);
                  if (importResponse.status == 200) {
                    setComplete(true);
                  }
                });
              } else {
                setErrorMessage("Error found with FTP Upload");
                setComplete(true);
              }
            });
        } else {
          setErrorMessage("Error found with file handling");
          setComplete(true);
        }
      })
      .catch((error) => {
        console.log("error found");
        setErrorMessage("Error found with file handling");
        setComplete(true);
      });
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
    <div className="row">
      <div className={cx("col-10 col-lg-8 mx-auto", styles.uploadContainer)}>
        <div className="row">
          <div className="col-12">
            <h1>CSV Upload</h1>
          </div>
        </div>
        <div className={cx("row mb-4", styles.progressContainer)}>
          {isValid ? (
            <div className="col-12 col-md-6 col-lg-3 complete">
              <div className={cx(styles.progressBox, styles.complete)}>
                <FontAwesomeIcon icon={faCircleCheck} />
                1. File Valid
              </div>
            </div>
          ) : (
            <div className="col-12 col-md-6 col-lg-3">
              <div className={cx(styles.progressBox, styles.complete)}>
                1. Select File
              </div>
            </div>
          )}

          {!isRunning && (
            <>
              <div className="col-12 col-md-6 col-lg-3">
                <div className={styles.progressBox}>2. Store File Locally</div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className={styles.progressBox}>
                  3. Upload File to Server
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className={styles.progressBox}>4. Run Import Process</div>
              </div>
            </>
          )}

          {isRunning && (
            <>
              {isUploaded ? (
                <div className="col-12 col-md-6 col-lg-3 complete">
                  <div className={cx(styles.progressBox, styles.complete)}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    2. Uploaded
                  </div>
                </div>
              ) : (
                <div className="col-12 col-md-6 col-lg-3">
                  <div className={styles.progressBox}>
                    <Loading size="40px" innersize="40px" />
                    2. Uploading
                  </div>
                </div>
              )}

              {isTriggered ? (
                <div className="col-12 col-md-6 col-lg-3 complete">
                  <div className={cx(styles.progressBox, styles.complete)}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    3. FTP Uploaded
                  </div>
                </div>
              ) : (
                <div className="col-12 col-md-6 col-lg-3">
                  <div className={styles.progressBox}>
                    <Loading size="40px" innersize="40px" />
                    3. FTP Uploading
                  </div>
                </div>
              )}

              {isComplete ? (
                <div className="col-12 col-md-6 col-lg-3 complete">
                  <div className={cx(styles.progressBox, styles.complete)}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    4. Importing Completed
                  </div>
                </div>
              ) : (
                <div className="col-12 col-md-6 col-lg-3">
                  <div className={styles.progressBox}>
                    <Loading size="40px" innersize="40px" />
                    4. Importing in Progress
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className={cx("row", styles.uploadForm)}>
          <div className={isRunning ? "d-none" : "col-12"}>
            <label htmlFor="file">Select a file to upload</label>
            <span className={styles.uploadInfo}>*only accepts CSV file</span>
            <input
              type="file"
              name="file"
              id="file"
              ref={ref}
              className="mb-4"
              onChange={uploadToClient}
              disabled={isUploaded ? "disabled" : undefined}
            />
            {errorMessage && (
              <span className={styles.errorMessage}>{errorMessage}</span>
            )}
            <button
              className={isValid ? styles.validButton : styles.disabledButton}
              type="submit"
              onClick={isValid == true ? uploadToLocal : undefined}
              disabled={!isValid}
            >
              Submit
            </button>
          </div>
        </div>
        {isComplete && (
          <div className="row mt-4 mb-4">
            <div
              className={cx(
                "col-12 col-md-10 mx-auto",
                styles.completeContainer
              )}
            >
              <p>Import process has completed.</p>
              <button onClick={resetAllState}>Upload Another CSV</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
