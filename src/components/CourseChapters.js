import Drawer from "./Drawer";
import Subscribe from "./Subscribe";
import LessonModal from "./LessonModal";
import * as jwtDecode from "jwt-decode";
import { createChapter } from "../features/chapterSlice";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

const CourseChapters = ({
  isTheCreatorofThisCourse,
  isSubscribedToThisCourse,
  chapters,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [owner, setOwner] = useState(false);

  const { course, loading } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const courseID = course?._id;
  const createdBy = course?.createdBy;

  const handleAddLesson = async (values) => {
    const formData = new FormData();
    formData.append("chapter", values.chapter);
    formData.append("title", values.title);
    formData.append("videoUrl", values.videoFile);
    formData.append("course", courseID);

    dispatch(createChapter(formData));
  };

  const handelAddlesson = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      if (createdBy === decodedToken.userId) {
        setOwner(true);
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, [token, createdBy]);

  return (
    <div className="h-screen w-full">
      <div className="md:px-2 flex flex-col my-5 md:my-0 bg-gray-200 py-5 rounded-xl w-full gap-2 md:h-[450px] md:overflow-y-auto">
        {chapters.length < 1 ? (
          <div className="flex justify-center items-center h-full">
            No chpaters or lessons yet.
          </div>
        ) : (
          chapters.map((chapter, index) => (
            <div
              key={index}
              className="flex justify-start text-gray-700 items-start w-full"
            >
              <Drawer chapter={chapter} editMode={editMode} />
            </div>
          ))
        )}
        {owner ? (
          <div className=" flex justify-end items-end gap-2 px-2 fixed bottom-10 right-10 bg-white border rounded-full py-1">
            {" "}
            <svg
              className="hover:scale-110 transition-all ease-in-out cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="#CA8A04"
              onClick={handleEditMode}
            >
              <path d="M19.707 6.293l-2.293-2.293c-.39-.39-1.023-.39-1.414 0L3 16.586V21h4.414l12.586-12.586c.39-.39.39-1.023 0-1.414zM5.828 19H5v-.828L15.586 7.586l.828.828L5.828 19zm12.636-9.636l-1.465 1.464-1.414-1.414 1.464-1.464 1.414 1.414z" />
            </svg>
            <svg
              className="hover:scale-110 transition-all ease-in-out cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="rgb(74 222 128)"
              onClick={handelAddlesson}
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
          </div>
        ) : null}
      </div>
      {!isSubscribedToThisCourse || !isTheCreatorofThisCourse ? (
        <Subscribe courseId={courseID} />
      ) : null}
      <LessonModal
        isOpen={modalIsOpen}
        onSubmit={handleAddLesson}
        onRequestClose={handelAddlesson}
        chapters={chapters}
      />
    </div>
  );
};

export default CourseChapters;
