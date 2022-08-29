import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";

export default function Login(props) {
  const login = (event) => {
    axios
      .post(process.env.TEST_LOGIN_API, {
        username: event.target.email.value,
        password: event.target.password.value,
      })
      .then((res) => {
        console.log(res);
      });
  };
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .post(process.env.TEST_LOGIN_API, {
                  username: values.email,
                  password: values.password,
                })
                .then((res) => {
                  console.log(res);
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
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
