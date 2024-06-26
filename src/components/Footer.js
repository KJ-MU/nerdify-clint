import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiFacebookBoxLine } from "react-icons/ri";
import { AiOutlineLinkedin, AiOutlineInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../static/netlify-logo.png";
import { useSelector } from "react-redux";

const Footer = () => {
  const { token } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col justify-center items-center h-auto pt-6 bg-[rgb(255,165,0,0.15)]">
      <div className="flex flex-col justify-center items-center gap-6">
        {token ? (
          <div className="flex justify-center items-end mt-14 ml-6 md:self-center self-start">
            <div className="flex flex-col justify-center items-center gap-3 text-lg">
              <img className="w-12 md:w-16" src={logo} alt="" />
              <p>Your Reliable Support, Anytime, Anywhere.</p>
              <p>Earn as You Learn</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p>
              Ready to take your learning journey to the next level? Join our
            </p>
            <p>vibrant community of students today!</p>
            <Link to="/sign-in">
              <button className="flex justify-center font-bold items-center py-3 px-12 rounded-xl text-white bg-[rgb(255,165,0)] hover:brightness-75 transition-all">
                Join as student
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="mt-10 pb-10 flex w-11/12 md:w-7/12 items-center">
        <div className="flex w-7/12 justify-start items-center h-10">
          <p className="text-xs font-semibold text-gray-700 hover:text-[#0D99FF]">
            All rights reserved to Nerdify 2024
          </p>
        </div>
        <div className="flex justify-end w-full items-center gap-5">
          <MdOutlineMail size={30} className="hover:text-[#0D99FF]" />
          <RiFacebookBoxLine size={30} className="hover:text-[#0D99FF]" />
          <AiOutlineLinkedin size={30} className="hover:text-[#0D99FF]" />
          <AiOutlineInstagram size={30} className="hover:text-[#0D99FF]" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
