import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCourses, fetchCoursesByLevel } from "../features/courseSlice";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option) => {
    if (option === "Log In") {
      dispatch(fetchCoursesByLevel(option));
      navigate("/log-in");
    }
    if (option === "Profile") {
      dispatch(fetchCoursesByLevel(option));
      navigate("/profile");
    }
    if (option === "Other") {
      dispatch(fetchCoursesByLevel(option));
      navigate("/courses");
    }
    if (option === "All") {
      dispatch(fetchCourses());
      navigate("/courses");
    }
    if (option === "High School") {
      dispatch(fetchCoursesByLevel(option));
      navigate("/courses");
    }
    if (option === "College") {
      dispatch(fetchCoursesByLevel(option));
      navigate("/courses");
    }

    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="">
      <button onClick={toggleSidebar} className="">
        <div className="md:hidden w-12 mt-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "rgb(55, 65, 81,0.8)" }}
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
      </button>
      <div
        className={`fixed  md:hidden right-0 top-0 flex bg-white flex-col w-64 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative flex-grow">
          <button
            onClick={toggleSidebar}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className="mt-6 text-lg text-left p-10 w-full h-screen shadow-lg">
            <span className="font-semibold text-lg text-gray-400 pb-1 border-b w-full">
              Account
            </span>
            {user ? (
              <li
                onClick={() => handleOptionClick("Profile")}
                className="px-4 py-2 mt-4 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg"
              >
                Profile
              </li>
            ) : (
              <li
                onClick={() => handleOptionClick("Log In")}
                className="px-4 py-2 mt-4 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg"
              >
                Log In{" "}
              </li>
            )}

            <span className="font-semibold text-lg text-gray-400 pb-1 border-b w-full">
              Explore
            </span>
            <li
              onClick={() => handleOptionClick("All")}
              className="px-4 py-2 mt-4 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg"
            >
              All
            </li>
            <li
              onClick={() => handleOptionClick("College")}
              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg"
            >
              College
            </li>
            <li
              onClick={() => handleOptionClick("High School")}
              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg "
            >
              High School
            </li>
            <li
              onClick={() => handleOptionClick("Other")}
              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg"
            >
              Other
            </li>
          </ul>
        </div>

        {/* Sidebar Footer */}
      </div>
    </div>
  );
};

export default Sidebar;
