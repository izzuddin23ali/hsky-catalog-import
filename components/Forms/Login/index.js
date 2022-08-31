import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import styles from "./Login.module.scss";
import cx from "classnames";
import Loading from "../../LoadingRing";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="row d-flex justify-content-center align-items-center">
      <div className={cx("col-12 col-md-6", styles.loginContainer)}>
        <h1>H Sky Sheet Importer</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Required";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setErrorMessage("");
            axios
              .post("/api/login", values)
              .then((res) => {
                if (res.data.success == true) {
                  setErrorMessage("that is correct");
                } else {
                  setErrorMessage(res.data.message);
                }
              })
              .catch((error) => {
                setErrorMessage(
                  "An unexpected error occurred. Please refresh and try again."
                );
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.formField}>
                <label htmlFor="username">Username / Email Address</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  isinvalid={touched.username && errors.username}
                  id="username"
                />
                <span className={styles.error}>
                  {touched.username && errors.username}
                </span>
              </div>

              <div className={styles.formField}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isinvalid={touched.password && errors.password}
                  id="password"
                />
                <span className={styles.error}>
                  {touched.password && errors.password}
                </span>
              </div>
              {isSubmitting ? (
                <button className="btn" disabled={true}>
                  <Loading />
                </button>
              ) : (
                <button className="btn" type="submit">
                  Submit
                </button>
              )}
              {errorMessage && (
                <span className={styles.formError}>{errorMessage}</span>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
