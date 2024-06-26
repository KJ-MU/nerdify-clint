import React from "react";
import watch from "../static/watch.png";
import money from "../static/money.png";
import collabration from "../static/collabration.png";

const Features = () => {
  return (
    <div>
      <section className="bg-[rgb(255,165,0,0.15)] p-10 h-screen/2 bg-center flex flex-col md:flex-row-reverse justify-center gap-10 items-center">
        <div className="flex flex-col md:text-left mt-14">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            {" "}
            Interactive Learning Hub
          </h1>
          <p className="text-lg md:w-72 font-semibold md:text-left text-gray-700 md:px-0 px-10 ">
            Collaborate with peers, take notes, and download files for enriched
            learning.
          </p>
        </div>

        <div className="w-72 md:w-80">
          <img src={collabration} alt="" />
        </div>
      </section>
      <section className="bg-white p-10 h-screen/2 bg-center flex flex-col md:flex-row justify-center gap-20 items-center">
        <div className="flex flex-col md:text-left mt-14">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            {" "}
            Earn as You Learn{" "}
          </h1>
          <p className="text-lg md:w-72 font-semibold md:text-left text-gray-700 md:px-0 px-10 ">
            Join our platform to mentor others and earn money while studying.
          </p>
        </div>

        <div className="w-72 md:w-80">
          <img src={money} alt="" />
        </div>
      </section>

      <section className="bg-[rgb(13,154,255,0.15)] p-10 h-screen/2 bg-center flex flex-col md:flex-row-reverse justify-center gap-10 items-center">
        <div className="flex flex-col md:text-left mt-14">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            {" "}
            Study Anytime, Anywhere{" "}
          </h1>
          <p className="text-lg md:w-72 font-semibold md:text-left text-gray-700 md:px-0 px-10 ">
            Access our high-quality videos and study materials 24/7 to fit your
            schedule.
          </p>
        </div>

        <div className="w-72 md:w-80">
          <img src={watch} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Features;
