import React from "react";
import { Link } from "react-router-dom";

const Card = ({ course }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < course?.subscribers?.length; i++) {
      stars.push(
        <svg
          key={i} // Add a key prop to each star for React's reconciliation process
          className="w-4 h-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="overflow-hidden">
      <Link to={`/single-course/${course._id}`}>
        <div
          className="relative w-72 h-48 rounded-xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          style={{
            aspectRatio: "4/3",
            backgroundImage: `url(${course.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0.75rem", // Ensure the border radius remains consistent
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>
          <div className="absolute inset-0 flex items-center justify-start px-4 ">
            <div className="text-white text-lg font-semibold">
              <div className="p-4 flex flex-col justify-start items-start">
                <div className="text-xl font-semibold">{course.Subject}</div>
                <p className="text-sm">{course?.createdBy?.fullName}</p>
                <div className="flex items-center mt-1">
                  <span className="mr-1"></span>
                  {renderStars()}
                </div>
                <p className="mt-2 text-base">{course?.createdBy?.school}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
