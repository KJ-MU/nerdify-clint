import React from "react";
import { Link } from "react-router-dom";
import logo from "../static/netlify-logo.png";
import SearchBar from "./SearchBar";
import DropdownMenu from "./DropdownMenu";
import Sidebar from "../components/SideBar";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="z-20 fixed top-0 w-full flex justify-center gap-8 items-center h-20 shadow-xl bg-white p-4">
      <Link to="/">
        <img className="w-10 pt-2" src={logo} alt="Netlify Logo" />
      </Link>
      <DropdownMenu />
      <SearchBar />
      {user ? (
        <div className="flex items-center">
          <Link to="/profile">
            <img
              className="hidden md:flex rounded-full w-10 h-10 cursor-pointer"
              src={user.profileImage} // Assuming user.profileImage is the URL of the profile image
              alt="User Profile"
            />
          </Link>
          <Link to="/create-course">
            <button className="ml-4 hidden md:flex justify-center font-bold items-center py-3 px-6 rounded-xl text-white bg-[#0D99FF] hover:brightness-75 transition-all">
              Create New Course
            </button>
          </Link>
        </div>
      ) : (
        <Link to="/log-in">
          <button className="hidden md:flex justify-center font-bold items-center mt-2 py-3 px-6 rounded-xl text-white bg-[#0D99FF] hover:brightness-75 transition-all">
            Log In
          </button>
        </Link>
      )}
      <Sidebar />
    </div>
  );
};

export default NavBar;
