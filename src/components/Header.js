import React from "react";
import bg from "../static/header-bg.png";
import ladder from "../static/header-img.png";
import { Link, useNavigate } from "react-router-dom";
import { fetchCourses } from "../features/courseSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = () => {
    dispatch(fetchCourses());
    navigate("/courses");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="p-4 h-screen bg-center flex flex-col md:flex-row justify-center items-center"
    >
      <div className="flex flex-col md:text-left mt-14">
        <h1 className="text-6xl font-bold text-gray-700 mb-4">Nerdify</h1>
        <p className="text-xl font-semibold text-gray-700">
          Your Reliable Support, Anytime, Anywhere.
        </p>
        <p className="text-xl font-semibold text-gray-700">Earn as You Learn</p>
        <div className="mt-6">
          <button
            onClick={handleNavigation}
            className="hidden md:flex justify-center font-bold items-center mt-2 py-3 px-6 rounded-xl text-white bg-[#0D99FF] hover:brightness-75 transition-all"
          >
            Explore Courses
          </button>
        </div>
      </div>

      <div className="w-72 md:w-80">
        <img src={ladder} alt="" />
      </div>

      <button
        onClick={handleNavigation}
        className="md:hidden flex justify-center font-bold items-center mt-2 py-3 px-6 rounded-xl text-white bg-[#0D99FF] hover:brightness-75 transition-all"
      >
        Explore Courses
      </button>
    </div>
  );
};

export default Header;
