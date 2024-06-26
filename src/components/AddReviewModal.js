import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../features/reviewSlice"; // Import the addReview action

const AddReviewModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const courseId = useSelector((state) => state.course.course?._id);
  const initialValues = {
    review: "",
    rating: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("text", values.review);
      formData.append("stars", values.rating);
      formData.append("course", courseId);

      dispatch(createReview(formData));

      onClose();
    } catch (error) {
      console.error("Review submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.review) {
      errors.review = "Required";
    }

    if (!values.rating) {
      errors.rating = "Required";
    } else if (isNaN(values.rating) || values.rating < 1 || values.rating > 5) {
      errors.rating = "Rating must be a number between 1 and 5";
    }

    return errors;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Leave a Review</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validateForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-700"
                >
                  Review
                </label>
                <Field
                  as="textarea"
                  id="review"
                  name="review"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
                <ErrorMessage
                  name="review"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating (out of 5)
                </label>
                <Field
                  type="number"
                  id="rating"
                  name="rating"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  min="1"
                  max="5"
                />
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0D99FF] text-white rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 hover:underline"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddReviewModal;
