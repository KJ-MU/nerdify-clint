import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLessonById, deleteLesson } from "../features/lessonSlice";
import { deleteChapter } from "../features/chapterSlice";
const Drawer = ({ chapter, editMode }) => {
  const { lesson } = useSelector((state) => state.lesson);

  const [isOpen, setIsOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLessonDisplay = (lessonId) => {
    dispatch(fetchLessonById(lessonId));
  };

  const handleDeleteLesson = (e, lessonId) => {
    e.stopPropagation();
    prompt("do you want to delete this lesson? ");
    dispatch(deleteLesson(lessonId));
  };
  const handleDeleteChapter = (e, chapterId) => {
    e.stopPropagation();
    alert("are you sure to delete this chapter? ");
    dispatch(deleteChapter(chapterId));
  };
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://nerdify-1.onrender.com/lesson/chapter/${chapter?._id}`
        );
        setLessons(response.data);
      } catch (err) {
        setError(err?.message);
      }
      setLoading(false);
    };

    fetchLessons();
  }, [chapter?._id]);

  return (
    <>
      <div className="w-full px-4 md:px-1 text-gray-700 ">
        <ul className="w-full space-y-2 font-medium  p-2 border border-yellow-500 rounded-xl hover:bg-yellow-500 hover:bg-opacity-50">
          <li>
            <button
              type="button"
              onClick={toggleDrawer}
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {chapter?.title}
              </span>
              {editMode ? (
                <RiDeleteBin5Line
                  size={20}
                  onClick={(e) => handleDeleteChapter(e, chapter?._id)}
                  className="text-red-700 hover:scale-125 transition-all "
                />
              ) : null}
              <svg
                className={`w-3 h-3 transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul
              id="dropdown-example"
              className={`py-2 space-y-2 ${isOpen ? "block" : "hidden"}`}
            >
              {lessons.map((lesson, index) => (
                <div>
                  <li
                    className="flex"
                    onClick={() => handleLessonDisplay(lesson._id)}
                    key={index}
                  >
                    <a className="flex justify-between  cursor-pointer items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100">
                      {lesson.title}
                      {editMode ? (
                        <RiDeleteBin5Line
                          size={20}
                          onClick={(e) => handleDeleteLesson(e, lesson?._id)}
                          className="text-red-700 hover:scale-125 transition-all "
                        />
                      ) : null}
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Drawer;
