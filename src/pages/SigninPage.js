import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
const SignInPage = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    accountType: "",
    schoolName: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("accountType", values.accountType);
    formData.append("schoolName", values.schoolName);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(registerUser(formData));

    navigate("/profile");
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    if (!values.accountType) {
      errors.accountType = "Required";
    }

    if (
      values.accountType === "college" ||
      values.accountType === "highschool"
    ) {
      if (!values.schoolName) {
        errors.schoolName = "Required";
      }
    }

    return errors;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Sign In</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validateForm}
        >
          {(
            { isSubmitting, values } // Destructure values from props
          ) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-4">
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
              <div className="mb-4">
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
              <div className="mb-4">
                <label
                  htmlFor="accountType"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Type
                </label>
                <Field
                  as="select"
                  id="accountType"
                  name="accountType"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="">Select User Type</option>
                  <option value="college">College Student</option>
                  <option value="highschool">High School Student</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="accountType"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              {values.accountType === "college" ||
              values.accountType === "highschool" ? (
                <div className="mb-4">
                  <label
                    htmlFor="schoolName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {values.accountType === "college"
                      ? "College"
                      : "High School"}{" "}
                    Name
                  </label>
                  <Field
                    type="text"
                    id="schoolName"
                    name="schoolName"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="schoolName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              ) : null}
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0D99FF] text-white rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              </div>
              <div className="flex justify-center items-center font-medium gap-1 py-2 text-xs">
                <p>Already registered?</p>{" "}
                <Link to="/log-in">
                  <p className="text-[#0D99FF] hover:brightness-75 hover:underline cursor-pointer">
                    Log In
                  </p>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInPage;
