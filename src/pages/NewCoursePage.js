// export default NewCoursePage;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { createCourse } from "../features/courseSlice"; // Adjust the path as necessary
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../features/userSlice";
const NewCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses, course, loading, error } = useSelector(
    (state) => state.course
  );
  const initialValues = {
    subject: "",
    courseClass: "", // Make sure to initialize with an empty string or a default value like "Others"
    overview: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    courseClass: Yup.string().required("Class is required"),
    overview: Yup.string().required("Overview is required"),
    image: Yup.mixed().nullable(),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("Subject", values.subject);
    formData.append("class", values.courseClass);
    formData.append("overview", values.overview);
    if (values.image) {
      formData.append("image", values.image);
    }

    dispatch(createCourse(formData));
    dispatch(fetchUserProfile());
    if (!loading) {
      navigate(`/single-course/${course?._id}`);
    }
    // Reset form fields after submission if needed
    resetForm();
    setSubmitting(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return loading ? (
    <div className="flex h-screen justify-center items-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <div className="text-left w-2/4 flex flex-col justify-center items-center mt-40 p-6">
        <h2 className="text-left text-xl font-semibold mb-4">
          Create a New Course
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col justify-center">
              <div className="mb-4">
                <label htmlFor="subject" className="block font-bold mb-1">
                  Subject
                </label>
                <Field
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="courseClass" className="block font-bold mb-1">
                  Class
                </label>
                <Field
                  as="select"
                  id="courseClass"
                  name="courseClass"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select a class</option>
                  <option value="Others">Others</option>
                  <option value="High School">High School</option>
                  <option value="College">College</option>
                </Field>
                <ErrorMessage
                  name="courseClass"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="overview" className="block font-bold mb-1">
                  Overview
                </label>
                <Field name="overview">
                  {({ field, form }) => (
                    <ReactQuill
                      value={field.value}
                      onChange={(content) =>
                        form.setFieldValue(field.name, content)
                      }
                      className="w-full px-3 py-2 border rounded-md"
                      theme="snow"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="overview"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block font-bold mb-1">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                className="py-3 px-6 self-center rounded-xl text-white bg-[#0D99FF] hover:brightness-75 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Create"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewCoursePage;
