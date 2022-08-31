import Image from "next/image";
import { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import FileUpload from "../components/upload-form";
import Footer from "../components/footer";

export default function Home() {
  const [isLoggedIn, setLogin] = useState(false);
  const [loginMessage, setMessage] = useState("");
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
      {isLoggedIn ? (
        <FileUpload />
      ) : (
        <div className="row">
          <div
            className="col-10 col-md-10 col-lg-8 mx-auto"
            id="login-form-container"
          >
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
                axios.post("/api/login", values).then((res) => {
                  console.log(values.email);
                  if (res.data == true) {
                    setLogin(true);
                  } else {
                    setMessage(
                      "Authentication failed. You have either input the wrong email or the wrong password."
                    );
                    setSubmitting(false);
                  }
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
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && errors.email}
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                  {loginMessage != "" ? (
                    <span className="login-message">{loginMessage}</span>
                  ) : undefined}
                  <button type="submit" disabled={isSubmitting}>
                    Login
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
