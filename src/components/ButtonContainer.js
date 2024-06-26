import React, { useState } from "react";
import Overview from "./Overview";
import Notes from "./Notes";
import Discussion from "./Discussion";
const ButtonContainer = ({ courseView }) => {
  const [activeButton, setActiveButton] = useState("overview");

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => handleClick("overview")}
          className={`inline-block px-4 py-3 rounded-lg transition-all ${
            activeButton !== "overview" &&
            "hover:bg-gray-300 hover:text-gray-700"
          } ${
            activeButton === "overview"
              ? "bg-[#0D99FF] text-white hover:brightness-75"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => handleClick("notes")}
          className={`inline-block px-4 py-3 rounded-lg transition-all ${
            activeButton !== "notes" && "hover:bg-gray-300 hover:text-gray-700"
          } ${
            activeButton === "notes"
              ? "bg-[#0D99FF] text-white hover:brightness-75"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Notes
        </button>
        <button
          onClick={() => handleClick("discussion")}
          className={`inline-block px-4 py-3 rounded-lg transition-all ${
            activeButton !== "discussion" &&
            "hover:bg-gray-300 hover:text-gray-700"
          } ${
            activeButton === "discussion"
              ? "bg-[#0D99FF] text-white hover:brightness-75"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Discussion
        </button>
      </div>
      <div className="mt-4 ">
        {activeButton === "overview" && <Overview courseView={courseView} />}
        {activeButton === "notes" && <Notes />}
        {activeButton === "discussion" && <Discussion />}
      </div>
    </>
  );
};

export default ButtonContainer;
