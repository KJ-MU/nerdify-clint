import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice"; // Import the loginUser action
import LaodingSpinner from "../components/LoadingSpinner";
const LoginPage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Dispatch loginUser action
      await dispatch(loginUser(values));
      // Redirect programmatically after successful login
      window.location.replace("/profile"); // Replace with your desired route
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setSubmitting(false); // Ensure form button is enabled after submission
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return loading ? (
    <div className="flex justify-center items-center h-screen">
      {" "}
      <LaodingSpinner />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validateForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0D99FF] text-white rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging In..." : "Login"}
                </button>
              </div>
              <div className="flex justify-center items-center font-medium gap-1 py-2 text-xs">
                <p>Not registered?</p>{" "}
                <Link
                  to="/sign-in"
                  className="text-[#0D99FF] hover:brightness-75 hover:underline"
                >
                  Create account
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
