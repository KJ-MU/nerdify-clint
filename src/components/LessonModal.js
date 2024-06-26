import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
Modal.setAppElement("#root"); // Add this to avoid screen readers to read main content

const LessonModal = ({ isOpen, onRequestClose, onSubmit, chapters }) => {
  const [chapterInput, setChapterInput] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { lesson } = useSelector((state) => state.lesson);
  const { chapter, loading } = useSelector((state) => state.chapter);
  // const [loading, setLoading] = useState(false);
  const initialValues = {
    title: "",
    videoFile: null,
    chapter: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const finalValues = {
        ...values,
        chapter: values.chapter,
      };
      await onSubmit(finalValues);
      DelayNode(1000);
      if (!loading) {
        onRequestClose();
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Required";
    }

    if (!values.videoFile) {
      errors.videoFile = "Required";
    }

    if (!values.chapter) {
      errors.chapter = "Required";
    }

    return errors;
  };

  const handleChapterInputChange = (event) => {
    setChapterInput(event.target.value);
  };

  const handleChapterInputFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleChapterInputBlur = () => {
    // Delay hiding the dropdown to allow click event to register
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className="modal"
      overlayClassName="overlay"
    >
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl mb-6 text-center">Add New Lesson</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validateForm}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="videoFile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Video File
                  </label>
                  <input
                    id="videoFile"
                    name="videoFile"
                    type="file"
                    accept="video/*"
                    onChange={(event) => {
                      setFieldValue("videoFile", event.currentTarget.files[0]);
                    }}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                  <ErrorMessage
                    name="videoFile"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="chapter"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Chapter
                  </label>
                  <div className="relative">
                    <Field
                      type="text"
                      id="chapter"
                      name="chapter"
                      value={chapterInput}
                      onChange={(e) => {
                        handleChapterInputChange(e);
                        setFieldValue("chapter", e.target.value);
                      }}
                      onFocus={handleChapterInputFocus}
                      onBlur={handleChapterInputBlur}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />

                    {isDropdownVisible && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        {chapters
                          ?.filter((chapter) =>
                            chapter.title
                              .toLowerCase()
                              .includes(chapterInput.toLowerCase())
                          )
                          .map((chapter) => (
                            <div
                              key={chapter.title}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setChapterInput(chapter.title);
                                setFieldValue("chapter", chapter.title);
                                setIsDropdownVisible(false);
                              }}
                            >
                              {chapter.title}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <ErrorMessage
                    name="chapter"
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
                    {isSubmitting ? "Submitting..." : "Add Lesson"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </Modal>
  );
};

export default LessonModal;
